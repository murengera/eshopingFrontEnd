import { Component, OnInit } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { shareReplay, map } from 'rxjs/operators';
import { FormGroup, FormControl , FormBuilder, Validators} from '@angular/forms';
import { MatSnackBar} from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { ApiServiceService } from 'src/app/api-service/api-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {



  loading = false


  constructor( private formBuilder: FormBuilder,
    private router: Router,
    public snackBar: MatSnackBar,
    private http: HttpClient,
    private api: ApiServiceService,) { }


    registrationFormGroups=this.formBuilder.group({

      'phone_number':['',[Validators.required,Validators.maxLength(11),Validators.email]],


    })

  ngOnInit(): void {
    this.createForms()
  }

  createForms() {
    this.registrationFormGroups = this.formBuilder.group({
      'phone_number': ['', [Validators.required]],

    })

  }


  registerUser() {
    this.loading = true



    let obs = null
    console.log(this.registrationFormGroups.value);
      obs = this.api.forgetPassword(this.registrationFormGroups.value)
    if (obs != null) {
      obs.subscribe((response: any) => {

        this.openSnackBar('Your reset code has been sent to your email and phone number' , 'CLOSE')
        this.router.navigate(['/reset-passoword']);


      }, (error: any) => {


        console.log(error);

        if (error.error.detail != null) {
          this.openSnackBar(error.error.detail, 'CLOSE')
        } else {
          this.openSnackBar('Something went wrong.', 'CLOSE')
        }
      })
    } else {

      this.openSnackBar('No internet connection', 'CLOSE')
    }

  }

  openSnackBar(message: string, action: string, duration = 5000) {
    this.snackBar.open(message, action, {
      duration: duration,
    })
  }
}

