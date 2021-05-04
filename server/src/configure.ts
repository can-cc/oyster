import * as yaml from 'js-yaml';
import * as path from 'path';
import * as fs from 'fs';
import * as R from 'ramda';

class Configure {
  private config: { [key: string]: string };

  constructor() {
    const configDoc: any = yaml.safeLoad(fs.readFileSync(path.join(__dirname, '../../config/config.yaml'), 'utf8'));

    this.config = {
      ...configDoc,
    };
    this.readCustomConfig();
    this.overrideConfigKeyFromEnv();
  }

  public getConfig(key: string): any {
    return this.config[key];
  }

  private readCustomConfig() {
    const customConfigPath = path.join(__dirname, '../../config/config.custom.yaml');
    if (!fs.existsSync(customConfigPath)) {
      return;
    }
    const customConfigDoc: any = yaml.safeLoad(fs.readFileSync(customConfigPath, 'utf8'));
    this.config = {
      ...this.config,
      ...customConfigDoc,
    };
  }

  private overrideConfigKeyFromEnv() {
    const appPrefixKey = 'OY_';
    this.config = R.mapObjIndexed((value: string, key: string, config: any) => {
      if (process.env[appPrefixKey + key]) {
        config[key] = process.env[appPrefixKey + key];
      }
      return config[key];
    }, this.config);
  }
}

export default new Configure();
