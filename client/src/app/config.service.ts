import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Config {
  [key: string]: string;
  vapidPublicKey: string;
}

@Injectable()
export class ConfigService {
  private config: Config;
  constructor(private httpClient: HttpClient) {
    this.loadRemoteConfig();
  }

  private loadRemoteConfig(): void {
    this.httpClient.get('/api/client/config').subscribe((respone: Config) => {
      this.config = respone;
    });
  }

  public getConfig(key: string): string {
    return this.config[key];
  }
}
