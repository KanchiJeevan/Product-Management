import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ProductService } from "./product.service";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private productService : ProductService , private router:Router) { }

  canActivate():boolean{
    if(this.productService.loggedIn())
    {
      console.log('true');
      return true
    }
    else{
      this.router.navigate(['/login'])
      return false
    }
  }
  
}
