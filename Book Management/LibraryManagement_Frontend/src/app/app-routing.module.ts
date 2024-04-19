import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { AddBookComponent } from './Components/add-book/add-book.component';
import { EditBookComponent } from './Components/edit-book/edit-book.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { UserNavbarComponent } from './Components/user-navbar/user-navbar.component';
import { AuthGuard } from './Guards/auth.guard';
import { MyBooksComponent } from './Components/my-books/my-books.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'home',
    pathMatch:'full'
  },
  {
    path:"home",
    component:NavbarComponent,
    children:[
      {
        path:'',
        component:HomeComponent
      },
      {
        path:'login',
        component:LoginComponent
      }
    ]
  },
  {
    path:'dashboard',
    component:UserNavbarComponent,
    canActivate:[AuthGuard],
    children:[
    {
      path:"",
      component:DashboardComponent
    },
    {
      path:'add-book',
      component:AddBookComponent
    },
    {
      path:'edit-book/:id',
      component:EditBookComponent
    },
    {
      path:'my-books',
      component:MyBooksComponent
    }
  ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
