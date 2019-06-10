import { Component, OnInit } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material';
import { AddFeedSourceModalComponent } from '../../add-feed-source-modal/add-feed-source-modal.component';

@Component({
  selector: 'app-aside-top-bar',
  templateUrl: './aside-top-bar.component.html',
  styleUrls: ['./aside-top-bar.component.css']
})
export class AsideTopBarComponent implements OnInit {
  faPlus = faPlus;

  constructor(public dialog: MatDialog) {}

  ngOnInit() {}

  public openAddFeedSourceDialog(): void {
    const dialogRef = this.dialog.open(AddFeedSourceModalComponent, {
      width: '450px',
      autoFocus: true,
      hasBackdrop: true
    });

    dialogRef.afterClosed().subscribe();
  }
}
