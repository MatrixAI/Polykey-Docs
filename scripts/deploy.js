#!/usr/bin/env node

const os = require('os');
const fs = require('fs');
const process = require('process');
const childProcess = require('child_process');
const TOML = require('@iarna/toml');

const platform = os.platform();

/* eslint-disable no-console */
async function main(argv = process.argv) {
  argv = argv.slice(2);
  // Optional feature is used for feature branches
  let feature;
  const restArgs = [];
  while (argv.length > 0) {
    const option = argv.shift();
    let match;
    if ((match = option.match(/--feature(?:=(.+)|$)/))) {
      feature = match[1] ?? argv.shift();
    } else {
      restArgs.push(option);
    }
  }
  // The `--feature X` option only makes sense if you also use `--env X`.
  if (typeof feature === 'string') {
    const wranglerConfig = TOML.parse(
      fs.readFileSync('./wrangler.toml', { encoding: 'utf-8' }),
    );
    let handled = false;
    const handle = () => {
      if (handled) return;
      handled = true;
      fs.renameSync('./wrangler.toml.bak', './wrangler.toml');
    };
    // Backup the original wrangler.toml
    fs.renameSync('./wrangler.toml', './wrangler.toml.bak');
    process.on('beforeExit', handle);
    process.on('uncaughtException', handle);
    process.on('unhandledRejection', handle);
    process.on('SIGINT', handle);
    process.on('SIGTERM', handle);
    process.on('SIGQUIT', handle);
    process.on('SIGHUP', handle);
    // Add in the feature environment
    wranglerConfig.env[feature] = {
      name: `${wranglerConfig.name}-${feature}`,
      routes: [
        `${feature}.${wranglerConfig.routes[0]}`,
        `${feature}.${wranglerConfig.routes[1]}`,
      ],
    };
    console.log('0:', `${feature}.${wranglerConfig.routes[0].pattern}`);
    fs.writeFileSync('./wrangler.toml', TOML.stringify(wranglerConfig), {
      encoding: 'utf-8',
    });
  }
  const secretBulkArgs = [
    'secret:bulk',
    '--config',
    './wrangler.toml',
    ...restArgs,
  ];
  console.error(['wrangler', ...secretBulkArgs].join(' '));
  childProcess.execFileSync('wrangler', secretBulkArgs, {
    input: JSON.stringify({}),
  });
  const deployArgs = ['deploy', '--config', './wrangler.toml', ...restArgs];
  console.error(['wrangler', ...deployArgs].join(' '));
  childProcess.execFileSync('wrangler', deployArgs, {
    stdio: ['inherit', 'inherit', 'inherit'],
    windowsHide: true,
    encoding: 'utf-8',
    shell: platform === 'win32' ? true : false,
  });
}
/* eslint-enable no-console */

void main();
