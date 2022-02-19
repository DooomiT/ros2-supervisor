---
title: "Interface: SpawnCommandOptions"
linkTitle: "SpawnCommandOptions"
slug: "SpawnCommandOptions"
---

defines the input for spawnCommand

**`param`** The command to execute

**`param`** Invoked after the command closes

**`param`** List of arguments to execute the command with

**`param`** Name of the process

**`param`** Path where the log will be saved to

**`param`**
Invoked after the command execution stops on error

**`param`** specifies if the command should be reexecuted on error

## Table of contents

### Properties

- [callback](SpawnCommandOptions.md#callback)
- [command](SpawnCommandOptions.md#command)
- [errorCallback](SpawnCommandOptions.md#errorcallback)
- [name](SpawnCommandOptions.md#name)
- [options](SpawnCommandOptions.md#options)
- [outputPath](SpawnCommandOptions.md#outputpath)
- [restartOnError](SpawnCommandOptions.md#restartonerror)

## Properties

### callback

• `Optional` **callback**: `Function`

#### Defined in

common/types.ts:52

___

### command

• **command**: `string`

#### Defined in

common/types.ts:51

___

### errorCallback

• `Optional` **errorCallback**: `Function`

#### Defined in

common/types.ts:55

___

### name

• `Optional` **name**: `string`

#### Defined in

common/types.ts:53

___

### options

• `Optional` **options**: `SpawnOptionsWithoutStdio`

#### Defined in

common/types.ts:57

___

### outputPath

• `Optional` **outputPath**: `string`

#### Defined in

common/types.ts:54

___

### restartOnError

• `Optional` **restartOnError**: `boolean`

#### Defined in

common/types.ts:56
