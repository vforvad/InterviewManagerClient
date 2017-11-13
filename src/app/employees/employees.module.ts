import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSvgIconModule } from 'ngx-svg-icon';

import { EmployeesRoutingModule } from './employees-routing.module';
import { EmployeesComponent } from './employees.component';
import { EmployeesListItemComponent } from './employees-list-item/employees-list-item.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EmployeesRoutingModule,
    NgxSvgIconModule
  ],
  declarations: [
    EmployeesComponent,
    EmployeesListItemComponent
  ]
})
export class EmployeesModule {}
