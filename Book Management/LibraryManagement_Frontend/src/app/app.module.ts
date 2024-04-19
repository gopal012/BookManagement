import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { AddBookComponent } from './Components/add-book/add-book.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditBookComponent } from './Components/edit-book/edit-book.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { UserNavbarComponent } from './Components/user-navbar/user-navbar.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { MyBooksComponent } from './Components/my-books/my-books.component';
import { NgToastModule } from 'ng-angular-popup';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    AddBookComponent,
    EditBookComponent,
    NavbarComponent,
    UserNavbarComponent,
    DashboardComponent,
    MyBooksComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgToastModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
