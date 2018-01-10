import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSvgIconModule } from 'ngx-svg-icon';
import { DpDatePickerModule } from 'ng2-date-picker';

import { ResumesRoutingModule } from './resumes-routing.module';
import { ResumesComponent } from './resumes.component';

@NgModule({
  imports: [
    CommonModule,
    DpDatePickerModule,
    ReactiveFormsModule,
    NgxSvgIconModule,
    ResumesRoutingModule
  ],
  declarations: [
    ResumesComponent
  ]
})
export class ResumesModule {}
