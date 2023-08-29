import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  errorMessage: string = '';
  error: boolean = false;
  loading: boolean = false;
  roles: string[] = [];
  formGroup!: FormGroup;

  constructor(private loginService: LoginService, 
    private router: Router,
    private formBuilder: FormBuilder) {
     }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      'email': ['', Validators.required],
      'password': ['', Validators.required],
    });
  }

  submit(): void {
    if(this.formGroup.valid){
      this.loading = true;
      this.loginService.signIn(this.formGroup.controls['email'].value, this.formGroup.controls['password'].value)
      .subscribe(data=>{
        this.router.navigate(['dashboard/cards']);
        this.loading = false;
      },
      err => {
        this.error = true;
        this.errorMessage = 'Errore nella login';
        this.loading = false;
      })
    }
  }

}