import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  emailRegex = /^[a-zA-Z]+[a-zA-Z0-9._]+@[a-zA-Z]+\.[a-zA-Z.]{2,5}$/;
  email_id1:string;
  token:string;
  isToken:boolean=false;
  password1:string;cpassword1:string;

  constructor(public snakbar:MatSnackBar,private userService:UserService,private router:Router,private route:ActivatedRoute) { 
    this.route.queryParams.subscribe(params => {
      this.token = params.token;
      
      if(this.token==undefined){
       this.isToken=false;
      }else{
        this.isToken=true;
      }
    });
    
  }

  ngOnInit(): void {
    
  }
  forgetPassword(){
    this.userService.sendResetLink(this.email_id1).subscribe(
      res=>{
        this.snakbar.open("Reset Link sent on email","Close",{
          duration:6000,
          panelClass: 'my-custom-snackbar',
        });
      },
      err=>{
        this.snakbar.open(err.error.message,"Close",{
          duration:6000,
          panelClass: 'my-custom-snackbar',
        });
      }
    );
  }
  resetPassword(){
    if(this.password1==this.cpassword1){
      this.userService.changePassword({'token':this.token,'password':this.password1}).subscribe(
        res=>{
          this.snakbar.open(res['message'],"Close",{
            duration:6000,
            panelClass: 'my-custom-snackbar',
          });
          this.router.navigate(['login']);
        },
        err=>{
          this.snakbar.open(err.error.message,"Close",{
            duration:6000,
            panelClass: 'my-custom-snackbar',
          });
          this.isToken=false;
        }
      );
    }else{
      this.snakbar.open('Password and Confirm Password donot match',"Close",{
        duration:6000,
        panelClass: 'my-custom-snackbar',
      });
    }
  }

}
