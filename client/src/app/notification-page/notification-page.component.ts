import { Component, OnInit } from '@angular/core';
import { mergeMap } from 'rxjs/operators';
import { PingDialogComponent } from './ping-dialog/ping-dialog.component';
import { MatDialogRef, MatSnackBar, MatDialog } from '@angular/material';
import { ConfigService } from '../config.service';
import { WebPushService } from '../web-push.service';

@Component({
  selector: 'app-notification-page',
  templateUrl: './notification-page.component.html',
  styleUrls: ['./notification-page.component.css']
})
export class NotificationPageComponent implements OnInit {
  private swScope = './web-push-service-worker.js';

  constructor(
    private configService: ConfigService,
    private webPushService: WebPushService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit() {}

  public async subscribeToPush(): Promise<void> {
    try {
      const publicKey: string = this.configService.getConfig('vapidPublicKey');
      const convertedVapidKey = this.webPushService.urlBase64ToUint8Array(publicKey);

      const registration = await navigator.serviceWorker.getRegistration(this.swScope);

      const subscription = await registration.pushManager.getSubscription();
      if (subscription) {
        this.snackBar.open('You already subscribed.', null, {
          duration: 2000
        });
      } else {
        const pushSubscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: convertedVapidKey
        });

        this.webPushService.addSubscriber(pushSubscription).subscribe(
          res => {
            this.snackBar.open('Now you are subscribed', null, {
              duration: 2000
            });
          },
          err => {
            console.error('[App] Add subscriber request failed', err);
          }
        );
      }
    } catch (error) {
      console.error(error);
    }
  }

  public ping(): void {
    const dialogRef: MatDialogRef<PingDialogComponent, string> = this.dialog.open(
      PingDialogComponent,
      {
        width: '250px'
      }
    );
    dialogRef
      .afterClosed()
      .pipe(mergeMap(this.webPushService.pingNotification))
      .subscribe();
  }
}
