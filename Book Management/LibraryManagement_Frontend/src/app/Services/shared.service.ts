import { Injectable } from '@angular/core';
import { Observable,Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private subject = new Subject<any>();

  sendTokenUpdateEvent(){
    this.subject.next(null);
  }

  getTokenUpdateEvent():Observable<any>{
    return this.subject.asObservable();
  }

}
