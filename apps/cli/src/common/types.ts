import * as childProcess from 'child_process';

/**
 * defines the structure of components
 */
export type Component = {
    name: string,
    path?: string
    program: string,
    restartOnError?: boolean,
}

/**
 * defines the structure of all common options
 */
export type Common = {
    pythonCommand: string,
    pythonVersion: string,
}

/**
 * defines the structure of command options
 */
export type Options = {
    interactive: boolean,
    validation: boolean
}

/**
 * defines the structure of the config
 */
export type Config = {
    name: string,
    common: Common,
    components: Component[],
}

/**
 * defines the input for spawnCommand
 *
 * @param {string} command - The command to execute
 * @param {Function(number, SpawnCommandOptions)} callback - Invoked after the command closes
 * @param {string[]} [args] - List of arguments to execute the command with
 * @param {string} [name] - Name of the process
 * @param {string} [outputPath] - Path where the log will be saved to
 * @param {Function(string, string, SpawnCommandOptions)} errorCallback
 * Invoked after the command execution stops on error
 * @param {boolean} restartOnError - specifies if the command should be reexecuted on error
 */
export interface SpawnCommandOptions {
    command: string,
    callback?: Function,
    name?: string,
    outputPath?: string,
    errorCallback?: Function,
    restartOnError?: boolean,
    options?: childProcess.SpawnOptionsWithoutStdio;
}
