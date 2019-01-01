import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() toggleSidebar = new EventEmitter();
  status = false;
  subsctiption: Subscription;
  constructor(private authService: AuthService) { }

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
}
