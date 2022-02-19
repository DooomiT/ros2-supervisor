import { Config, SpawnCommandOptions } from '../common/types';
import { spawnCommand } from './spawnCommand';

/**
 * This function checks if all required binaries for build are available
 *
 * @param {Config} config - the used python version
 *
 * @example
 *     validateEnvironment(')
 */
export async function validateEnvironment(config: Config) {
  await spawnCommand({
    command: 'ros2', errorCallback: (data: number, options: SpawnCommandOptions) => {
      throw new Error('ros2 failed');
    },
  });
  console.info('ros2 is installed'.green);

  await spawnCommand({
    command: 'colcon', errorCallback: (data: number, options: SpawnCommandOptions) => {
      throw new Error('colcon failed');
    },
  });
  console.info('colcon is installed'.green);

  /**
   *
   * @param {number} code
   * @param {string} output
   * @param {SpawnCommandOptions} options
   */
  function pythonCallback(code: number, output: string, options: SpawnCommandOptions) {
    if (output !== config.common.pythonVersion) {
      throw new Error(`python version required: ${config.common.pythonCommand} used: ${output}`);
    }
    console.info('Python is installed'.green);
  }

  if (config.common.pythonVersion) {
    const options: SpawnCommandOptions = {
      command: `${config.common.pythonCommand} --version`,
      callback: pythonCallback,
    };
    await spawnCommand(options);
    return;
  }
}
