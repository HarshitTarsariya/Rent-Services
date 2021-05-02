import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import appstore from '../../reducers/appstore'
import {HOME} from '../../reducers/appactions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  islogin:boolean;
  ishome:boolean;
  cartsize: Number;
  
  constructor(private router:Router) { 
    appstore.subscribe(()=>{
      const appstate=appstore.getState();
      this.ishome=appstate.ishome;  
      this.islogin=appstate.isLoggedIn;
      this.cartsize=appstate.cart;
    });
  }
  
  ngOnInit(): void {
    
  }
}
