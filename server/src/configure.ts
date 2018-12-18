import * as yaml from 'js-yaml';
import * as path from 'path';
import * as fs from 'fs';

class Configure {
  private config: { [key: string]: string; SERCERT_KEY: string };

  constructor() {
    const configDoc: any = yaml.safeLoad(
      fs.readFileSync(path.join(__dirname, '../../config/config.yaml'), 'utf8')
    );
    const customConfigDoc: any = yaml.safeLoad(
      fs.readFileSync(path.join(__dirname, '../../config/config.custom.yaml'), 'utf8')
    )
    this.config = {
      ...configDoc,
      ...customConfigDoc
    };
  }

  public getConfig(key: string): any {
    return this.config[key];
  }
}

export default new Configure();
