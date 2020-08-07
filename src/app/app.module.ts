import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule,routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from './market/base/base.component';
import { ProductComponent } from './market/product/product.component';
import { ProductDetailsComponent } from './market/product-details/product-details.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { ProductCategoryComponent } from './product-category/product-category.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material/material.module';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import { AccountDialogyComponent } from './dialogy/account-dialogy/account-dialogy.component';
import { IndexComponent } from './index/index.component';
import { CarouselComponent } from './carousel/carousel.component';
import { ForgetPasswordComponent } from './accounts/forget-password/forget-password.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ResetPasswordComponent } from './accounts/reset-password/reset-password.component';
import { LoginComponent } from './accounts/login/login.component';
import { RegisterComponent } from './accounts/register/register.component';

import { CommonModule } from '@angular/common';
import { CheckoutComponent } from './market/checkout/checkout.component';
import { OrderComponent } from './market/order/order.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { ToastrModule } from 'ngx-toastr';



@NgModule({
declarations: [
AppComponent,
RegisterComponent,
BaseComponent,
ProductComponent,
ProductDetailsComponent,
FooterComponent,
HeaderComponent,
HomeComponent,
CartComponent,
ProductCategoryComponent,
AccountDialogyComponent,
IndexComponent,
CarouselComponent,
ForgetPasswordComponent,
NotFoundComponent,
ResetPasswordComponent,
LoginComponent,
CheckoutComponent,
OrderComponent,















  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule ,
    MaterialModule,
    BrowserAnimationsModule,
    MatCarouselModule,
    CommonModule,
    NgxSpinnerModule,
    ToastrModule.forRoot()


















  ],
  providers: [ToastrService],

  bootstrap: [AppComponent],
  entryComponents:[AccountDialogyComponent]
})
export class AppModule { }
