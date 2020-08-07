import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceService } from '../api-service/api-service.service';
import { Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';
import{ProductModelServer} from '../../app/models/product/product.module';
import{ServerResponse} from '../models/product/product.module'
import { CartService } from '../api-service/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  isLoading: boolean;

  //productCategories: any;
    productss={};

  items:Array<any>=[];
  constructor(private breakpointObserver: BreakpointObserver,public router:Router,public snackBar:MatSnackBar,
    private api:ApiServiceService,private cartService:CartService) {

    this.items=[
      {name:'../../assets/gallery-image-2.jpg'},
      {name:'../../assets/gallery-image-3.jpg'},
      {name:'../../assets/gallery-image-3.jpg'},
    ];
  }

  ngOnInit(): void {

 this.getProduct()
  }


  getProduct() {

    const obs = this.api.getProducts();
    if(obs != null){
      obs.subscribe((response:any)=>{

        this.productss = response;
        console.log("products:",this.productss)
      },(error:any)=>{

        console.log("error..",error);
        this.openSnackBar('Check your internet connection', 'CLOSE');
      })
    } else {

      this.openSnackBar('Check your internet connection', 'CLOSE');
    }
  }
  openSnackBar(message: string, action: string, duration = 5000) {
    this.snackBar.open(message, action, {
      duration: duration,
    });
  }


  AddToCart(id:number){
this.cartService.AddProductToCart(id);
  }




}
