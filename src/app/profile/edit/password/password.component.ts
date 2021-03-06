import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import * as fromApp from '../../../store/app.reducers';
import { Subscription } from 'rxjs/Subscription';
import { ProfileService } from '../../profile.service';
import { User } from '../../../auth/user.model';


@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements OnInit {
  user: User;
  passwordForm: FormGroup;
  subscription: Subscription;
  passwordFormErrors = {
    current_password: null,
    password: null,
    password_confirmation: null
  };

  constructor(private profileService: ProfileService,
              private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.passwordForm = new FormGroup({
      'current_password': new FormControl(null, [Validators.required]),
      'password': new FormControl(null, [Validators.required]),
      'password_confirmation': new FormControl(null, [
        Validators.required, this.matchingPassword.bind(this)
      ])
    });

    this.subscription = this.store.select('profile').subscribe(
      data => {
        if(data.profile) {
          this.user = data.profile;
        }
      }
    );
  }

  changePassword() {
    this.profileService.changePassword(this.user.id, this.passwordForm.value);
  }

  matchingPassword(control: FormControl): {[s: string]: boolean } {
    const passwordConfirmation = control.value;
    if (this.passwordForm) {
      const password = this.passwordForm.get('password').value;
      if (password !== passwordConfirmation) {
        return {
          notMatching: true
        };
      }
    }
    return null;

  }

}
