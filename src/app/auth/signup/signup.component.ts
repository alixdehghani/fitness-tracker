import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { UiService } from 'src/app/share/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  maxDate;
  loadingSpining = false;
  loadingSpiningSubscription: Subscription;
  constructor(private authService: AuthService, private uiServices: UiService) { }

  ngOnInit() {
    this.loadingSpiningSubscription = this.uiServices.loadingSpining.subscribe(resault => {
      console.log(resault);
      this.loadingSpining = resault;
    })
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }
  onSubmit(form: NgForm) {
    this.authService.registerUser({
      email: form.value.email,
      password: form.value.password
    })

  }
  ngOnDestroy() {
    if (this.loadingSpiningSubscription) {
      this.loadingSpiningSubscription.unsubscribe();
    }
  }

}