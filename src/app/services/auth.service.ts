import { HttpHeaders, HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StorageService } from './storage.service';
import { LoginRequestPayload } from '../models/login-request.payload';
import { LoginResponse } from '../models/login-response.payload';
import { SignupRequestPayload } from '../models/signup-request.payload';

const AUTH_API = environment.apiBaseUrl + '/api/v1/auth';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Accept': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private storageService: StorageService) {}
  @Output() loggedIn: EventEmitter<boolean> = new EventEmitter();
  @Output() username: EventEmitter<string> = new EventEmitter();

  login(loginRequestPayload: LoginRequestPayload): Observable<any> {
    return this.http
      .post<LoginResponse>(
        AUTH_API + '/login',
        loginRequestPayload,
        httpOptions
      )
      .pipe(
        map((data) => {
          this.storageService.set('username', data.username);
          this.storageService.set('roles', data.roles);
          this.storageService.set('email', data.email);
          this.loggedIn.emit(true);
          this.username.emit(data.username);
          return true;
        })
      );
  }


  signup(signupRequestPayload: SignupRequestPayload): Observable<any> {
    return this.http.post(
      AUTH_API + '/signup',
      signupRequestPayload,
      {responseType: 'text'}
    );
  }

  logout():  Observable<any> {
    return this.http.post(AUTH_API + '/logout', { }, httpOptions);
  }

  refreshToken():  Observable<any> {
    return this.http.post(AUTH_API + '/refreshtoken', { }, httpOptions);
  }

}