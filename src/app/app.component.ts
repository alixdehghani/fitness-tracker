import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService, public translate: TranslateService) {
    
  }
  title = 'fitness-tracker';
  direction = "";
  onchangeDirection(language: string) {
    if(language === 'fa') {
      this.direction = "rtl";
    } else {
      this.direction = "ltr";
    }
    this.translate.use(language);
  }
  ngOnInit() {
    this.direction = "rtl"
    this.translate.addLangs(['en', 'fa']);
    this.translate.setDefaultLang('fa');
    this.authService.initAuthLisiner();
  }
}
