import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-ping-dialog',
  templateUrl: './ping-dialog.component.html',
  styleUrls: ['./ping-dialog.component.css']
})
export class PingDialogComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<PingDialogComponent>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {}
}
