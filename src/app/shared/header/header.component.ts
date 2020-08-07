import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatDialog,MatDialogConfig} from '@angular/material/dialog'
import { AccountDialogyComponent } from 'src/app/dialogy/account-dialogy/account-dialogy.component';
import {CartModelServer,CartModelpublic} from '../../models/product/cart.model'
import { CartService } from 'src/app/api-service/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  opened=false;
  isLoading = false;
  restaurants: any
  searchText: string;
  [x: string]: any;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );


cartData:CartModelServer;
cartTotal:number;

  constructor(private breakpointObserver: BreakpointObserver,public dialogy:MatDialog,public cartService:CartService) {}


  ngOnInit() {
this.cartService.cartTotal$.subscribe(total=> this.cartTotal=total);
this.cartService.cartData$.subscribe(data=>this.cartData=data);



  }
  restaurantSearch($event) {
    this.restaurants = undefined;
    this.api.searchRestaurant(this.searchText).subscribe((response:any) => {
      //this.restaurants = response.data;
      this.restaurants = response;

      console.log(' Restos length ', this.restaurants.length);
      console.log(' Restos  ', this.restaurants);
    }),(err => {

      console.log(' Error ', err);

    });
  }
  openDialogy(){
this.dialogy.open(AccountDialogyComponent, { panelClass: 'custom-dialog-container' })


  }


}
