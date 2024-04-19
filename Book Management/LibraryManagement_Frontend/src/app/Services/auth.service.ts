import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseApiUrl:string='https://localhost:7081/api/User/';

  constructor(private http:HttpClient) { }

  getUserById(id:number){
    return this.http.get<any>(this.baseApiUrl + id);
  }

  updateUser(id:number,user:any){
    return this.http.put<any>(this.baseApiUrl+id, user);
  }

  login(loginObj:any){
    return this.http.post<any>(this.baseApiUrl  + 'authenticate',loginObj)
  }

  storeToken(tokenValue:string){
    localStorage.setItem('token',tokenValue)
  }

  getToken(){
    return localStorage.getItem('token');
  }

  isLoggedIn():boolean{
    return !!localStorage.getItem('token');
  }

  removeToken(){
    localStorage.removeItem('token');
  }
}
