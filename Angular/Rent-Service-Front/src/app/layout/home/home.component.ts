import { Component, OnInit } from '@angular/core';
import appstore from '../../reducers/appstore'
import {ADD_TO_CART, HOME} from '../../reducers/appactions';
import { ProductService } from 'src/app/services/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products=[];
  constructor(private productService:ProductService,private snakbar:MatSnackBar,private router:Router,private userService:UserService) { }

  ngOnInit(): void {
    appstore.dispatch({type:HOME});
    this.productService.getProducts().subscribe((res)=>{
      this.products=res['products'];
    },(err)=>{
      this.snakbar.open(err.error.message,"Close",{
        duration:6000,
        panelClass: 'my-custom-snackbar',
      });
    });
  }

  addToCart(id){
    if(!appstore.getState().isLoggedIn){
      this.router.navigate(['/login']);
      return;
    }

    this.userService.addToCart({cart:id}).subscribe(
      (res)=>{
        appstore.dispatch({type:ADD_TO_CART,payload:{cart:res['cart']}});
      },
      (err)=>{
        this.snakbar.open(err.error.message,"Close",{
          duration:6000,
          panelClass: 'my-custom-snackbar',
        });
      }
    );
  }
}
