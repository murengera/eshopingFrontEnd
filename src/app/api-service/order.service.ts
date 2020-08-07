import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {HttpClient, HttpHeaders}from '@angular/common/http'
import { Observable, from} from 'rxjs';;





@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private products:ProductResponseModel[]=[]
   private apiRoot=environment.SERVER_URL;

  constructor(private http:HttpClient) { }


 getSingleOrder(orderdId:number){
   return  this.http.get<ProductResponseModel[]>(this.apiRoot+ 'orders' + orderdId).toPromise()
 }





}
 interface ProductResponseModel{
   id:number;
   title:string;
   description:string;
   price:number;
   quantityOrdered:number;
   image:string;

}
