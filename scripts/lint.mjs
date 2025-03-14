#!/usr/bin/env node

import os from 'node:os';
import path from 'node:path';
import url from 'node:url';
import process from 'node:process';
import childProcess from 'node:child_process';

const projectPath = path.dirname(
  path.dirname(url.fileURLToPath(import.meta.url)),
);

const platform = os.platform();

/* eslint-disable no-console */
async function main(argv = process.argv) {
  argv = argv.slice(2);
  let fix = false;
  const restArgs = [];
  while (argv.length > 0) {
    const option = argv.shift();
    if (option === '--fix') {
      fix = true;
      argv.shift();
    } else {
      restArgs.push(option);
    }
  }
  // Linting code
  const eslintArgs = [
    '{src,pages,blog,docs,server,scripts}/**/*.{js,mjs,ts,mts,jsx,tsx,json}',
    'docusaurus.config.ts',
  ];
  if (fix) {
    eslintArgs.push('--fix');
  }
  console.error('Running eslint:');
  console.error(['eslint', ...eslintArgs].join(' '));
  childProcess.execFileSync('eslint', eslintArgs, {
    stdio: ['inherit', 'inherit', 'inherit'],
    windowsHide: true,
    encoding: 'utf-8',
    shell: platform === 'win32' ? true : false,
    cwd: projectPath,
  });
  // Linting shell scripts (this does not have auto-fixing)
  const shellCheckArgs = [
    './src',
    './scripts',
    '-type',
    'f',
    '-regextype',
    'posix-extended',
    '-regex',
    '.*\\.(sh)',
    '-exec',
    'shellcheck',
    '{}',
    '+',
  ];
  console.error('Running shellcheck:');
  console.error(['find', ...shellCheckArgs].join(' '));
  childProcess.execFileSync('find', shellCheckArgs, {
    stdio: ['inherit', 'inherit', 'inherit'],
    windowsHide: true,
    encoding: 'utf-8',
    shell: platform === 'win32' ? true : false,
    cwd: projectPath,
  });
  // Linting markdown
  const prettierArgs = [
    !fix ? '--check' : '--write',
    './README.md',
    '{pages,blog,docs}/**/*.{md,mdx}',
  ];
  console.error('Running prettier:');
  console.error(['prettier', ...prettierArgs].join(' '));
  childProcess.execFileSync('prettier', prettierArgs, {
    stdio: ['inherit', 'inherit', 'inherit'],
    windowsHide: true,
    encoding: 'utf-8',
    shell: platform === 'win32' ? true : false,
    cwd: projectPath,
  });
}
/* eslint-enable no-console */

if (import.meta.url.startsWith('file:')) {
  const modulePath = url.fileURLToPath(import.meta.url);
  if (process.argv[1] === modulePath) {
    void main();
  }
}
