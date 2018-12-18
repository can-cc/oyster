import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { FeedSourceService } from '../../core/feed-source.service';

@Component({
  selector: 'app-feed-source-creater',
  templateUrl: './feed-source-creater.component.html',
  styleUrls: ['./feed-source-creater.component.css']
})
export class FeedSourceCreaterComponent implements OnInit {
  public form: FormGroup;

  constructor(
    fb: FormBuilder,
    private httpClient: HttpClient,
    private feedSourceService: FeedSourceService
  ) {
    this.form = fb.group({
      url: new FormControl(''),
      name: new FormControl('')
    });
  }

  ngOnInit() {
  }

  handleCreate() {
    // this.feedSourceService.
  }
}
