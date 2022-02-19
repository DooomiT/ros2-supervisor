import {writeFile} from 'fs/promises';
import YAML from 'yaml';

/**
 * @param {Object} data - data to parse to json
 * @param {string} path - location of file to read
 *
 * @example
 *     readYaml('./myFile')
 */
export async function writeYAML(data: Object, path: string) {
  const document = new YAML.Document();
  document.contents = data;
  await writeFile(path, document.toString());
}
