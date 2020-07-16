import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';
import { ProductModel } from '../product-list/product.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  title : String = "Edit";
  p_id="";

  constructor(private _route:ActivatedRoute, private productService: ProductService,private router: Router) { }

  editItem = new ProductModel(null,null,null,null,null,null,null,null);

  ngOnInit(): void {

    this._route.params.subscribe(params =>{
      this.p_id = params['p_id'];
    });
    this.productService.editProduct(this.p_id)
    .subscribe((data)=>{
      this.editItem=JSON.parse(JSON.stringify(data));             
    });
  }

  UpdateProduct(){
    this.productService.updateProduct(this.editItem);
    console.log("called");
    alert("Updated successfully");
    this.router.navigate(['/']);
  }

}
