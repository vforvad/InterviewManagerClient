import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import * as fromApp from '../../../store/app.reducers';
import { Subscription } from 'rxjs/Subscription';
import { ProfileService } from '../../profile.service';
import { User } from '../../../auth/user.model';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit, OnDestroy {
  user: User;
  infoForm: FormGroup;
  subscription: Subscription;
  infoFormErrors = {};

  constructor(
    private profileService: ProfileService,
    private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.infoForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'first_name': new FormControl(null, [Validators.required]),
      'last_name': new FormControl(null, [Validators.required])
    });

    this.subscription = this.store.select('profile').subscribe(
      data => {
        if(data.profile) {
          this.user = data.profile;
            this.infoForm.patchValue({
              email: data.profile.email,
              first_name: data.profile.first_name,
              last_name: data.profile.last_name
            });
        }
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  updateProfile() {
    this.profileService.updateProfile(this.user.id, this.infoForm.value);
  }
}