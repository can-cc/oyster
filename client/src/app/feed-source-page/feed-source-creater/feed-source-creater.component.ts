import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { FeedSourceService } from '../../core/feed-source.service';
import { FeedSource } from '../../../typing/feed';

@Component({
  selector: 'app-feed-source-creater',
  templateUrl: './feed-source-creater.component.html',
  styleUrls: ['./feed-source-creater.component.css']
})
export class FeedSourceCreaterComponent implements OnInit {
  public form: FormGroup;

  constructor(fb: FormBuilder, private feedSourceService: FeedSourceService) {
    this.form = fb.group({
      url: new FormControl(''),
      name: new FormControl('')
    });
  }

  ngOnInit() {}

  handleCreate() {
    this.feedSourceService.createFeedSource(this.form.value).subscribe((source: FeedSource) => {
      this.form.reset();
    });
  }
}
