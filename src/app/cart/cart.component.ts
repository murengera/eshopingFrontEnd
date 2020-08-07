import { Component, OnInit } from '@angular/core';
import { CartModelServer } from '../models/product/cart.model';
import { CartService } from '../api-service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartData:CartModelServer;
  cartTotal:number;
  subTotal:number;
  constructor( public cartService:CartService) { }

  ngOnInit() {
    this.cartService.cartData$.subscribe((data:CartModelServer)=>this.cartData=data);
    this.cartService.cartTotal$.subscribe(total=>this.cartTotal=total);
  }
  changeQuantity(index:number,increase:boolean ){
    this.cartService.UpDateCartItems(index,increase);

  }

}
