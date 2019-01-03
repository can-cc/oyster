import * as yaml from 'js-yaml';
import * as path from 'path';
import * as fs from 'fs';
import * as R from 'ramda';

class Configure {
  private config: { [key: string]: string; SERCERT_KEY: string };

  constructor() {
    const configDoc: any = yaml.safeLoad(fs.readFileSync(path.join(__dirname, '../../config/config.yaml'), 'utf8'));
    const customConfigDoc: any = yaml.safeLoad(
      fs.readFileSync(path.join(__dirname, '../../config/config.custom.yaml'), 'utf8')
    );

    this.config = {
      ...configDoc,
      ...customConfigDoc
    };
    this.overrideConfigKeyFromEnv();
  }

  public getConfig(key: string): any {
    return this.config[key];
  }

  private overrideConfigKeyFromEnv() {
    this.config = R.mapObjIndexed((value: string, key: string, config: any) => {
      if (process.env[key]) {
        config[key] = process.env[key];
      }
      return config[key];
    }, this.config);
  }
}

export default new Configure();
