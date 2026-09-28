import fs from 'node:fs';
import path from 'node:path';

function loadEnv() {
  const envPath = path.resolve(process.cwd(), '.env.local');
  if (!fs.existsSync(envPath)) return {};
  const content = fs.readFileSync(envPath, 'utf8');
  const env = {};
  for (const line of content.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx !== -1) {
      let val = trimmed.slice(eqIdx + 1).trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      env[trimmed.slice(0, eqIdx).trim()] = val;
    }
  }
  return env;
}

const localEnv = loadEnv();
const token = process.env.VERCEL_TOKEN || localEnv.VERCEL_TOKEN;
const teamId = process.env.VERCEL_TEAM_ID || localEnv.VERCEL_TEAM_ID || 'team_8qL6spF4ttTSwNI299aADDye';
const prjId = process.env.VERCEL_PROJECT_ID || localEnv.VERCEL_PROJECT_ID || 'prj_f5yX1W5uELb7s2JUpd9Tcmkvm6mh';

const envContent = fs.existsSync('.env.local') ? fs.readFileSync('.env.local', 'utf8') : '';
const lines = envContent.split('\n');

async function setEnv(key, value) {
  if (!token) {
    console.error('VERCEL_TOKEN not configured in environment or .env.local');
    return;
  }
  const res = await fetch(`https://api.vercel.com/v10/projects/${prjId}/env?teamId=${teamId}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      key,
      value,
      type: 'plain',
      target: ['production', 'preview', 'development']
    })
  });
  const data = await res.json();
  console.log('ENV SET:', key, data.id ? 'SUCCESS' : JSON.stringify(data));
}

async function main() {
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx !== -1) {
      const k = trimmed.slice(0, eqIdx).trim();
      let v = trimmed.slice(eqIdx + 1).trim();
      if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
        v = v.slice(1, -1);
      }
      await setEnv(k, v);
    }
  }
  console.log('All environment variables processed for Vercel.');
}

main();
