import { Component, OnInit } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { FeedSourceService } from '../../core/feed-source.service';
import { FeedSource, StoreType } from '../../../typing/feed';
import { Store } from '@ngrx/store';
import { AddSources } from '../../state/feed.actions';

@Component({
  selector: 'app-feed-source-creater',
  templateUrl: './feed-source-creater.component.html',
  styleUrls: ['./feed-source-creater.component.css']
})
export class FeedSourceCreaterComponent implements OnInit {
  public form: FormGroup;
  public faPlus = faPlus;
  public showForm: boolean = false;

  constructor(
    fb: FormBuilder,
    private feedSourceService: FeedSourceService,
    private store: Store<StoreType>
  ) {
    this.form = fb.group({
      url: new FormControl(''),
      name: new FormControl('')
    });
  }

  ngOnInit() {}

  handleCreate(): void {
    const formData = this.form.value;
    const resetFormFn = () => {
      this.form.reset();
    };
    this.store.dispatch(new AddSources({ formData }, { resetFormFn }));
  }
}
