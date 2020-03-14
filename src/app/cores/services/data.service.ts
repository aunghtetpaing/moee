import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';

const firstName = ['David', 'Smith', 'Jone', 'Jon', 'Micheal', 'Kelvin'];
const lastName = ['Aung Aung', 'Kyaw Kyaw', 'Aung Kyaw', 'Tun Tun', 'Aung Tun', 'Kyaw Tun'];
const regional = ['ဧရာဝတီတိုင်းဒေသကြီး', 'ပဲခူးတိုင်းဒေသကြီး', 'ချင်းပြည်နယ်', 'ကချင်ပြည်နယ်', 'ကယားပြည်နယ်', 'ကရင်ပြည်နယ်', 'မကွေးတိုင်းဒေသကြီး','မန္တလေးတိုင်းဒေသကြီ','မွန်ပြည်နယ်', 'ရခိုင်ပြည်နယ်', 'ရှမ်းပြည်နယ်', 'စစ်ကိုင်းတိုင်းဒေသကြီး','တနင်္သာရီတိုင်းဒေသကြီး','ရန်ကုန်တိုင်းဒေသကြီး','နေပြည်တော် ပြည်ထောင်စုနယ်မြေ']

@Injectable({ providedIn: 'root' })

export class DataService {

  constructor(
    private dbService:NgxIndexedDBService
  ) { }

  generateUser() {
    let rA: any = Math.floor(Math.random()*firstName.length);
    let rB: any = Math.floor(Math.random()*lastName.length);
    return firstName[rA] + ' ' + lastName[rB];
  }

  installRegional() {
    for(let i = 0; i < regional.length; i++) {
      const object = {
        id: i+1,
        name: regional[i],
        created_date: new Date(),
        updated_date: new Date(),
        active: 1
      }

      this.dbService.add('regional', object).then((result: any) => {
        if(result) {
          console.log('install regional ' + object[i]);
        }
      }); 
    }
  }
  
}
