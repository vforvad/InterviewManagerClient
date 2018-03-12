import { Action } from '@ngrx/store';

import { Company } from '../company.model';
import { Order } from '../../shared/filters/order.model';
import { SelectItems } from '../../shared/filters/select.item.model';

export const COMPANIES_LOADED = 'COMPANIES_LOADED';
export const COMPANY_LOADED = 'COMPANY_LOADED';
export const SUCCESS_COMPANY_CREATED = 'SUCCESS_COMPANY_CREATED';
export const FAILED_COMPANY_CREATED = 'FAILED_COMPANY_CREATED';
export const LEAVE_DETAIL_PAGE = 'LEAVE_DETAIL_PAGE';
export const SUCCESS_UPDATE = 'SUCCESS_UPDATE';
export const FAILED_UPDATE = 'FAILED_UPDATE';
export const DELETE_COMPANY = 'DELETE_COMPANY';
export const DISABLE_COMPANY_DELETED = 'DISABLE_COMPANY_DELETED';
export const RECEIVE_FILTERS = 'RECEIVE_FILTERS';
export const DISABLE_FILTERS = 'DISABLE_FILTERS';

export class CompaniesLoaded implements Action {
  readonly type = COMPANIES_LOADED;

  constructor(public payload: Company[]) {}
}

export class SuccessCompanyCreated implements Action {
  readonly type = SUCCESS_COMPANY_CREATED;

  constructor(public payload: { company: Company }) {}
}

export class FailedCompanyCreated implements Action {
  readonly type = FAILED_COMPANY_CREATED;

  constructor(public payload: {}) {}
}

export class CompanyLoaded implements Action {
  readonly type = COMPANY_LOADED;

  constructor(public payload: Company) {}
}

export class LeaveDetailPage implements Action {
  readonly type = LEAVE_DETAIL_PAGE;
}

export class SuccessUpdate implements Action {
  readonly type = SUCCESS_UPDATE;

  constructor(public payload: Company) {}
}

export class FailedUpdate implements Action {
  readonly type = FAILED_UPDATE;

  constructor(public payload: {}) {}
}

export class DeleteCompany implements Action {
  readonly type = DELETE_COMPANY;

  constructor(public payload: Company) {}
}

export class DisableCompanyDeleted implements Action {
  readonly type = DISABLE_COMPANY_DELETED;
}

export class ReceiveFilters implements Action {
  readonly type = RECEIVE_FILTERS;

  constructor(public payload: { order: Order[], roles: SelectItems[] }) {}
}

export class DisableFilters implements Action {
  readonly type = DISABLE_FILTERS;
}

export type CompaniesActions = CompaniesLoaded |
CompanyLoaded |
SuccessCompanyCreated |
FailedCompanyCreated |
LeaveDetailPage |
SuccessUpdate |
FailedUpdate |
DeleteCompany |
DisableCompanyDeleted |
ReceiveFilters |
DisableFilters;
