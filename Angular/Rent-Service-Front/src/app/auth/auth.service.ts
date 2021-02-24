import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() { }

  token:String="";
  isAuthenticated:boolean=false;

  getToken():String{
    return this.token;
  }
  getIsAuth(){
    return this.isAuthenticated;
  }
}
