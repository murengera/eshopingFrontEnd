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
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  loading = false


  constructor( private formBuilder: FormBuilder,
    private router: Router,
    public snackBar: MatSnackBar,
    private http: HttpClient,
    private api: ApiServiceService) { }
    registrationFormGroups=this.formBuilder.group({

      'code':['',[Validators.required]],
      'phone_number':['',[Validators.required]],


    })

  ngOnInit(): void {
    this.createForms()
  }
  createForms() {
    this.registrationFormGroups = this.formBuilder.group({
      'code':['',[Validators.required]],
      'phone_number':['',[Validators.required]],


    })

  }

  registerUser() {
    this.loading = true



    let obs = null
    console.log(this.registrationFormGroups.value);
      obs = this.api.changePassword(this.registrationFormGroups.value)
    if (obs != null) {
      obs.subscribe((response: any) => {

        this.openSnackBar(response.response , 'CLOSE')
        this.router.navigate(['/login']);


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
