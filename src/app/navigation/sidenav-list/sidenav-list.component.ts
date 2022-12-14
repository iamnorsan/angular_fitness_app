import {Component, OnInit, EventEmitter, Output, OnDestroy} from '@angular/core';
import {AuthService} from "../../auth/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit, OnDestroy {
  @Output() closeSidenav = new EventEmitter<void>()
  subscription = new Subscription()
  isAuth:boolean;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.subscription = this.authService.authChange.subscribe(authStatus =>{
      this.isAuth = authStatus;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onClose() {
    this.closeSidenav.emit();
  }

  onLogout(){
    this.authService.logout();
    this.onClose();
  }

}
