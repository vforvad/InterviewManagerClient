import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { EmployeesService } from '../employees.service';
import * as fromApp from '../../store/app.reducers';
import * as EmployeesActions from '../store/employees.actions';

@Component({
  selector: 'app-employees-form',
  templateUrl: './employees-form.component.html',
  styleUrls: ['./employees-form.component.scss']
})
export class EmployeesFormComponent implements OnInit {
  employeesForm: FormGroup;

  constructor(private store: Store<fromApp.AppState>,
              private employeesService: EmployeesService) { }

  ngOnInit() {
    this.employeesForm = new FormGroup({
      'employees': new FormArray([])
    });
  }

  submit() {
    console.log(this.employeesForm.value);
  }

  addEmployee() {
    const control = new FormGroup({
      'email': new FormControl(null, [Validators.required]),
      'role': new FormControl(null, [Validators.required])
    });
    (<FormArray>this.employeesForm.get('employees')).push(control);
    console.log((<FormArray>this.employeesForm.get('employees')));
  }

}
