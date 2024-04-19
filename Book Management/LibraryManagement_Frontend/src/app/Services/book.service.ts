import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../Models/Book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  baseApiUrl:string='https://localhost:7081/'

  constructor(private http:HttpClient) { }

  getAllBooks():Observable<Book[]>{
    return this.http.get<Book[]>(this.baseApiUrl + 'api/Book')
  }

  addBook(book:Book):Observable<Book>{
    book.id = '00000000-0000-0000-0000-000000000000';
    return this.http.post<Book>(this.baseApiUrl+'api/Book',book);
  }

  getBookById(id:string):Observable<Book>{
    return this.http.get<Book>(this.baseApiUrl + 'api/Book/' + id)
  }

  UpdateBook(id:string,book:Book):Observable<Book>{
    return this.http.put<Book>(this.baseApiUrl + 'api/Book/' + id,book);
  }

  deleteBook(id:string):Observable<Book>{
    return this.http.delete<Book>(this.baseApiUrl + 'api/Book/' + id);
  }

  
}
