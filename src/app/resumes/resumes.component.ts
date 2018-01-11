import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import {Router, ActivatedRoute, Params} from '@angular/router';

import { Resume } from './resume.model';
import { ResumesService } from './resumes.service';
import * as fromApp from '../store/app.reducers';

@Component({
  selector: 'app-resumes',
  templateUrl: './resumes.component.html',
  styleUrls: ['./resumes.component.scss']
})
export class ResumesComponent implements OnInit, OnDestroy {
  resumesSearchForm: FormGroup;
  resumes: Resume[];
  subscription: Subscription;

  constructor(
    private resumesService: ResumesService,
    private activatedRoute: ActivatedRoute,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit() {
    this.resumesService.loadResumes();
    this.subscription = this.store.select('resumes').subscribe(
      data => {
        if (data.list.length > 0) {
          this.resumes = data.list;
        }
      }
    );
    this.resumesSearchForm = new FormGroup({
      'query': new FormControl(null)
    });
    this.resumesSearchForm.get('query').valueChanges.subscribe(
      data => {
        console.log(data);
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  submitSearch() {

  }

}
