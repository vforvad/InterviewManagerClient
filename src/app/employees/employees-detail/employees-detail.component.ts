import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import {Router, ActivatedRoute, Params} from '@angular/router';

import { User } from '../../auth/user.model';
import { EmployeesService } from '../employees.service';
import * as fromApp from '../../store/app.reducers';
import * as EmployeesActions from '../store/employees.actions';

@Component({
  selector: 'app-employees-detail',
  templateUrl: './employees-detail.component.html',
  styleUrls: ['./employees-detail.component.scss']
})
export class EmployeesDetailComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  companyId: number;
  employeeId: number;
  employee: User;

  constructor(
    private employeesService: EmployeesService,
    private store: Store<fromApp.AppState>,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.loadVacancy();
    });

    this.subscription = this.store.select('employees').subscribe(
      data => {
        if (data.detail) {
          console.log(data.detail);
          this.employee = data.detail;
        }
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


  private loadVacancy() {
    const params = this.activatedRoute.snapshot;
    const parentParans = params.parent.params;
    this.companyId = parentParans['companyId'];
    this.employeeId = params.params['id'];
    this.employeesService.receiveEmployee(this.companyId, this.employeeId);
  }
}
