import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LOGOUT } from 'src/app/reducers/appactions';
import appstore from 'src/app/reducers/appstore';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
    appstore.dispatch({type:LOGOUT});
    this.router.navigate(['/login']);
  }

}
