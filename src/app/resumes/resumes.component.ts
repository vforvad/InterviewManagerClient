import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import {Router, ActivatedRoute, Params} from '@angular/router';

import { Resume } from './resume.model';
import { Skill } from '../shared/skills/skill.model';
import { ResumesService } from './resumes.service';
import * as fromApp from '../store/app.reducers';

@Component({
  selector: 'app-resumes',
  templateUrl: './resumes.component.html',
  styleUrls: ['./resumes.component.scss']
})
export class ResumesComponent implements OnInit, OnDestroy {
  @ViewChild('sliderRef') sliderRef;
  resumesSearchForm: FormGroup;
  resumesFilterForm: FormGroup;
  resumes: Resume[];
  subscription: Subscription;
  searchTimeout: any;
  filters: {
    salary?: {
      min?: number,
      max?: number
    },
    skills?: Skill[],
    order?: string[]
  };
  salaryRangeConfig: any = {
    start: [0, 5],
    behaviour: 'drag',
    connect: true,
    margin: 1,
    range: {
      min: 0,
      max: 20
    },
    pips: {
      mode: 'steps',
      density: 5
    }
  };
  resumesParams: {};
  skillsFilter: Skill[];
  selectedSkills: number[];
  selectedOrder: string;
  ordersFilter: string[];
  disableOrder: boolean;
  disableSkills: boolean;

  constructor(
    private resumesService: ResumesService,
    private activatedRoute: ActivatedRoute,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit() {
    this.resumesService.loadResumes();
    this.resumesService.getFilters();
    this.subscription = this.store.select('resumes').subscribe(
      data => {
        if (data.list) {
          this.disableOrder = false;
          this.disableSkills = false;
          this.resumes = data.list;
        }
        if (data.filters) {
          this.filters = data.filters;
          this.skillsFilter = this.filters.skills;
          this.ordersFilter = this.filters.order;
          if (this.filters.salary && (this.filters.salary.min !== this.filters.salary.max)) {
            this.salaryRangeConfig.range['min'] = this.filters.salary.min;
            this.salaryRangeConfig.range['max'] = this.filters.salary.max;
            if (this.sliderRef) {
              this.sliderRef.slider.updateOptions({
                range: {
                  min: this.filters.salary.min,
                  max: this.filters.salary.max
                }
              });
            }
          }
        }
      }
    );
    this.resumesSearchForm = new FormGroup({
      'query': new FormControl(null)
    });
    this.resumesFilterForm = new FormGroup({
      salary: new FormControl(null)
    });
    this.resumesSearchForm.get('query').valueChanges.subscribe(
      data => {
        if (!this.searchTimeout) {
          this.searchTimeout = setTimeout(() => {
            this.resumesService.searchResumes(data);
            clearTimeout(this.searchTimeout);
            this.searchTimeout = null;
          }, 1000);
        }
      }
    );
  }

  searchResumes(event) {
    this.resumesService.searchResumes(event.target.value);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  submitSearch() {
    const queryString = this.resumesSearchForm.get('query').value;
    this.resumesService.searchResumes(queryString);
  }

  submitFilter() {
    const params = this.getRequestParams()
    this.resumesService.loadResumes({ ...params });
  }

  getRequestParams() {
    let params = {};
    let salary = null;
    const salaryVal = this.resumesFilterForm.get('salary').value;
    const skills = this.selectedSkills;
    const order = this.selectedOrder;
    if (salaryVal) {
      const salary_min = salaryVal[0];
      const salary_max = salaryVal[1];
      salary = JSON.stringify({
        min: salary_min,
        max: salary_max
      });
    }
    if (skills) {
      params['skills'] = skills;
    }
    if (salary) {
      params['salary'] = salary;
    }
    if (order) {
      params['order'] = order;
    }
    return params;
  }

  cancelFilter() {
    this.resumesFilterForm.reset();
    this.disableOrder = true;
    this.disableSkills = true;
    this.resumesService.loadResumes()
  }

  onSkillSelected(event: {id: number}[]) {
    this.selectedSkills = event.map(item => item.id);
    this.selectedSkills = null;
    this.selectedOrder = null;
  }

  onOrderSelected(event: string) {
    this.selectedOrder = event;
  }
}
