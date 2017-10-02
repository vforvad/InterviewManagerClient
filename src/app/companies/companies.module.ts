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
import { NgDatepickerModule } from 'ng2-datepicker';
import {DpDatePickerModule} from 'ng2-date-picker';

@NgModule({
  declarations: [
    CompaniesComponent,
    FormComponent,
    CompanyListItemComponent,
    DetailComponent,
    BaseComponent
  ],
  imports: [
    CompaniesRoutingModule,
    CommonModule,
    NgDatepickerModule,
    DpDatePickerModule,
    ReactiveFormsModule,
    NgxSvgIconModule
  ]
})
export class CompaniesModule {}
