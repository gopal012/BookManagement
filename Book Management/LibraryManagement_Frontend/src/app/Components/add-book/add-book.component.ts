import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Book } from 'src/app/Models/Book.model';
import { Token } from 'src/app/Models/Token.model';
import { AuthService } from 'src/app/Services/auth.service';
import { BookService } from 'src/app/Services/book.service';
import * as JWT from 'jwt-decode';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit{

  isAvailaible:string=''

  addBook:Book={
    id:'',
    bookName:'',
    rating:0,
    author:'',
    genre:'',
    imageUrl:'',
    is_Book_Availaible:true,
    description:'',
    lent_By_UserId:0,
    borrowed_By_UserId:0
  }
  token:any = ''
  tokenInfo!:Token
  username!:string
  userId!:number

  constructor(private bookService:BookService,
              private router:Router,
              private authService:AuthService,
              private toast:NgToastService
              ){}

  ngOnInit(): void {
    //Decoding a Token
    this.token = this.authService.getToken();
    this.tokenInfo = JWT.jwtDecode(this.token)
    this.username = this.tokenInfo.name
    this.userId = this.tokenInfo.nameid
    this.addBook.lent_By_UserId = this.userId
  }

  //Adding a New Book
  OnSubmit(){
  if(this.isAvailaible == "true"){
    this.addBook.is_Book_Availaible = true;
  }
  else{
    this.addBook.is_Book_Availaible = false;
  }
  this.addBook.lent_By_UserId = this.userId
  this.bookService.addBook(this.addBook).subscribe({
    next:(res=>{
      this.router.navigate(['/dashboard']);
      this.toast.success({detail:"Suceess !!",summary:"Book Added Successfully",duration:5000});
    }),
    error:(err=>{
      this.toast.error({detail:"Something Went Wrong !!",summary:"Please Try Again Later",duration:5000});
    })
  })
  }

  cancel(){
    this.router.navigate(['dashboard']);
  }
}
