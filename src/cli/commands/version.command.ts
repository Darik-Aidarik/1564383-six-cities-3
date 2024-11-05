import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { Command } from './command.interface.js';

type PackageJSONConfig = {
  version: string
}

function isPackageJSONConfig(value: unknown): value is PackageJSONConfig {
  return(
    typeof value === 'object' &&
    value !== null &&
    !Array.isArray(value) &&
    Object.hasOwn(value, 'version')
  );
}


export class VersionCommand implements Command {
  constructor(
    private readonly filepath: string = './package.json'
  ) {}

  private readVersion(): string {
    const JsonContent = readFileSync(resolve(this.filepath), 'utf-8');
    const importedContent: unknown = JSON.parse(JsonContent);

    if (! isPackageJSONConfig(importedContent)){
      throw new Error('failed to parse JSON');
    }

    return importedContent.version;
  }

  getName(): string {
    return '--version';
  }

  public async execute(..._parameters: string[]): Promise<void> {
    try{
      const version = this.readVersion();
      console.info(version);
      console.info('version');
    } catch(error: unknown){
      console.error(`Failed to read version from ${this.filepath}`);

      if(error instanceof Error) {
        console.error(error.message);
      }
    }
  }
}
