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
  constructor(private router:Router) { 
    appstore.subscribe(()=>{
      this.ishome=appstore.getState().ishome;  
      this.islogin=appstore.getState().isLoggedIn;
      console.log(appstore.getState());
    });
  }
  
  ngOnInit(): void {
    
  }
}
