import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/api-service/cart.service';
import { OrderService } from 'src/app/api-service/order.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CartModelServer } from 'src/app/models/product/cart.model';
import {FormBuilder,FormGroup}from '@angular/forms';

@Component({
  selector: 'app-checkout',
        templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  cartData:CartModelServer;
  cartTotal:number

  constructor( private cartService:CartService,private orderService:OrderService,private fb:FormBuilder,
    private spinner:NgxSpinnerService) { }
    registrationForm=this.fb.group({

    });

  ngOnInit(): void {
    this.cartService.cartData$.subscribe(data=>this.cartData=data);
    this.cartService.cartTotal$.subscribe(total=>this.cartTotal=total);


  }
  onCheckout(userId){
    this.spinner.show().then(p=>{
      this.cartService.checkoutFromCart(userId);
     console.log(p)

    })
  }

}
