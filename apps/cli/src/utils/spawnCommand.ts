import * as childProcess from 'child_process';
import * as path from 'path';
import { pathExists } from './pathExists';
import { writeFile, mkdir } from 'fs/promises';
import { SpawnCommandOptions } from '../common/types';

/**
 * Sets up the loging directory for the command
 * @param {SpawnCommandOptions} options - options object
 * @return {Promise<string | undefined>} - ouput file path or undefined
 */
async function setupLogDir(options: SpawnCommandOptions): Promise<string | undefined> {
  if (options.outputPath) {
    if (!await pathExists(options.outputPath)) {
      await mkdir(options.outputPath, { recursive: true });
    }
    const outputFileName = options.name || options.command.replace(/[ &\/\\#,+()$~%.'":*?<>{}]/g, '');
    return path.join(options.outputPath, outputFileName);
  }
}

/**
 *
 * @param {SpawnCommandOptions} options
 */
async function restartOnError(options: SpawnCommandOptions) {
  await spawnCommand(options);
}

/**
 * This function spawns a shell executing a program
 *
 * @param {SpawnCommandOptions} options
 * @return {Promise<string>} - The output of the command
 *
 * @example
 *
 *     spawnCommand({'cat myFile', myCallback(options), ['--verbose'], 'myCommand', 'logs', myErrorHandler(options)})
 */
export async function spawnCommand(
  options: SpawnCommandOptions,
) {
  const outputFile: string | undefined = await setupLogDir(options);

  console.log(`start ${options.command}`.green);
  if (!pathExists(options.command)) {
    throw new Error(`path ${options.command} does not exist`);
  }

  const child = childProcess.spawn(options.command, options.options);

  let commandOutput = '';

  child.stdout.setEncoding('utf8');
  child.stdout.on('data', function (data) {
    console.log(`[${options.name}]: ${data}`);
    data = data.toString();
    commandOutput += data;
  });

  child.stderr.setEncoding('utf8');
  child.stderr.on('data', async function (data) {
    commandOutput += data;
    if (outputFile) {
      await writeFile(outputFile, commandOutput);
    }
    console.error(`[${options.name}]: ${data}`.red);
    if (options.errorCallback) {
      options.errorCallback(data, options);
    }
    if (options.restartOnError) {
      restartOnError(options);
    }
  });

  child.on('close', async function (code) {
    if (outputFile) {
      await writeFile(outputFile, commandOutput);
    }
    if (options.callback) {
      options.callback(code, commandOutput, options);
    }
  });

  child.on('error', async function (code) {
    if (options.errorCallback) {
      options.errorCallback(code, options);
    }
    if (options.restartOnError) {
      restartOnError(options);
    }
  });
};
