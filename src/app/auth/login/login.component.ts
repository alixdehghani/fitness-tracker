import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UiService } from 'src/app/share/ui.service';

import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  loadSpining = false;
  loadSpiningSubscription: Subscription;
  constructor(private authService: AuthService, private uiServices: UiService) {}

  ngOnInit() {
    this.loadSpiningSubscription = this.uiServices.loadingSpining.subscribe(resualt => {
      this.loadSpining = resualt;
    })
    this.loginForm = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email]
      }),
      password: new FormControl('', { validators: [Validators.required] })
    });
    
  }

  onSubmit() {
    this.authService.loginUser({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    });
  }
  ngOnDestroy(){
    this.loadSpiningSubscription.unsubscribe();
  }
}
