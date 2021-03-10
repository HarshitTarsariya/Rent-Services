import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { productUpload } from '../class/productUpload';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }

  addProduct(product){
    return this.http.post(environment.apiEndPoint+'/addProduct',product);
  }
  getProducts(){
    return this.http.get(environment.apiEndPoint+'/allProducts');
  }
}
