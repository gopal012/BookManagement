import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private toast:NgToastService){}

  ngOnInit(): void {
  }

  onSearch(){
    this.toast.warning({detail:`Can't Search Books`,summary:"Login First To Search",duration:5000})
  }

}
