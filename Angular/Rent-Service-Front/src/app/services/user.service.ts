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
  login(userCredentials){
    return this.http.post(environment.apiEndPoint+'/login',userCredentials);
  }
  setToken(token){
    localStorage.setItem('token',token);
  }
  sendResetLink(email_id){
    return this.http.post(environment.apiEndPoint+'/resetPasswordSendLink',{'email_id':email_id});
  }
  changePassword(data){
    return this.http.post(environment.apiEndPoint+'/changePassword',data)
  }
  addToCart(data){
    return this.http.post(environment.apiEndPoint+'/addToCart',data);
  }
}
