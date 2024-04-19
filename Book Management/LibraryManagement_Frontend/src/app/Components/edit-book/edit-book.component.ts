import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Book } from 'src/app/Models/Book.model';
import { BookService } from 'src/app/Services/book.service';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit{
  isAvailaible:string=''

  BookDetails:Book={
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

  constructor(private route:ActivatedRoute,
              private bookService:BookService,
              private router:Router,
              private toast:NgToastService
              ){}

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next:(params)=>{
        const id = params.get('id')

        if(id){
          this.bookService.getBookById(id).subscribe({
            next:(res=>{
              if(res.is_Book_Availaible == true){
                this.isAvailaible = "true";
              }
              else{
                this.isAvailaible = "false";
              }
              this.BookDetails = res;
            }),
            error:(err=>{
              this.toast.error({detail:"Something Went Wrong !!",summary:"Please Try Again Later",duration:5000});
            })
          })
        }
      }
    })
  }

  updateBook(){
    this.bookService.UpdateBook(this.BookDetails.id,this.BookDetails).subscribe({
      next:(res=>{
        this.toast.success({detail:"Success !!",summary:"Book Edited Successfully",duration:5000});
        this.router.navigate(['/dashboard/my-books'])
      }),
      error:(err=>{
        this.toast.error({detail:"Something Went Wrong !!",summary:"Please Try Again Later",duration:5000});
      })
    })
  }

  cancel(){
    this.router.navigate(['/dashboard/my-books']);
  }
}
