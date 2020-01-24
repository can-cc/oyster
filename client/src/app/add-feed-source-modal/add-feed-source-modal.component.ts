import { Component, OnInit } from '@angular/core';
import { faLink, faRegistered } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatDialogRef } from '@angular/material';
import { AddSources } from '../state/feed.actions';
import { StoreType } from '../../typing/feed';
import { Store } from '@ngrx/store';

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
    url: new FormControl('', [Validators.required])
  });

  complete$ = new Subject();

  constructor(
    private dialogRef: MatDialogRef<AddFeedSourceModalComponent>,
    private store: Store<StoreType>
  ) {}

  ngOnInit() {}

  handleClose = () => {
    this.dialogRef.close();
  };

  ngOnDestory() {
    this.complete$.next();
    this.complete$.complete();
  }

  submit() {
    const formData = this.form.value;
    const resetFormFn = () => {
      this.form.reset();
    };
    this.store.dispatch(new AddSources({ formData }, { resetFormFn }));
  }
}
