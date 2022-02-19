import { Component, Config, Options, SpawnCommandOptions } from '../common/types';
import { selectComponents } from '../utils/selectComponents';
import { validateEnvironment } from '../utils/validateEnvironment';
import { readYAML } from '../utils/readYAML';
import { spawnCommand } from '../utils/spawnCommand';

/**
 * This function executes the build
 *
 * @param {string} configPath - the path of the config used
 * @param {any} options - command options
 *
 * @example
 *     build('./config')
 */
export async function build(configPath: string, options: Options) {
  const configData = await readYAML(configPath) as Config;
  if (options.validation) {
    validateEnvironment(configData);
    console.info('build environment is available'.green);
  }
  const usedComponents: Component[] = options.interactive ?
    await selectComponents(configData.components) :
    configData.components;
  for (const component of usedComponents) {
    const options: SpawnCommandOptions = {
      command: `colcon build --packages-select ${component.name}`,
      name: component.name,
      outputPath: component.path,
      options: { cwd: component.path },
    };
    await spawnCommand(options);
  };
}
