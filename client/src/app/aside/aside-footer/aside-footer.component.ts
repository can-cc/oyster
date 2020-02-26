import { Component, OnInit } from '@angular/core';
import { faSearch, faPlusCircle, faCheckSquare, faEdit } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material';
import { AddFeedSourceModalComponent } from '../../add-feed-source-modal/add-feed-source-modal.component';

@Component({
  selector: 'app-aside-footer',
  templateUrl: './aside-footer.component.html',
  styleUrls: ['./aside-footer.component.css']
})
export class AsideFooterComponent implements OnInit {
  faSearch = faSearch;
  faPlusCircle = faPlusCircle;
  faEdit = faEdit;
  faCheckSquare = faCheckSquare;

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
