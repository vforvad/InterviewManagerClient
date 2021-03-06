import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InterviewsComponent } from './interviews.component';
import { InterviewDetailComponent } from './interview-detail/interview-detail.component';
import { InterviewFormComponent } from './interview-form/interview-form.component';
import { InterviewEmptyComponent } from './interview-empty/interview-empty.component';

export const interviewsRoutes: Routes = [
  { path: '', component: InterviewsComponent, children: [
    { path: '', component: InterviewEmptyComponent },
    { path: 'new', component: InterviewFormComponent, pathMatch: 'full' },
    { path: ':id', component: InterviewDetailComponent },
    { path: ':id/edit', component: InterviewFormComponent }
  ] },
];

@NgModule({
  imports: [
    RouterModule.forChild(interviewsRoutes)
  ],
  exports: [RouterModule]
})
export class InterviewsRoutingModule {}
