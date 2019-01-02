import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() toggleSidebar = new EventEmitter();
  @Output() changeDiraction = new EventEmitter();
  status = false;
  subsctiption: Subscription;
  constructor(private authService: AuthService, public translate: TranslateService) {}

  ngOnInit() {
    this.subsctiption = this.authService.authChange.subscribe(
      authStatus => {
        this.status = authStatus;
      })
  }
  toToggleSidebar() {
    this.toggleSidebar.emit();
  }
  ngOnDestroy() {
    if (this.subsctiption) {
      this.subsctiption.unsubscribe();
    }
  }
  onLogout() {
    this.authService.logoutUser();
  }
  onChangeDirection(language: string) {
    this.changeDiraction.emit(language);
  }
}
