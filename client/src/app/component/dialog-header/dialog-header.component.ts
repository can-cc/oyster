import { Component, OnInit, Input } from '@angular/core';
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-dialog-header',
  templateUrl: './dialog-header.component.html',
  styleUrls: ['./dialog-header.component.css']
})
export class DialogHeaderComponent implements OnInit {
  @Input() title?: string;
  @Input() closeable?: boolean;
  @Input() onClose?: () => void;

  faTimesCircle = faTimesCircle;

  constructor() {}

  ngOnInit() {}

  handleClose() {
    if (this.onClose) {
      this.onClose();
    }
  }
}
