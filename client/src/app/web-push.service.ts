import { throwError as observableThrowError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class WebPushService {
  constructor(private httpClient: HttpClient) {}

  public urlBase64ToUint8Array(base64String: string): Uint8Array {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  public pingNotification = (msg: string): Observable<any> => {
    return this.httpClient.post('/api/webpush/ping', { msg }).pipe(catchError(this.handleError));
  }

  public addSubscriber(subscription: any): Observable<any> {
    const body = {
      subscription: subscription
    };

    return this.httpClient.post('/api/webpush/subscribe', body).pipe(catchError(this.handleError));
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      errMsg = `${error.statusText || 'Network error'}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    return observableThrowError(errMsg);
  }
}
