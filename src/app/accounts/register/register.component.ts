import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators, FormGroup}from '@angular/forms';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { shareReplay, map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { ApiServiceService } from 'src/app/api-service/api-service.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  activationFormGroup: FormGroup

  hide = true
  loading1 = false
  loading2 = false
  verify = false
  countries_codes: any = []
  ccFilteredVariables = []


  constructor( private fb:FormBuilder,    private router: Router,
    public snackBar: MatSnackBar,
    private http: HttpClient,
    private api: ApiServiceService,
   ) { }

    registrationFormGroup=this.fb.group({
      'name':['',[Validators.required]],
      'email':['',[Validators.required,Validators.email]],
      'phone_number':['',[Validators.required,Validators.maxLength(11)]],
      'password':['',[Validators.required]],

    })


  ngOnInit(): void {

  }






 registerUser(){
   this.loading1=true


     this.api.registerBuyer(this.registrationFormGroup.value).subscribe((response: any) => {
       response=>console.log('Succes',response)
      this.loading1 = false
      this.openSnackBar(response.message, 'OK', 10000)
      this.router.navigate(['/login']);
      this.activationFormGroup.get('email').setValue(response.email)
      this.verify = true;

    }, (error: any) => {
      this.loading1 = false

      console.log(error);

      if (error.error.detail != null) {
        this.openSnackBar(error.error.detail, 'CLOSE')
      } else {
        this.openSnackBar('Something went wrong.', 'CLOSE')
      }
    })





 }

 openSnackBar(message: string, action: string, duration = 5000) {
  this.snackBar.open(message, action, {
    duration: duration,
  })
}


}
