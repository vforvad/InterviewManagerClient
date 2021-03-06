import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSvgIconModule } from 'ngx-svg-icon';

import { VacanciesComponent } from './vacancies.component';
import { VacanciesRoutingModule } from './vacancies-routing.module';
import { VacanciesListItemComponent } from './vacancies-list-item/vacancies-list-item.component';
import { VacancyEmpty } from './vacancy-empty/vacancy-empty.component';
import { VacancyDetailComponent } from './vacancy-detail/vacancy-detail.component';
import { VacancyFormComponent } from './vacancy-form/vacancy-form.component';
import { PipeModule } from '../shared/pipe.module';
import { InterviewsModule } from '../interviews/interviews.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    VacanciesRoutingModule,
    NgxSvgIconModule,
    PipeModule,
    InterviewsModule
  ],
  declarations: [
    VacanciesComponent,
    VacanciesListItemComponent,
    VacancyEmpty,
    VacancyDetailComponent,
    VacancyFormComponent
  ],
  exports: [
    VacanciesListItemComponent
  ]
})
export class VacanciesModule {}
