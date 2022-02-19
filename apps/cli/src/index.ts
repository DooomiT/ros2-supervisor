#!/usr/bin/env ts-node
import { build } from './commands/build';
import { createCommand } from 'commander';
import { exit } from 'process';
import { run } from './commands/run';
import Colors = require('colors.ts');
Colors.enable();

const withErrors = (command: (...args: any) => Promise<void>) => {
  return async (...args: any[]) => {
    try {
      await command(...args);
    } catch (error) {
      if (error instanceof Error) {
        program.error(error.message);
        exit(1);
      }
    }
  };
};

const program = createCommand();

// @ts-ignore
program
  .name('ros2-cli')
  .description('CLI to build and run multi node ros2 projects')
  .version('1.0.0');

program.command('build')
  .description('Build the ros2 nodes with colcon')
  .argument('[config]', 'Configuration file describing the build')
  .option('-n, --no-validation', 'ignore validation of build environment')
  .option('-i, --interactive', 'run with interactive prompts', true)
  .action(withErrors(build));

program.command('run')
  .description('Run the ros2 nodes')
  .argument('[config]', 'Configuration file describing the components')
  .option('-n, --no-validation', 'ignore validation of build environment')
  .option('-i, --interactive', 'run with interactive prompts', false)
  .action(withErrors(run));

program
  .configureOutput({
    outputError: (str, write) => write(str.red),
  });

program.exitOverride();

program.parseAsync();
