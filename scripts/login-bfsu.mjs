#!/usr/bin/env node
/**
 * Isolated Multi-Profile Tooling & Login Manager for BFSU-web
 * 
 * Guarantees that Cloudflare, Vercel, Supabase, and Git configurations
 * are 100% directory-bound to this repository and never override
 * machine-global personal accounts.
 * 
 * Usage:
 *   pnpm login:bfsu     -> Check status & interactive manager
 *   pnpm login:cf       -> Authenticate Cloudflare only
 *   pnpm login:vercel   -> Authenticate Vercel only
 *   pnpm login:supabase -> Link/verify Supabase with scoped token
 */

import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import readline from 'node:readline';

const ROOT_DIR = process.cwd();
const WRANGLER_DIR = path.join(ROOT_DIR, '.wrangler');
const VERCEL_DIR = path.join(ROOT_DIR, '.vercel');

if (!fs.existsSync(WRANGLER_DIR)) fs.mkdirSync(WRANGLER_DIR, { recursive: true });
if (!fs.existsSync(VERCEL_DIR)) fs.mkdirSync(VERCEL_DIR, { recursive: true });

function loadEnv() {
  const envPath = path.resolve(ROOT_DIR, '.env.local');
  if (!fs.existsSync(envPath)) return {};
  const content = fs.readFileSync(envPath, 'utf8');
  const env = {};
  for (const line of content.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq !== -1) {
      let val = trimmed.slice(eq + 1).trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      env[trimmed.slice(0, eq).trim()] = val;
    }
  }
  return env;
}

const localEnv = loadEnv();

function checkCfAuth() {
  if (localEnv.CLOUDFLARE_API_TOKEN) return { ok: true, detail: '.env.local API Token' };
  const candidates = [
    path.join(WRANGLER_DIR, 'config', 'default.toml'),
    path.join(WRANGLER_DIR, '.wrangler', 'config', 'default.toml')
  ];
  for (const c of candidates) {
    if (fs.existsSync(c) && fs.readFileSync(c, 'utf8').includes('oauth_token')) {
      return { ok: true, detail: './.wrangler OAuth' };
    }
  }
  return { ok: false, detail: 'Not Logged In' };
}

function checkVercelAuth() {
  const authFile = path.join(VERCEL_DIR, 'auth.json');
  const prjFile = path.join(VERCEL_DIR, 'project.json');
  const hasToken = fs.existsSync(authFile);
  const hasPrj = fs.existsSync(prjFile);
  if (hasToken && hasPrj) return { ok: true, detail: 'Linked (team: BFSU)' };
  if (hasToken) return { ok: true, detail: 'Authenticated' };
  return { ok: false, detail: 'Not Logged In' };
}

function checkSupabaseAuth() {
  const hasToken = Boolean(localEnv.SUPABASE_ACCESS_TOKEN);
  const refFile = path.join(ROOT_DIR, 'supabase', '.temp', 'project-ref');
  const hasRef = fs.existsSync(refFile);
  if (hasToken && hasRef) {
    const ref = fs.readFileSync(refFile, 'utf8').trim();
    return { ok: true, detail: `Linked (ref: ${ref})` };
  }
  if (hasToken) return { ok: true, detail: 'Token configured' };
  return { ok: false, detail: 'No Token' };
}

function checkGitIdentity() {
  const resName = spawnSync('git', ['config', '--local', 'user.name'], { encoding: 'utf8' });
  const resEmail = spawnSync('git', ['config', '--local', 'user.email'], { encoding: 'utf8' });
  const name = (resName.stdout || '').trim();
  const email = (resEmail.stdout || '').trim();
  if (name && email) return { ok: true, detail: `${name} <${email}>` };
  return { ok: false, detail: 'Global fallback (Personal)' };
}

function runCfLogin() {
  console.log('\n\x1b[33m--- [Cloudflare Isolated Login] ---\x1b[0m');
  const cfEnv = { ...process.env, WRANGLER_HOME: WRANGLER_DIR, XDG_CONFIG_HOME: WRANGLER_DIR };
  spawnSync('npx', ['wrangler', 'login'], { env: cfEnv, stdio: 'inherit', shell: true });
}

