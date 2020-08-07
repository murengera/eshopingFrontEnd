import { Component, OnInit } from '@angular/core';
import { CartModelServer } from 'src/app/models/product/cart.model';
import { CartService } from 'src/app/api-service/cart.service';

@Component({
  selector: 'app-account-dialogy',
  templateUrl: './account-dialogy.component.html',
  styleUrls: ['./account-dialogy.component.css']
})
export class AccountDialogyComponent implements OnInit {
cartData:CartModelServer;
cartTotal:number;




  constructor( public cartService:CartService) { }

  ngOnInit(): void {
    this.cartService.cartTotal$.subscribe(total=>this.cartTotal=total);
    this.cartService.cartData$.subscribe(data=>this.cartData=data);
  }


}
