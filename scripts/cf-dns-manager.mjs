#!/usr/bin/env node
/**
 * Cloudflare Scoped DNS Manager for BFSU-web
 * 
 * Uses directory-scoped credentials from .env.local without touching
 * or clobbering the workstation's global Cloudflare / Wrangler profile.
 * 
 * Usage:
 *   node scripts/cf-dns-manager.mjs status
 *   node scripts/cf-dns-manager.mjs sync
 */

import fs from 'node:fs';
import path from 'node:path';

// Parse .env.local manually to avoid dependencies
function loadEnvLocal() {
  const envPath = path.resolve(process.cwd(), '.env.local');
  if (!fs.existsSync(envPath)) return {};
  const content = fs.readFileSync(envPath, 'utf8');
  const env = {};
  for (const line of content.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx !== -1) {
      const key = trimmed.slice(0, eqIdx).trim();
      let val = trimmed.slice(eqIdx + 1).trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      env[key] = val;
    }
  }
  return env;
}

function getCloudflareToken() {
  const env = { ...process.env, ...loadEnvLocal() };
  if (env.CLOUDFLARE_API_TOKEN) return { token: env.CLOUDFLARE_API_TOKEN, source: '.env.local' };

  // Check local .wrangler config (isolated to this directory)
  const candidatePaths = [
    path.resolve(process.cwd(), '.wrangler', 'config', 'default.toml'),
    path.resolve(process.cwd(), '.wrangler', '.wrangler', 'config', 'default.toml')
  ];
  for (const p of candidatePaths) {
    if (fs.existsSync(p)) {
      const toml = fs.readFileSync(p, 'utf8');
      const match = toml.match(/oauth_token\s*=\s*"([^"]+)"/);
      if (match && match[1]) return { token: match[1], source: `${p} (isolated login)` };
    }
  }
  return null;
}

const auth = getCloudflareToken();
const API_TOKEN = auth ? auth.token : null;
const DOMAIN = 'bfsu-uom.lk';

if (!API_TOKEN) {
  console.error('\x1b[31m[ERROR] Cloudflare token not found.\x1b[0m');
  console.error('You can authenticate in either of two safe ways:');
  console.error('  1. Run isolated directory login:  node scripts/login-bfsu.mjs');
  console.error('  2. Or add to .env.local:         CLOUDFLARE_API_TOKEN="your_token"\n');
  process.exit(1);
}
console.log(`\x1b[32m✔ Loaded Cloudflare authentication from: ${auth.source}\x1b[0m`);

const CF_HEADERS = {
  'Authorization': `Bearer ${API_TOKEN}`,
  'Content-Type': 'application/json'
};

async function getZoneId() {
  const res = await fetch(`https://api.cloudflare.com/client/v4/zones?name=${DOMAIN}`, { headers: CF_HEADERS });
  const data = await res.json();
  if (!data.success || !data.result.length) {
    throw new Error(`Zone for ${DOMAIN} not found in this account or token lacks permissions: ${JSON.stringify(data.errors)}`);
  }
  return data.result[0].id;
}

async function listDnsRecords(zoneId) {
  const res = await fetch(`https://api.cloudflare.com/client/v4/zones/${zoneId}/dns_records?per_page=100`, { headers: CF_HEADERS });
  const data = await res.json();
  if (!data.success) throw new Error(`Failed to list DNS records: ${JSON.stringify(data.errors)}`);
  return data.result;
}

async function main() {
  const action = process.argv[2] || 'status';
  console.log(`\x1b[36m[Cloudflare Scoped DNS Manager]\x1b[0m Action: ${action} | Domain: ${DOMAIN}`);

  try {
    const zoneId = await getZoneId();
    console.log(`Found Zone ID: ${zoneId}`);
    const records = await listDnsRecords(zoneId);

    if (action === 'status') {
      console.log('\n--- Current Active DNS Records ---');
      records.forEach(r => {
        console.log(`  [${r.type.padEnd(5)}] ${r.name.padEnd(30)} -> ${r.content.padEnd(35)} (Proxied: ${r.proxied})`);
      });
      return;
    }

    if (action === 'sync') {
      console.log('\n--- Syncing Vercel Origin & Email Records ---');
      // Desired records for bfsu-uom.lk
      const targetA = { type: 'A', name: DOMAIN, content: '76.76.21.21', proxied: true, ttl: 1 };
      const targetCname = { type: 'CNAME', name: `www.${DOMAIN}`, content: 'cname.vercel-dns.com', proxied: true, ttl: 1 };

      // Fix A record
      const existingA = records.find(r => r.type === 'A' && (r.name === DOMAIN || r.name === `@.${DOMAIN}`));
      if (existingA) {
        if (existingA.content !== targetA.content) {
          console.log(`Updating A record ${existingA.id} from ${existingA.content} to ${targetA.content}...`);
          const updateRes = await fetch(`https://api.cloudflare.com/client/v4/zones/${zoneId}/dns_records/${existingA.id}`, {
            method: 'PUT',
            headers: CF_HEADERS,
            body: JSON.stringify(targetA)
          });
          const updateData = await updateRes.json();
          if (updateData.success) console.log('Successfully updated A record to Vercel origin!');
          else console.error('Failed to update A record:', updateData.errors);
        } else {
          console.log('A record is already pointing to Vercel (76.76.21.21).');
        }
      } else {
        console.log('Creating new A record pointing to 76.76.21.21...');
        const createRes = await fetch(`https://api.cloudflare.com/client/v4/zones/${zoneId}/dns_records`, {
          method: 'POST',
          headers: CF_HEADERS,
          body: JSON.stringify(targetA)
        });
        const createData = await createRes.json();
        if (createData.success) console.log('Successfully created A record!');
      }

      // Fix CNAME record
      const existingCname = records.find(r => r.type === 'CNAME' && r.name === `www.${DOMAIN}`);
      if (existingCname) {
        if (existingCname.content !== targetCname.content) {
          console.log(`Updating CNAME www from ${existingCname.content} to ${targetCname.content}...`);
          await fetch(`https://api.cloudflare.com/client/v4/zones/${zoneId}/dns_records/${existingCname.id}`, {
            method: 'PUT',
            headers: CF_HEADERS,
            body: JSON.stringify(targetCname)
          });
          console.log('Successfully updated CNAME record!');
        } else {
          console.log('CNAME www is already pointing to cname.vercel-dns.com.');
        }
      } else {
        console.log('Creating CNAME www -> cname.vercel-dns.com...');
        await fetch(`https://api.cloudflare.com/client/v4/zones/${zoneId}/dns_records`, {
          method: 'POST',
          headers: CF_HEADERS,
          body: JSON.stringify(targetCname)
        });
        console.log('Successfully created CNAME record!');
      }

      console.log('\nSync operation completed.');
    }
  } catch (err) {
    console.error('\x1b[31m[Execution Failed]:\x1b[0m', err.message);
  }
}

main();
