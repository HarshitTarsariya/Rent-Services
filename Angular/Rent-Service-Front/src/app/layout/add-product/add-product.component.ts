import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { productUpload } from 'src/app/class/productUpload';
import { NOT_HOME } from 'src/app/reducers/appactions';
import appstore from 'src/app/reducers/appstore';
import { ProductService } from 'src/app/services/product.service';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  product:productUpload=new productUpload();
  images=[];
  constructor(private router:Router,public snakbar:MatSnackBar,private productService:ProductService) { }

  ngOnInit(): void {
    appstore.dispatch({type:NOT_HOME});
  }
  addProduct(){
    this.product.dateUploaded=new Date();
    console.log(new Date());
    this.productService.addProduct(this.product).subscribe(
      (res)=>{
        this.snakbar.open(res['message'],"Close",{
          duration:6000,
          panelClass: 'my-custom-snackbar',
        });
        this.router.navigate(['/home']);
      },
      (err)=>{
        this.snakbar.open(err.error.message,"Close",{
          duration:6000,
          panelClass: 'my-custom-snackbar',
        });
      }
    );
  }
  onFileChange(event) {
    this.images=[];
    if (event.target.files && event.target.files[0]) {
        var filesAmount = event.target.files.length;
        if(filesAmount>4){
          this.snakbar.open("Photos Uploading limit is 4","Close",{
            duration:6000,
            panelClass: 'my-custom-snackbar',
          });
        }else{
          let filenames="";
          for (let i = 0; i < filesAmount; i++) {
            var reader = new FileReader();
            reader.onload = (event:any) => {
                this.images.push(event.target.result); 
            }
            filenames+=event.target.files[i].name+" ";
            reader.readAsDataURL(event.target.files[i]);
            this.product.images=this.images;
          }
        }   
    }
  }
}
