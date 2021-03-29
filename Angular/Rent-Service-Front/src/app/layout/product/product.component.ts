import { Component, OnInit } from '@angular/core';
import { NOT_HOME } from 'src/app/reducers/appactions';
import appstore from 'src/app/reducers/appstore';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    appstore.dispatch({type:NOT_HOME});
  }

}
