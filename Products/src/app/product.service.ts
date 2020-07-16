import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  private _registerUrl = "http://localhost:3000/register";
  private _loginUrl = "http://localhost:3000/login";

  constructor(private http:HttpClient) { }
  getProducts(){
    return this.http.get("http://localhost:3000/products");
  }
  newProduct(item)
  {
    return this.http.post("http://localhost:3000/insert",{"product" : item})
    .subscribe(data =>{
      console.log(data)
    })
  }

  //SIGNUP AND LOGIN 
  registerUser(user){
    return this.http.post(this._registerUrl , user)
  }
  loginUser(user){
    return this.http.post(this._loginUrl , user)
  }
  loggedIn()
  {
    return !!localStorage.getItem('token')
  }

  //DELETE
    deleteProduct(id:string){
      return this.http.delete(`http://localhost:3000/delete/${id}`)
    }

  //EDIT
    editProduct(id){
      return this.http.get(`http://localhost:3000/edit/${id}`)
    }
    updateProduct(item){
      return this.http.post("http://localhost:3000/update",{"product" : item})
      .subscribe(data=>{
        console.log("updateservice"+data);
      })
    }
}
