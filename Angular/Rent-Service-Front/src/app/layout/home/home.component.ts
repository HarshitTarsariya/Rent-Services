import { Component, OnInit } from '@angular/core';
import appstore from '../../reducers/appstore'
import {HOME} from '../../reducers/appactions';
import { ProductService } from 'src/app/services/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products=[];
  constructor(private productService:ProductService,private snakbar:MatSnackBar) { }

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

}
