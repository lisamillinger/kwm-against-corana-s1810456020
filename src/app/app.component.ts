import { Component, VERSION } from '@angular/core';
import { Vaccination } from './shared/vaccination';
import { AuthenticationService } from './shared/authentication.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private authService: AuthenticationService) {}

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  getLoginLabel() {
    return this.isLoggedIn() ? 'Logout' : 'Login';
  }

  isAdmin() {
    console.log('in isamdin');
    let isAdmin = sessionStorage.getItem('isAdmin');
    if (isAdmin == 'true') {
      return true;
    } else {
      console.log('not an admin');
      return false;
    }
  }
}