function runVercelLogin() {
  console.log('\n\x1b[33m--- [Vercel Isolated Login] ---\x1b[0m');
  spawnSync('npx', ['vercel', 'login', '--global-config', VERCEL_DIR], { stdio: 'inherit', shell: true });
}

function runSupabaseLink() {
  console.log('\n\x1b[33m--- [Supabase Isolated Link] ---\x1b[0m');
  const ref = localEnv.NEXT_PUBLIC_SUPABASE_URL ? localEnv.NEXT_PUBLIC_SUPABASE_URL.replace('https://', '').split('.')[0] : 'jbbcsxdkboiytqgaceen';
  console.log(`Linking with project ref: ${ref}`);
  spawnSync('node', ['scripts/supabase-scoped.mjs', 'link', '--project-ref', ref], { stdio: 'inherit', shell: true });
}

function configureGit() {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  rl.question('Enter repository-local Git Author Name [default: BFSU Admin]: ', (name) => {
    rl.question('Enter repository-local Git Author Email [default: info@bfsu-uom.lk]: ', (email) => {
      rl.close();
      const n = name.trim() || 'BFSU Admin';
      const e = email.trim() || 'info@bfsu-uom.lk';
      spawnSync('git', ['config', '--local', 'user.name', n]);
      spawnSync('git', ['config', '--local', 'user.email', e]);
      console.log(`\x1b[32m✔ Local Git author set to: ${n} <${e}>\x1b[0m`);
    });
  });
}

function main() {
  const cf = checkCfAuth();
  const vc = checkVercelAuth();
  const sb = checkSupabaseAuth();
  const git = checkGitIdentity();

  console.log('\x1b[36m====================================================\x1b[0m');
  console.log('\x1b[36m   BFSU Isolated Directory-Scoped Tooling Suite     \x1b[0m');
  console.log('\x1b[36m====================================================\x1b[0m');
  console.log('\x1b[32m✔ Isolation Guarantee:\x1b[0m Global personal accounts will NOT be overridden.\n');

  console.log('Current Local Status:');
  console.log(`  - Cloudflare (Wrangler/API) : ${cf.ok ? '\x1b[32m[READY]\x1b[0m' : '\x1b[31m[NOT READY]\x1b[0m'} ${cf.detail}`);
  console.log(`  - Vercel CLI (Scoped)       : ${vc.ok ? '\x1b[32m[READY]\x1b[0m' : '\x1b[31m[NOT READY]\x1b[0m'} ${vc.detail}`);
  console.log(`  - Supabase CLI (Scoped)     : ${sb.ok ? '\x1b[32m[READY]\x1b[0m' : '\x1b[31m[NOT READY]\x1b[0m'} ${sb.detail}`);
  console.log(`  - Local Git Identity        : ${git.ok ? '\x1b[32m[READY]\x1b[0m' : '\x1b[33m[UNSET]\x1b[0m'} ${git.detail}\n`);

  const arg = (process.argv[2] || '').toLowerCase();
  if (arg === 'cf') { runCfLogin(); return; }
  if (arg === 'vercel') { runVercelLogin(); return; }
  if (arg === 'supabase') { runSupabaseLink(); return; }
  if (arg === 'git') { configureGit(); return; }

  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  console.log('Select an action:');
  console.log('  1) Re-authenticate Cloudflare (pnpm login:cf)');
  console.log('  2) Re-authenticate Vercel     (pnpm login:vercel)');
  console.log('  3) Verify/Link Supabase       (pnpm login:supabase)');
  console.log('  4) Set Local Git Author       (pnpm git:profile)');
  console.log('  5) Exit\n');

  rl.question('Select option (1-5): ', (ans) => {
    rl.close();
    const c = ans.trim();
    if (c === '1') runCfLogin();
    else if (c === '2') runVercelLogin();
    else if (c === '3') runSupabaseLink();
    else if (c === '4') configureGit();
    else console.log('Exiting.');
  });
}

main();
