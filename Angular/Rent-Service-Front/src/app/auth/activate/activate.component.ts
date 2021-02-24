import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-activate',
  templateUrl: './activate.component.html',
  styleUrls: ['./activate.component.css']
})
export class ActivateComponent implements OnInit {

  private token:String;
  constructor(private userService:UserService,private router:Router,private snakbar:MatSnackBar,private route:ActivatedRoute) {
    this.route.queryParams.subscribe(params => {this.token = params.token});
   }

  ngOnInit(): void {
    this.userService.activateAccount(this.token).subscribe(
      res=>{
        this.snakbar.open(res['message'],"Close",{
          duration:6000,
          panelClass: 'my-custom-snackbar',
        });
        this.router.navigate(['/login'])
      },
      err=>{
        this.snakbar.open(err.error['message'],"Close",{
          duration:6000,
          panelClass: 'my-custom-snackbar',
        });
        this.router.navigate(['/login'])
      }
    );
  }
}
