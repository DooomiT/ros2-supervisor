import * as fs from 'fs/promises';

/**
 * checks if a path exists
 * @param {string} path - path to check
 * @return {Promise<boolean>} - The output of the command
 */
export async function pathExists(path: string) {
  try {
    await fs.access(path);
    return true;
  } catch (error) {
    return false;
  }
}
