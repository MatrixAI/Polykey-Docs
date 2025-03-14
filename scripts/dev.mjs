#!/usr/bin/env node

import os from 'node:os';
import fs from 'node:fs';
import url from 'node:url';
import process from 'node:process';
import childProcess from 'node:child_process';

const platform = os.platform();

/* eslint-disable no-console */
async function main(argv = process.argv) {
  argv = argv.slice(2);
  const envSchema = JSON.parse(await fs.promises.readFile('env.schema.json'));
  let devVars = '';
  for (const key of Object.keys(envSchema.properties)) {
    devVars += `${key}='${process.env[key]}'\n`;
  }
  await fs.promises.writeFile('.dev.vars', devVars);
  const devArgs = ['dev', ...argv];
  console.error(['wrangler', ...devArgs].join(' '));
  try {
    childProcess.execFileSync('wrangler', devArgs, {
      stdio: ['inherit', 'inherit', 'inherit'],
      windowsHide: true,
      encoding: 'utf-8',
      shell: platform === 'win32' ? true : false,
    });
  } catch (e) {
    if (e.code) {
      throw e;
    }
    process.exit(e.status);
  }
}
/* eslint-enable no-console */

if (import.meta.url.startsWith('file:')) {
  const modulePath = url.fileURLToPath(import.meta.url);
  if (process.argv[1] === modulePath) {
    void main();
  }
}
