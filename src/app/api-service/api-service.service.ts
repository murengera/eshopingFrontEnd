import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders}from '@angular/common/http'
import {  Observable, of, BehaviorSubject} from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProductModelServer,ServerResponse } from '../models/product/product.module';
import { JsonPipe } from '@angular/common';



@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
private apiRoot=environment.SERVER_URL;
private accountRoot=environment.ACCOUNT_URL
public isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

token = null;
user_data: any;
sessionStorage = window.sessionStorage;
profile:any = {};

httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  })
};

  constructor(private http:HttpClient) {
this.token=this.sessionStorage.getItem('token');
this.user_data=JSON.parse(this.sessionStorage.getItem('user_data'))


if (this.token != null) {
  this.httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': this.token
    })
  };
}
else {
  this.httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    })
  };
}




}


registerBuyer(data) {
  return this.http.post<any>(this.accountRoot + 'buyer_register/', data, this.httpOptions)
}


login(data){
  const obs =  this.http.post(this.accountRoot + 'login/',data,this.httpOptions);

  if(obs != null){
    obs.subscribe((response: any) => {
      this.profile = response;
      this.token = 'Token ' + response.token;
      this.sessionStorage.setItem('profile',JSON.stringify(this.profile));
      this.sessionStorage.setItem('token',this.token);

      this.httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': this.sessionStorage.getItem('token')
        })
      };
    });
  }

  return obs;
}

forgetPassword(data){
  return this.http.post<any>(this.accountRoot + 'forget-password', data, this.httpOptions)

}

changePassword(data){
  return this.http.post<any>(this.accountRoot + 'reset-password', data, this.httpOptions)

}


  //get all prooduct
  getProducts(){

    return this.http.get(this.apiRoot+"product/",this.httpOptions);

  }

  searchProduct(query: string) {
    const url = this.apiRoot + 'product/?search=' + query;
    return this.http.get(url, {} );
  }

  setLoadingStatus(status:boolean){
    this.isLoading.next(status);
  }

  /*GET  SINGLEPRODUCT FROM SERVER*/
  getSingleProduct(id:number):Observable<ProductModelServer>{
    return this.http.get<ProductModelServer>(this.apiRoot+ 'product'+'/'+ id);

  }
  /*GET PRODUCT FROM  ONE CATEGORIES*/

  getProductsFromCategories(catName:string):Observable<ProductModelServer[]>{
    return  this.http.get<ProductModelServer[]>(this.apiRoot+'product/category/' +catName);
  }





















  //products & sub categories of a particular category
  categoryProducts() {
    const url = this.apiRoot + "products-categories/";

      return this.http.get<any>(url,this.httpOptions)


  }

}

