import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/Models/Book.model';
import { Token } from 'src/app/Models/Token.model';
import { AuthService } from 'src/app/Services/auth.service';
import { BookService } from 'src/app/Services/book.service';
import { NgToastService } from 'ng-angular-popup';
import { SharedService } from 'src/app/Services/shared.service';
import * as JWT from 'jwt-decode';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-my-books',
  templateUrl: './my-books.component.html',
  styleUrls: ['./my-books.component.css']
})
export class MyBooksComponent implements OnInit {
  
  lentedBooks: Book[]=[]
  borrowedBooks:Book[]=[]
  arr=Array;
  token:any = ''
  tokenInfo!:Token
  username!:string
  userId!:number
  book!:Book

  constructor(private bookService:BookService,
              private authService:AuthService,
              private toast:NgToastService,
              private sharedService:SharedService){}

  ngOnInit(): void {
    //Token Decoding
    this.token = this.authService.getToken();
    this.tokenInfo = JWT.jwtDecode(this.token)
    this.username = this.tokenInfo.name
    this.userId = this.tokenInfo.nameid
    this.listOfBooks();
}

//Getting all Lented and Borrowed Books from Backend
listOfBooks(){
  while(this.lentedBooks.length>0) {
    this.lentedBooks.pop();
  }
  while(this.borrowedBooks.length>0) {
    this.borrowedBooks.pop();
  }
  this.bookService.getAllBooks().subscribe({
    next:(res=>{
      res.forEach(e=>{
        if(e.borrowed_By_UserId == this.userId){
          this.borrowedBooks.push(e);
        }
        else if(e.lent_By_UserId == this.userId){
          this.lentedBooks.push(e);
        }
      })
    }),
    error:(err=>{
      this.toast.error({detail:"Something Went Wrong !!",summary:"Please Try Again Later",duration:5000});
    })
  })
  console.log(this.borrowedBooks);
}

// Deleting a Leented Book
  deleteBook(id:string){
    this.bookService.deleteBook(id).subscribe({
      next:(res=>{
        this.toast.success({detail:"Success !!",summary:"Book Deleted Successfully",duration:5000});
      }),
      error:(err=>{
        this.toast.error({detail:"Something Went Wrong !!",summary:"Please Try Again Later",duration:5000});
      })
    })
  }

  //When User want to return a Borrowed Book
  returnBook(id:string){
    Swal.fire({
      title: "Are you sure?",
      text: "You want to return this book!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, return it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.bookService.getBookById(id).subscribe({
          next:(res=>{
            this.book = res
            this.update_Book_Details(this.book.id);
            this.update_Borrower_Token(this.book.borrowed_By_UserId);
            this.update_Lender_Token(this.book.lent_By_UserId)
          }),
          error:(err=>{
            this.toast.error({detail:"Something Went Wrong !!",summary:"Please Try Again Later",duration:5000});
          })
        })
        Swal.fire({
          title: "Success!",
          text: "Book Has been Returned Successfully.",
          icon: "success"
        });
      }
    });
  }

  update_Borrower_Token(id:number){
    this.authService.getUserById(id).subscribe({
      next:(resp=>{
        resp.token_Availaible = resp.token_Availaible+1;
        resp.confirmPassword = resp.password
        this.authService.updateUser(resp.id,resp).subscribe({
          next:(result=>{
            if(result){
              this.sharedService.sendTokenUpdateEvent();
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

  update_Lender_Token(id:number){
    this.authService.getUserById(id).subscribe({
      next:(resp=>{
        resp.token_Availaible = resp.token_Availaible-1;
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
        res.is_Book_Availaible = true;
        res.borrowed_By_UserId = 0
        this.bookService.UpdateBook(res.id,res).subscribe({
          next:(resp=>{
            if(resp){
              this.listOfBooks();
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


}
