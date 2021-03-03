import { Component, OnInit } from '@angular/core';
import {user} from '../../class/user';
import {MatSnackBarModule,MatSnackBar, MatSnackBarHorizontalPosition} from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import appstore from 'src/app/reducers/appstore';
import { NOT_HOME } from 'src/app/reducers/appactions';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(public snakbar:MatSnackBar,private userService:UserService,private router:Router) { }
  emailRegex = /^[a-zA-Z]+[a-zA-Z0-9._]+@[a-zA-Z]+\.[a-zA-Z.]{2,5}$/;
  mobileRegex=/^\d{10}$/;
  user:user=new user();

  ngOnInit(): void {
    appstore.dispatch({type:NOT_HOME});
  }
  registerUser(){
    this.trimmer();
    if(this.user.password==this.user.confirm_password){
      this.userService.signUpUser(this.user).subscribe(
        res=>{
          this.snakbar.open("Email Verification is sent on given email","Close",{
            duration:6000,
            panelClass: 'my-custom-snackbar',
          });
          this.router.navigate(['/login'])
        },
        err=>{
          this.snakbar.open(err.error.message,"Close",{
            duration:6000,
            panelClass: 'my-custom-snackbar',
          });
        }
      );
    }else{
      this.snakbar.open("Password and Confirm-Password donot match","Close",{
        duration:6000,
        panelClass: 'my-custom-snackbar',
      });
      this.router.navigate(['/signup']);
    }
  }
  trimmer(){
    this.user.name=this.user.name.trim().toLowerCase();
    this.user.email_id=this.user.email_id.trim().toLowerCase();
    this.user.password=this.user.password.trim();
    this.user.confirm_password=this.user.confirm_password.trim();
    this.user.mobile_no=this.user.mobile_no.trim();
  }
}
