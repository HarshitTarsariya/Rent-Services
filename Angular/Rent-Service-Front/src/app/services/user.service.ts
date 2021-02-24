import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { user } from '../class/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  signUpUser(user:user){
    return this.http.post(environment.apiEndPoint+'/signup',user);
  }
  activateAccount(token){
    return this.http.get(environment.apiEndPoint+'/activate',{headers:{'token':token}});
  }
}
