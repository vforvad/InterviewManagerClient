import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CompaniesRoutingModule } from './companies-routing.module';
import { CompaniesComponent } from './companies.component';
import { FormComponent } from './form/form.component';
import { CompanyListItemComponent } from './item/item.component';
import { DetailComponent } from './detail/detail.component';
import { BaseComponent } from './base/base.component';
import { NgxSvgIconModule } from 'ngx-svg-icon';
import { DpDatePickerModule } from 'ng2-date-picker';
import { UploaderModule } from '../shared/uploader/uploader.module';
import { VacanciesModule } from '../vacancies/vacancies.module';
import { InterviewsModule } from '../interviews/interviews.module';
import { PipeModule } from '../shared/pipe.module';
import { VacanciesTabComponent } from './tabs/vacancies-tab/vacancies-tab.component';
import { EmployeesTabComponent } from './tabs/employees-tab/employees-tab.component';
import { InterviewsTabComponent } from './tabs/interviews-tab/interviews-tab.component';

@NgModule({
  imports: [
    CompaniesRoutingModule,
    CommonModule,
    UploaderModule,
    DpDatePickerModule,
    ReactiveFormsModule,
    NgxSvgIconModule,
    PipeModule,
    VacanciesModule,
    InterviewsModule
  ],
  declarations: [
    CompaniesComponent,
    FormComponent,
    CompanyListItemComponent,
    DetailComponent,
    BaseComponent,
    VacanciesTabComponent,
    EmployeesTabComponent,
    InterviewsTabComponent
  ]
})
export class CompaniesModule {}
