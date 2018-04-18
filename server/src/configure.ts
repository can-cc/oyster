import * as yaml from 'js-yaml';
import * as path from 'path';
import * as fs from 'fs';

class Configure {
  private config: { [key: string]: string; SERCERT_KEY: string };

  constructor() {
    const configDoc: any = yaml.safeLoad(
      fs.readFileSync(path.join(__dirname, '../config.yaml'), 'utf8')
    );
    this.config = configDoc;
  }

  public getConfig(key: string): string {
    return this.config[key];
  }
}

export default new Configure();
