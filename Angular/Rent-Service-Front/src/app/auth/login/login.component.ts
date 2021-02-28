import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { user } from 'src/app/class/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  emailRegex = /^[a-zA-Z]+[a-zA-Z0-9._]+@[a-zA-Z]+\.[a-zA-Z.]{2,5}$/;
  user:user = new user();
  constructor(public snakbar:MatSnackBar,private userService:UserService,private router:Router) { }
  
  ngOnInit(): void {
  }
  loginUser(){
    this.userService.login(this.user).subscribe(
      res=>{
        this.userService.setToken(res['token']);
        this.snakbar.open("Logged In","Close",{
          duration:6000,
          panelClass: 'my-custom-snackbar',
        });
        this.router.navigate(['/home']);
      },
      err=>{
        this.snakbar.open(err.error.message,"Close",{
          duration:6000,
          panelClass: 'my-custom-snackbar',
        });
      }
    );
  }

}
