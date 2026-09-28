#!/usr/bin/env node
/**
 * Scoped Supabase CLI Runner
 * 
 * Automatically injects SUPABASE_ACCESS_TOKEN from .env.local
 * so developers never clobber their global Supabase login.
 * 
 * Usage:
 *   pnpm db:status
 *   pnpm db:push
 *   pnpm db:pull
 */

import { spawnSync } from 'node:child_process';
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
const token = localEnv.SUPABASE_ACCESS_TOKEN || process.env.SUPABASE_ACCESS_TOKEN;
const args = process.argv.slice(2);

if (!token) {
  console.error('\x1b[31m[ERROR] SUPABASE_ACCESS_TOKEN not found in .env.local\x1b[0m');
  console.error('Please ensure SUPABASE_ACCESS_TOKEN is set in .env.local.');
  process.exit(1);
}

const res = spawnSync('npx', ['supabase', ...args], {
  env: {
    ...process.env,
    ...localEnv,
    SUPABASE_ACCESS_TOKEN: token
  },
  stdio: 'inherit',
  shell: true
});

process.exit(res.status ?? 0);
