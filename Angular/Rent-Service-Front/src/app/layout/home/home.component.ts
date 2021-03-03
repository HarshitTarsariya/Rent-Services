import { Component, OnInit } from '@angular/core';
import appstore from '../../reducers/appstore'
import {HOME} from '../../reducers/appactions';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    appstore.dispatch({type:HOME});
  }

}
