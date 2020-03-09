import { Injectable } from '@angular/core';

const firstName = ['David', 'Smith', 'Jone', 'Jon', 'Micheal', 'Kelvin'];
const lastName = ['Aung Aung', 'Kyaw Kyaw', 'Aung Kyaw', 'Tun Tun', 'Aung Tun', 'Kyaw Tun'];

@Injectable({ providedIn: 'root' })

export class DataService {

  constructor() { }

  generateUser() {
    let rA: any = Math.floor(Math.random()*firstName.length);
    let rB: any = Math.floor(Math.random()*lastName.length);
    return firstName[rA] + ' ' + lastName[rB];
  }
  
}
