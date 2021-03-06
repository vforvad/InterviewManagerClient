import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import {Router, ActivatedRoute, Params} from '@angular/router';

import { Company } from '../../companies/company.model';
import { Vacancy } from '../vacancy.model';
import { User } from '../../auth/user.model';
import { Skill } from '../../shared/skills/skill.model';
import { VacanciesService } from '../vacancies.service';
import { SkillsService } from '../../shared/skills/skills.service';
import * as fromApp from '../../store/app.reducers';
import * as VacanyActions from '../store/vacancies.actions';

@Component({
  selector: 'app-vacancy-form',
  templateUrl: './vacancy-form.component.html',
  styleUrls: ['./vacancy-form.component.scss']
})
export class VacancyFormComponent implements OnInit, OnDestroy {
  vacancyForm: FormGroup;
  subscription: Subscription;
  skillsSubscription: Subscription;
  skills: Skill[] = [];
  companyId: number;
  vacancyId: number;
  public vacancyFormErrors: Object = { };

  constructor(private store: Store<fromApp.AppState>,
              private vacanciesService: VacanciesService,
              private skillsService: SkillsService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.skillsService.loadSkills();
    this.vacancyForm = new FormGroup({
      'title': new FormControl(null, [Validators.required]),
      'description': new FormControl(null, [Validators.required]),
      'salary': new FormControl(null, [Validators.required]),
      'skills': new FormArray([])
    });

    this.subscription = this.store.select('vacancies').subscribe(
      data => {
        if (data.detail) {
          this.vacancyForm.patchValue({
            title: data.detail.title,
            description: data.detail.description,
            salary: data.detail.salary
          });
          this.setSkills(data.detail);
        }
      }
    );
    this.skillsSubscription = this.store.select('skills').subscribe(
      data => {
        if (data.list.length > 0) {
          this.skills = data.list;
        }
      }
    );
    this.activatedRoute.params.subscribe((params: Params) => {
      const parameters = this.activatedRoute.snapshot;
      const parentParans = parameters.parent.params;
      this.companyId = parentParans['companyId'];
      this.vacancyId = parameters.params ? parameters.params.id : null;
      if (this.vacancyId) {
          this.vacanciesService.receiveVacancy(this.companyId, this.vacancyId);
      }
      else {
        if (this.vacancyForm) {
          this.vacancyForm.patchValue({
            title: null,
            description: null,
            salary: null,
            skills: []
          });
        }
      }
    });
  }

  addSkill(skill: Skill) {
    let skills = this.vacancyForm.value.skills.map(item => item.id);
    if (!skills.includes(skill.id)) {
        this.setSkillToForm(skill);
    }
  }

  deleteSkill(skill: Skill) {
    const idx = this.vacancyForm.value.skills.findIndex(
      item => item.id == skill.id
    );
    if (idx !== -1) {
      (<FormArray>this.vacancyForm.get('skills')).removeAt(idx);
    }
  }

  submit() {
    const params = this.vacancyForm.value;
    params.company_id = this.companyId;
    params.skills = params.skills.map(item => item.id);
    if (this.vacancyId) {
      this.vacanciesService.updateVacancy(this.companyId, this.vacancyId, params);
    }
    else {
        this.vacanciesService.createVacancy(this.companyId, params);
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.skillsSubscription.unsubscribe();
  }

  private setSkillToForm(skill: Skill) {
    const control = new FormControl(skill, Validators.required);
    (<FormArray>this.vacancyForm.get('skills')).push(control);
  }

  private setSkills(detail: Vacancy) {
    if (detail.skills) {
      const skillsArr = detail.skills.map(item => {
        return new FormControl(item, Validators.required);
      });
      this.vacancyForm.setControl('skills', new FormArray(skillsArr));
    }
  }

}
