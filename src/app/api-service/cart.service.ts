import { Injectable } from '@angular/core';
import {HttpClient}from '@angular/common/http';
import{ ApiServiceService}from './api-service.service';
import {OrderService}from './order.service'
import { environment } from 'src/environments/environment';
import{CartModelpublic, CartModelServer} from '../models/product/cart.model'
import {  Observable, of, BehaviorSubject} from 'rxjs';
import { Router, NavigationExtras } from '@angular/router';
import { ProductModelServer } from '../models/product/product.module';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private apiRoot=environment.SERVER_URL;


  //data variable to store the cart information on the client's local storage

  private cartDataCLient:CartModelpublic={
    total:0,
    prodData:[
      {

   incart:0,
   id:0


    }]
  };

  //Data variable to store cart information on the server
private cartDataServer:CartModelServer={

  total:0,
  data:[{
    numInCart:0,
    product:undefined

  }]


}

/*OBSERVABLES FOR THE COMPONENTS TO SUBSCRIBE*/

cartTotal$=new BehaviorSubject<number>(0);
cartData$=new BehaviorSubject<CartModelServer>(this.cartDataServer);

private checkout: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor( private http:HttpClient,private apiService:ApiServiceService,
    private orderService:OrderService,private router:Router, public snackBar: MatSnackBar,
    private toast:ToastrService,private spinner:NgxSpinnerService) {

      this.cartTotal$.next(this.cartDataServer.total);
      this.cartData$.next( this.cartDataServer );

      //get the information from local storage (if any)

      let info:CartModelpublic=JSON.parse(localStorage.getItem('cart'));
      //Check if the info variable is null or has some data in it

      if(info != null && info != undefined  && info.prodData[0].incart != 0){
        //local storage  is not empty and has some information
        this.cartDataCLient = info;
        //loop through each entry and put it in the cartDataServer object
        this.cartDataCLient.prodData.forEach(p=>{
this.apiService.getSingleProduct(p.id).subscribe((actualProductInfo:ProductModelServer)=>{{
  if(this.cartDataServer.data[0].numInCart ==0)
{
  this.cartDataServer.data[0].numInCart=p.incart;
  this.cartDataServer.data[0].product=actualProductInfo;
  //TODO create calculateTotal function and replace it here
  this.cartDataCLient.total=this.cartDataServer.total;
  localStorage.setItem('cart',JSON.stringify(this.cartDataCLient));

}
else
{
 //cartdataserver already has some entry in it
 this.cartDataServer.data.push({
   numInCart:p.incart,
   product:actualProductInfo
 });
 //cartdataserver already has some entry in it
 this.cartDataCLient.total=this.cartDataServer.total;
 localStorage.setItem('cart',JSON.stringify(this.cartDataCLient));

}
this.cartData$.next({...this.cartDataServer});



}});
        });

      }

    }





    AddProductToCart(id:number,quantity?:number){

      this.apiService.getSingleProduct(id).subscribe(prod=>{
     // 1. if the cart is empty
     if(this.cartDataServer.data[0].product==undefined)
     {
        this.cartDataServer.data[0].product=prod;
        this.cartDataServer.data[0].numInCart=quantity!=undefined ? quantity : 1;
        //TODO CALCULATE TOTAL AMOUNT
        this.cartDataCLient.prodData[0].incart=this.cartDataServer.data[0].numInCart;
        this.cartDataCLient.prodData[0].id=prod.id;
        this.cartDataCLient.total=this.cartDataServer.total;
        localStorage.setItem('cart',JSON.stringify(this.cartDataCLient));
        this.cartData$.next({...this.cartDataServer});
        this.toast.success(`${prod.title} added to the cart`,'Product Added',{
          timeOut:15000,
          progressBar:true,
          progressAnimation:'increasing',
          positionClass:'toast-top-right',
        })
     }
      // 2.if the cart has some items
      else{

        let index = this.cartDataServer.data.findIndex(p=>p.product.id == prod.id);//-1 or positve value
         // 2.a if that item is arleady in the cart => index  is positive value
         if (index != -1)
         {
           if (quantity != undefined && quantity <= prod.quantity){
             this.cartDataServer.data[index].numInCart=this.cartDataServer.data[index].numInCart < prod.quantity ? quantity : prod.quantity;
             this.calculateTotal();
             this.cartDataCLient.total = this.cartDataServer.total;
             localStorage.setItem('cart',JSON.stringify(this.cartDataCLient));
           }
           else
           {
           this.cartDataServer.data[index].numInCart < prod.quantity ? this.cartDataServer.data[index].numInCart++ : prod.quantity;
           this.calculateTotal();
           this.cartDataCLient.total = this.cartDataServer.total;
           localStorage.setItem('cart',JSON.stringify(this.cartDataCLient));
           }

           this.cartDataCLient.prodData[index].incart=this.cartDataServer.data[index].numInCart;
           this.calculateTotal();
           this.cartDataCLient.total = this.cartDataServer.total;
           localStorage.setItem('cart',JSON.stringify(this.cartDataCLient));


           this.toast.info(`${prod.title} quantity updated in the cart`,' Product Updated',{
            timeOut:1500,
            progressBar:true,
            progressAnimation:'increasing',
            positionClass:'toast-top-right'
          })

         }
         //END OF IF
        // 2.b if that item is not in the cart

        else{
          this.cartDataServer.data.push({
            numInCart: 1,
            product: prod
          });


          this.cartDataCLient.prodData.push({
            incart: 1,
            id: prod.id
                  });
                  localStorage.setItem('cart',JSON.stringify(this.cartDataCLient));

                  this.toast.success(`${prod.title} added to the cart`,'Product Added',{
                    timeOut:1500,
                    progressBar:true,
                    progressAnimation:'increasing',
                    positionClass:'toast-top-right'
                  })
                  //TODO CALCULATE AMOUNT
                  this.calculateTotal();
                  this.cartDataCLient.total = this.cartDataServer.total;
                  localStorage.setItem('cart',JSON.stringify(this.cartDataCLient));
                  this.cartData$.next({...this.cartDataServer});

        }//END OF ELSE

      }




      });



    }

    UpDateCartItems(index:number,increase:boolean){
      let data=this.cartDataServer.data[index];
      if (increase){
        data.numInCart < data.product.quantity ? data.numInCart++ : data.product.quantity;
         this.cartDataCLient.prodData[index].incart=data.numInCart;
         //TODO CALCULATE TOTAL AMOUNT
         this.cartDataCLient.total=this.cartDataServer.total;
         localStorage.setItem('cart',JSON.stringify(this.cartDataCLient));
         this.cartData$.next({...this.cartDataServer});


      }
      else{
        data.numInCart--;

        if(data.numInCart < 1){
          // TODO delete the product from cart
          this.cartData$.next({...this.cartDataServer});
          localStorage.setItem('cart',JSON.stringify(this.cartDataCLient));

        }
        else
        {
          this.cartData$.next({...this.cartDataServer});
           this.cartDataCLient.prodData[index].incart = data.numInCart;
           //TODO CALCULATE TOTAL AMOUNT
           this.cartDataCLient.total=this.cartDataServer.total;
           localStorage.setItem('cart',JSON.stringify(this.cartDataCLient));


        }
      }
    }

