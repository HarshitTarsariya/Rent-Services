import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router:Router) { 
    
  }
  url:string;
  ishome:boolean;
  ngOnInit(): void {
    this.url=window.location.href.toString()
    if(this.url.search("home")!=-1){
      this.ishome=true;
    }else{
      this.ishome=false;
    }
  }
}
