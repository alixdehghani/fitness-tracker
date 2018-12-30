import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidenave-list',
  templateUrl: './sidenave-list.component.html',
  styleUrls: ['./sidenave-list.component.css']
})
export class SidenaveListComponent implements OnInit, OnDestroy {
  @Output() closeSadenave = new EventEmitter();
  status = false;
  subScription: Subscription
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.subScription = this.authService.authChange.subscribe(authStatus => {
      this.status = authStatus;
    })
  }
  toCloseSidenave(){
    this.closeSadenave.emit()
  }

  ngOnDestroy(){
    this.subScription.unsubscribe();
  }

  onLogout(){
    this.toCloseSidenave();
    this.authService.logoutUser();
  }

}
