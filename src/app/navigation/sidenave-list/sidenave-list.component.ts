import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-sidenave-list',
  templateUrl: './sidenave-list.component.html',
  styleUrls: ['./sidenave-list.component.css']
})
export class SidenaveListComponent implements OnInit, OnDestroy {
  @Output() closeSadenave = new EventEmitter();
  @Output() changeDiractionSidenave = new EventEmitter();
  status = false;
  subScription: Subscription
  constructor(private authService: AuthService, public translate: TranslateService) { }

  ngOnInit() {
    this.subScription = this.authService.authChange.subscribe(authStatus => {
      this.status = authStatus;
    })
  }
  toCloseSidenave() {
    this.closeSadenave.emit()
  }
  onChangeDirection(language: string) {
    this.changeDiractionSidenave.emit(language);
  }
  ngOnDestroy() {
    if (this.subScription) {
      this.subScription.unsubscribe();
    }
  }

  onLogout() {
    this.toCloseSidenave();
    this.authService.logoutUser();
  }

}
