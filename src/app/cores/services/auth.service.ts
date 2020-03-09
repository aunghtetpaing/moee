import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { NgxIndexedDBService } from 'ngx-indexed-db';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private getUser: any; 
  private authenticationUserSubject: BehaviorSubject<any>;
  public authenticationUser: Observable<any>;

  constructor(
    private dbService: NgxIndexedDBService
  ) { 
    this.getUser = JSON.parse(localStorage.getItem('user'));
    this.authenticationUserSubject = new BehaviorSubject<any>(this.getUser);
    this.authenticationUser = this.authenticationUserSubject.asObservable();
  }

  public get authenticationValue(): any {
    return this.authenticationUserSubject.value;
  }

  login(loginUser: any) {
    localStorage.setItem('user', JSON.stringify(loginUser));
    this.authenticationUserSubject.next(loginUser);
    return loginUser;
  }

  logout() {
    localStorage.removeItem('user');
    this.authenticationUserSubject.next(null);
  }
}
