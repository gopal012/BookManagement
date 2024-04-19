import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  public loginForm !:FormGroup

  constructor(private formBuilder:FormBuilder,
              private router:Router,
              private authService:AuthService,
              private toast:NgToastService
             ){}
             
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username:['',[Validators.required]],
      password:['',[Validators.required]]
    })
  }

  onLogin()
  {
    this.authService.login(this.loginForm.value).subscribe({
      next:(res=>{
        this.loginForm.reset();
        this.authService.storeToken(res.token)
        this.router.navigate(['dashboard'])
        this.toast.success({detail:"Login Successful !!",summary:"Welcome, " + res.name,duration:5000})
      }),
      error:(err=>{
        this.toast.error({detail:"Login Unsuccessful !!",summary:"Please Try Again Later",duration:5000});
      })
    })
  }
}