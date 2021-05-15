import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';

interface Token {
  exp: number;
  people: {
    id: string;
    isAdmin: boolean;
    sv_number: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private api: string =
    'https://corana21.s1810456020.student.kwmhgb.at/api/auth';

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post(`${this.api}/login`, {
      email: email,
      password: password
    });
  }

  public setLocalStorage(token: string) {
    console.log('storing stoken');
    const decodedToken = jwt_decode(token) as Token;
    console.log(decodedToken.people.id);
    console.log(decodedToken.people.isAdmin);
    console.log(decodedToken.people.sv_number);

    sessionStorage.setItem('token', token);
    sessionStorage.setItem('sv_number', decodedToken.people.sv_number);
    sessionStorage.setItem('userId', decodedToken.people.id);
    if (decodedToken.people.isAdmin == false) {
      sessionStorage.setItem('isAdmin', 'false');
    } else {
      sessionStorage.setItem('isAdmin', 'true');
    }
  }

  public getCurrentUserId() {
    return Number.parseInt(sessionStorage.getItem('userId'));
  }

  public getCurrentAdmin() {
    return localStorage.getItem('isAdmin');
  }

  logout() {
    this.http.post(`${this.api}/logout`, {});
    sessionStorage.removeItem('sv_number');
    sessionStorage.removeItem('isAdmin');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userId');
    console.log('logged out');
  }

  public isLoggedIn() {
    if (sessionStorage.getItem('token')) {
      let token: string = sessionStorage.getItem('token');
      const decodedToken = jwt_decode(token) as Token;
      let expirationDate: Date = new Date(0);
      expirationDate.setUTCSeconds(decodedToken.exp);
      if (expirationDate < new Date()) {
        console.log('token expired');
        sessionStorage.removeItem('token');
        return false;
      }
      return true;
    } else {
      return false;
    }
  }

  public isAdmin() {
    console.log("in isamdin");
    let isAdmin = sessionStorage.getItem('isAdmin');
    if (isAdmin == "true") {
      return true;
    } else {
      console.log("not an admin");
      return false;
    }
  }

  public isLoggedOut() {
    return !this.isLoggedIn();
  }
}
