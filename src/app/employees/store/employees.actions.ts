import { Action } from '@ngrx/store';

import { User } from '../../auth/user.model';

export const EMPLOYEES_LOADED = 'EMPLOYEES_LOADED';
export const SUCCESS_EMPLOYEE_CREATED = 'SUCCESS_EMPLOYEE_CREATED';
export const FAILED_EMPLOYEE_CREATED = 'FAILED_EMPLOYEE_CREATED';

export class EmployeesLoaded implements Action {
  readonly type = EMPLOYEES_LOADED;

  constructor(public payload: User[]) {}
}

export class SuccessEmployeeCreated implements Action {
  readonly type = SUCCESS_EMPLOYEE_CREATED;

  constructor(public payload: User[]) {  }
}

export class FailedEmployeeCreated implements Action {
  readonly type = FAILED_EMPLOYEE_CREATED;

  constructor(public payload: {}) { }
}

export type EmployeesActions =
EmployeesLoaded |
SuccessEmployeeCreated |
FailedEmployeeCreated;
