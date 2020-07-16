import { Component, OnInit } from '@angular/core';
import { ProductModel } from "./product.model";
import { ProductService } from "../product.service";
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  title : String = "Product List";

  //Product is the model class for a product item
  products : ProductModel[];

  //image properties
  imageWidth : number = 50;
  imageMargin : number = 2;

  showImage : boolean = false;

  //creating service object for calling getProducts()

  constructor(private productService : ProductService , private router:Router) { }

  

  toggleImage() : void{
    this.showImage = !this.showImage;
  }

  ngOnInit(): void {

    //calling getProducts() and loading the products to products array
    this.productService.getProducts()
    .subscribe((data)=>{
      this.products=JSON.parse(JSON.stringify(data));
    })
  }

  loggedIn()
  {
    return !!localStorage.getItem('token')
  }

    
  //DELETE
   Delete(id:string){
     let Confirm:boolean=confirm("Are you sure you want to delete this product?");
     if(Confirm){
       this.productService.deleteProduct(id)
       .subscribe((response:{id})=>{
         console.log(`product with id ${response.id} deleted successfully`);
         this.productService.getProducts()
         .subscribe((data)=>{
           this.products= JSON.parse(JSON.stringify(data));
         })
       })
        
    }
  }



}

