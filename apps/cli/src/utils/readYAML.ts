import { readFile } from 'fs/promises';
import { pathExists } from './pathExists';
import YAML from 'yaml';

/**
 *
 * @param {string} path - location of file to read
 * @return {any} - parsed file content
 *
 * @example
 *     readYaml('./myFile')
 */
export async function readYAML(path: string) {
  if (await pathExists(path)) {
    const file = await readFile(path, 'utf8');
    const data = YAML.parse(file);
    return data;
  }
  throw new Error(`${path} does not exist`);
}
