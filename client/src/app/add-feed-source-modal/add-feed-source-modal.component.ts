import { Component, OnInit } from '@angular/core';
import { faLink, faRegistered } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-add-feed-source-modal',
  templateUrl: './add-feed-source-modal.component.html',
  styleUrls: ['./add-feed-source-modal.component.css']
})
export class AddFeedSourceModalComponent implements OnInit {
  public faLink = faLink;
  public faRegistered = faRegistered;
  public form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    url: new FormControl('', [Validators.required]),
    faviconUrl: new FormControl('', [Validators.required])
  });

  complete$ = new Subject();

  constructor(private dialogRef: MatDialogRef<AddFeedSourceModalComponent>) {}

  ngOnInit() {
    this.form
      .get('url')
      .valueChanges.pipe(takeUntil(this.complete$))
      .subscribe((url: string) => {
        this.form.get('faviconUrl').setValue(url + '/favicon.ico');
      });
  }

  handleClose = () => {
    this.dialogRef.close();
  };

  ngOnDestory() {
    this.complete$.next();
    this.complete$.complete();
  }
}
