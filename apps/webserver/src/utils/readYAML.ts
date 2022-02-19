import {readFile} from 'fs/promises';
import {pathExists} from './pathExists';
import YAML from 'yaml';

/**
 *
 * @param {string} path - location of file to read
 * @param {boolean} asJson - read and parse to json
 * @return {any} - parsed file content
 *
 * @example
 *     readYaml('./myFile')
 */
export async function readYAML(path: string, asJson?: boolean) {
  if (await pathExists(path)) {
    const file = await readFile(path, 'utf8');
    const data = YAML.parse(file);
    return asJson ? JSON.parse(JSON.stringify(data, null, 2)) : data;
  }
  throw new Error(`${path} does not exist`);
}
