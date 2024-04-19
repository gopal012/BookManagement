import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import * as JWT from 'jwt-decode';
import { Token } from 'src/app/Models/Token.model';
import { NgToastService } from 'ng-angular-popup';
import { SharedService } from 'src/app/Services/shared.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-user-navbar',
  templateUrl: './user-navbar.component.html',
  styleUrls: ['./user-navbar.component.css']
})
export class UserNavbarComponent implements OnInit {
  token:any = ''
  tokenInfo!:Token
  username!:string
  token_Availaible!:number
  tokenUpdateEvent!:Subscription

  constructor(private authService:AuthService,private router:Router,private toast:NgToastService,private sharedService:SharedService){
    this.tokenUpdateEvent = this.sharedService.getTokenUpdateEvent().subscribe(()=>{
      this.getNumberOfTokens();
    })
  }

  ngOnInit(): void {
    this.getNumberOfTokens();
    // this.authService.getUserById(this.tokenInfo.nameid).subscribe({
    //   next:(res=>{
    //     this.token_Availaible = res.token_Availaible
    //   }),
    //   error:(err=>{
    //     this.toast.error({detail:"Something Went Wrong !!",summary:"Please Try Again Later",duration:5000});
    //   })
    // })
  }

  getNumberOfTokens(){
    this.token = this.authService.getToken();
    this.tokenInfo = JWT.jwtDecode(this.token)
    this.username = this.tokenInfo.name
    this.authService.getUserById(this.tokenInfo.nameid).subscribe({
      next:(res=>{
        this.token_Availaible = res.token_Availaible
      }),
      error:(err=>{
        this.toast.error({detail:"Something Went Wrong !!",summary:"Please Try Again Later",duration:5000});
      })
    })
  }

  logout(){
    this.authService.removeToken();
    this.toast.success({detail:"Success !!",summary:"Logout Successfully",duration:5000});
    this.router.navigate(['home']);
  }
}
