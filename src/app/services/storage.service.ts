import { Injectable } from '@angular/core';

const USER_KEY = 'current-auth-user';


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() {}

  clean(): void {
    window.localStorage.clear();
  }

  public getUsername(): any{
    return window.localStorage.getItem('username');
  }

  public getRoles(): string[]{
    let res:string[] = [];
    if(this.isLoggedIn()){
      let roles = window.localStorage.getItem('roles')!;
      res=roles.split(',');
    }
    return res;
  }



  public saveUser(user: any): void {
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.localStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }

  public isLoggedIn(): boolean {
    return window.localStorage.getItem(USER_KEY) != null;
  }

  public set(key:string, value: any): void{
    return window.localStorage.setItem(key, value);
  }

}