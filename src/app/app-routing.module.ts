import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BaseComponent } from './market/base/base.component';

import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './market/product/product.component';
import { ProductCategoryComponent } from './product-category/product-category.component';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './accounts/login/login.component';
import { RegisterComponent } from './accounts/register/register.component';
import { ForgetPasswordComponent } from './accounts/forget-password/forget-password.component';
import { CheckoutComponent } from './market/checkout/checkout.component';
import { ResetPasswordComponent } from './accounts/reset-password/reset-password.component';


const routes: Routes = [
  { path:'', component:IndexComponent,
  children:[
            { path: 'cart', component:CartComponent},
            { path: 'home', component:HomeComponent},
            { path: 'product/:id', component:ProductComponent},
            { path: 'category/:categoryName', component: ProductCategoryComponent},
            {path:'checkout',component:CheckoutComponent},

            { path:'',redirectTo:'home', pathMatch: 'full'}
          ]
},
{path:'login',component:LoginComponent},
{path:'register',component:RegisterComponent},
{path:'forget-password',component:ForgetPasswordComponent},
{path:'reset-passoword',component:ResetPasswordComponent},

];




@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents=[]