deleteProductFromCart(index:number){
  if(window.confirm('Are you sure you want to remove  the product?'))
  {
    this.cartDataServer.data.splice(index,1);
    this.cartDataCLient.prodData.splice(index,1);
    //TODO CALCULATE TOTAL AMOUNT
    this.cartDataCLient.total = this.cartDataServer.total;

    if (this.cartDataCLient.total == 0){
      this.cartDataCLient = {total:0,prodData:[  {incart:0, id:0 }]};
      localStorage.setItem('cart',JSON.stringify(this.cartDataCLient));


    }
    else
    {
      localStorage.setItem('cart',JSON.stringify(this.cartDataCLient));

    }
   if(this.cartDataServer.total == 0){
      this.cartDataServer={total:0,data:[{numInCart:0,product:undefined}]};
      this.cartData$.next({...this.cartDataServer});

    }
    else
    {
      this.cartData$.next({...this.cartDataServer});
    }



  }
  else
  {
    //IF THE USER CLICKS THE CANCEL BUTTON
    return;
  }

}

   calculateTotal(){
  let Total=0;
  this.cartDataServer.data.forEach(p=>{

  const {numInCart}=p;
  const {price}=p.product;
  Total += numInCart*price;

  }) ;
  this.cartDataServer.total=Total;
  this.cartTotal$.next(this.cartDataServer.total);


}

check(){
  this.http.post(`${this.apiRoot}OrderDetailList/`,"").subscribe(res=>{
console.log(res)
  })
}
 checkoutFromCart(userId:number){
this.http.post(`${this.apiRoot}OrderDetailList/`,userId).subscribe((resp:{success:boolean})=>{
if (resp.success){
this.restServerData();
this.http.post(`${ this.apiRoot}/orders/`,{
  userId:userId,
  products:this.cartDataCLient.prodData

}).subscribe((data:orderResponse)=>{ this.orderService.getSingleOrder(data.order_id).then(prods=>{
    if (data.success){
      const navigationExtras:NavigationExtras={
        state:{
          message:data.message,
          products:prods,
          orderId:data.order_id,
          total:this.cartDataCLient.total
        }
      };
     this.spinner.hide().then();
      this.router.navigate(['/thankyou'],navigationExtras).then(p=>{
        this.cartDataCLient={total:0,prodData:[{incart:0,id:0}]};
        this.cartTotal$.next(0);
        localStorage.setItem('cart',JSON.stringify(this.cartDataCLient));
      });
    }
  });
});
}
else{
  this.spinner.hide().then();
  this.router.navigateByUrl('/checkout').then();
  this.toast.error(`Sorry, fail to book the order`,' order status',{
    timeOut:1500,
    progressBar:true,
    progressAnimation:'increasing',
    positionClass:'toast-top-right'
  })
}
});
}
private restServerData(){
  this.cartDataServer={total:0,data:[{numInCart:0,product:undefined}]};

  this.cartData$.next({...this.cartDataServer});
}


calculateSubTotal(index):number{

  let subTotal=0;
  const p=this.cartDataServer.data[index];
  subTotal=p.product.price * p.numInCart;
  return subTotal;

}
}

interface orderResponse{
  order_id:number;
  success:boolean;
  message:string;
  products:[
    {
      id:string,
      numInCart:string


    }
  ]

}



