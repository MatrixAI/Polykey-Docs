#!/usr/bin/env node

import os from 'node:os';
import fs from 'node:fs';
import url from 'node:url';
import process from 'node:process';
import childProcess from 'node:child_process';
import $RefParser from '@apidevtools/json-schema-ref-parser';

const platform = os.platform();

async function loadEnvSchema() {
  const schema = await $RefParser.bundle('env.schema.json');
  const props = new Set();
  const required = new Set();
  (function extract(s) {
    if (!s || typeof s !== 'object') return;
    // Collect properties
    if (s.properties) Object.keys(s.properties).forEach((k) => props.add(k));
    // Collect required properties
    if (s.required) s.required.forEach((r) => required.add(r));
    // Process composition keywords
    ['allOf', 'anyOf', 'oneOf'].forEach(
      (k) => Array.isArray(s[k]) && s[k].forEach(extract),
    );
  })(schema);
  return {
    allKeys: [...props],
    requiredKeys: [...required],
  };
}

/* eslint-disable no-console */
async function main(argv = process.argv) {
  argv = argv.slice(2);
  const { allKeys, requiredKeys } = await loadEnvSchema();
  // Check if required variables are set
  for (const key of requiredKeys) {
    if (process.env[key] == null || process.env[key] === '') {
      throw new Error(`Required environment variable ${key} is not set`);
    }
  }
  // Generate .dev.vars file with all variables
  let devVars = '';
  for (const key of allKeys) {
    // Only include variables that have values
    if (process.env[key] != null && process.env[key] !== '') {
      devVars += `${key}='${process.env[key]}'\n`;
    }
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
