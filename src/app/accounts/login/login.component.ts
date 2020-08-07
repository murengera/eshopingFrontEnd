import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay, map } from 'rxjs/operators';
import { FormGroup, FormControl , FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { ApiServiceService } from 'src/app/api-service/api-service.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formGroups: FormGroup;

  titleAlert = 'This field is required';
  PhonenumberRequired = 'Phone number is required';
  passwordRequired = 'Password is required';
  hide = true;
  loading = false;




  sessionStorage = window.sessionStorage;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public snackBar: MatSnackBar,
    private http: HttpClient,
    private api: ApiServiceService) { }



  ngOnInit(): void {
    this.createForm();
  }


  createForm() {
    this.formGroups = this.formBuilder.group({
      phone_number: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }


  get phone_number() {
    return this.formGroups.get('phone_number') as FormControl;
  }

  get password() {
    return this.formGroups.get('password') as FormControl;
  }

  getErrorPassword() {
    return this.formGroups.get('password').hasError('required') ? 'Password is required' :
      this.formGroups.get('password').hasError('requirements') ? 'Password is required' : '';
  }


  onSubmit(data){
    this.loading = true;
    const login_data = {
      "phone_number":data.phone_number,
      "password":data.password
    }
    const obs = this.api.login(login_data);
    if (obs != null) {
      obs.subscribe((response:any)=>{
        this.loading = false;
        this.openSnackBar("login successful","Ok");
        this.router.navigate(['/home']);

      },(error:any)=>{
        this.loading = false;
        console.log("error",error);
        if (error.error.detail != null) {
          this.openSnackBar(error.error.detail, 'CLOSE');
        } else {
          this.openSnackBar('Something went wrong', 'CLOSE');
        }
      })


    }else{
      this.loading = false;
      this.openSnackBar('No internet connection', 'CLOSE');
    }

  }


  openSnackBar(message: string, action: string, duration = 5000) {
    this.snackBar.open(message, action, {
      duration,
    });
  }



}
