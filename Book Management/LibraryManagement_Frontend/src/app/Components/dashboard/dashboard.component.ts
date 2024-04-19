import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/Models/Book.model';
import { Token } from 'src/app/Models/Token.model';
import { AuthService } from 'src/app/Services/auth.service';
import { BookService } from 'src/app/Services/book.service';
import * as JWT from 'jwt-decode';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { SharedService } from 'src/app/Services/shared.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  Books: Book[]=[]
  arr=Array; //for rating display
  token:any = ''
  tokenInfo!:Token
  username!:string
  userId!:number
  filterForm!:FormGroup
  filteredBook:Book[]=[];
  
  constructor(private bookService:BookService,
              private authService:AuthService,
              private toast:NgToastService,
              private formBuilder:FormBuilder,
              private sharedService:SharedService
              ){}

  ngOnInit(): void {
    //Token Decoding
    this.token = this.authService.getToken();
    this.tokenInfo = JWT.jwtDecode(this.token)
    this.username = this.tokenInfo.name
    this.userId = this.tokenInfo.nameid
    this.listOfBook();
    this.filterForm = this.formBuilder.group({
      bookName:[''],
      author:[''],
      genre:['']
    })
  }

  //Geting List Of Book which are availaible to borrow
  listOfBook(){
    while(this.Books.length > 0){
      this.Books.pop();
    }
    this.bookService.getAllBooks().subscribe({
      next:(res=>{
        res.forEach(a=>{
          if(a.lent_By_UserId != this.userId && a.is_Book_Availaible == true){
            this.Books.push(a);
          }
        })
      }),
      error:(err=>{
        this.toast.error({detail:"Something Went Wrong !!",summary:"Please Try Again Later",duration:5000});
      })
    })
  }

  //When User Tries to Borrow a Book
  borrow(bookId:string,lent_by_userId:number){
      this.authService.getUserById(this.userId).subscribe({
        next:(res=>{
          if(res.token_Availaible <= 0){
            this.toast.warning({detail:"Oops ! You Don't have enough token to buy Book !!",summary:"Kindly Return the Borrowed Book To Borrow Other",duration:5000});
          }
          else{
            Swal.fire({
              title: "Are you sure?",
              text: "You want to borrow this book!",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Yes, Borrow!"
            }).then((result) => {
              if (result.isConfirmed) {
                this.update_Book_Details(bookId);
                this.update_Lender_Token(lent_by_userId);
                res.token_Availaible = res.token_Availaible-1;
                res.confirmPassword = res.password
                this.authService.updateUser(this.userId,res).subscribe({
                  next:(response=>{
                    if(response){
                     this.sharedService.sendTokenUpdateEvent();
                    }
                  }),
                  error:(err=>{
                    this.toast.error({detail:"Something Went Wrong !!",summary:"Please Try Again Later",duration:5000});
                  })
                })
                Swal.fire({
                  title: "Success!",
                  text: "Book Borrowed Successfully !!.",
                  icon: "success"
                });
              }
            });
          }
        }),
        error:(err=>{
          this.toast.error({detail:"Something Went Wrong !!",summary:"Please Try Again Later",duration:5000});
        })
      })
  }

  update_Lender_Token(id:number){
    this.authService.getUserById(id).subscribe({
      next:(resp=>{
        resp.token_Availaible = resp.token_Availaible+1;
        resp.confirmPassword = resp.password
        this.authService.updateUser(resp.id,resp).subscribe({
          next:(result=>{
          }),
          error:(err=>{
            this.toast.error({detail:"Something Went Wrong !!",summary:"Please Try Again Later",duration:5000});
          })
        })
      }),
      error:(err=>{
        this.toast.error({detail:"Something Went Wrong !!",summary:"Please Try Again Later",duration:5000});
      })
    })
  }

  update_Book_Details(id:string){
    this.bookService.getBookById(id).subscribe({
      next:(res=>{
        res.is_Book_Availaible = false;
        res.borrowed_By_UserId = this.userId
        this.bookService.UpdateBook(res.id,res).subscribe({
          next:(resp=>{
            if(resp){
              this.listOfBook();
            }
          }),
          error:(err=>{
            this.toast.error({detail:"Something Went Wrong !!",summary:"Please Try Again Later",duration:5000});
          })
        })
      }),
      error:(err=>{
        this.toast.error({detail:"Something Went Wrong !!",summary:"Please Try Again Later",duration:5000});
      })
    })
  }

  //When User have filtered Book according to their choice
  onSearch(){
    if(this.filteredBook.length>0){
      while(this.filteredBook.length>0){
        this.filteredBook.pop();
      }
    }
    else{
      this.bookService.getAllBooks().subscribe({
        next:(res=>{
          res.forEach(e=>{
            if((e.bookName.toLowerCase() == this.filterForm.value.bookName) ||(e.genre.toLowerCase() == this.filterForm.value.genre) || (e.author.toLowerCase() == this.filterForm.value.author) && (e.lent_By_UserId != this.userId && e.is_Book_Availaible == true)){
              this.filteredBook.push(e);
            }
          })
          if(this.filterForm.value.bookName == '' && this.filterForm.value.author == '' && this.filterForm.value.genre == '' ){
            this.toast.warning({detail:"Warning",summary:"Please Provide Some Input to Filter !!",duration:5000})
          }
          else if(this.filteredBook.length<=0){
            this.toast.error({detail:"Sorry !!",summary:"No Matching Book Found",duration:5000})
          }
        })
      })
    }
  }
}
