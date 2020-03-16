import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';

const firstName = ['David', 'Smith', 'Jone', 'Jon', 'Micheal', 'Kelvin'];
const lastName = ['Aung Aung', 'Kyaw Kyaw', 'Aung Kyaw', 'Tun Tun', 'Aung Tun', 'Kyaw Tun'];
const regional = ['ဧရာဝတီတိုင်းဒေသကြီး', 'ပဲခူးတိုင်းဒေသကြီး', 'ချင်းပြည်နယ်', 'ကချင်ပြည်နယ်', 'ကယားပြည်နယ်', 'ကရင်ပြည်နယ်', 'မကွေးတိုင်းဒေသကြီး','မန္တလေးတိုင်းဒေသကြီ','မွန်ပြည်နယ်', 'ရခိုင်ပြည်နယ်', 'ရှမ်းပြည်နယ်', 'စစ်ကိုင်းတိုင်းဒေသကြီး','တနင်္သာရီတိုင်းဒေသကြီး','ရန်ကုန်တိုင်းဒေသကြီး','နေပြည်တော် ပြည်ထောင်စုနယ်မြေ']
const moneyTypeData = ['အထွေထွေဓါတ်အား (၂၁၁၀)','အိမ်တွင်းသုံး (၂၁၂၀)','စက်မှုလက်မှု (၂၁၄၀)','အသေးစားစက်မှုလက်မှု (၂၁၃၀)','တလုံးတခဲတည်း (၂၁၅၀)','လမ်းမီး (၂၁၆၀)','ယာယီ (၂၁၈၀)'];
const meterType = ['အိမ်သုံးမီတာ', 'စက်ရုံသုံးမီတာ'];

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
    this.dbService.count('regional').then((count: any) => {
      if(count === 0) {
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
    });
    
  }

  installLeagerBook () {
    this.dbService.count('leagerbook').then((count: any) => {
      if(count === 0) {
        for(let i=1; i<30; i++) {
          const object = {
            name: 'လယ်ဂျာစာအုပ်အမှတ်စဉ် - ' + i,
            created_date: new Date(),
            updated_date: new Date(),
            active: 1

          }
          this.dbService.add('leagerbook', object).then(() => {
            console.log('Created Leager Book');
          });
        }
      }
    });
  }

  installMoneyType() {
    this.dbService.count('moneyType').then((count: any) => {
      if(count === 0) {
        for(let i = 0; i<moneyTypeData.length; i++) {
          
          const object = {
            name: moneyTypeData[i],
            created_date: new Date(),
            updated_date: new Date(),
            active: 1
          }

          this.dbService.add('moneyType', object).then(() => {
            console.log('Create Moeny Type');
          });
        }
      }
    });
  }

  installMeterType() {
    this.dbService.count('metertype').then((count: any) => {
      if(count === 0) {
        for(let i = 1; i<meterType.length; i++) {
          
          const object = {
            name: meterType[i],
            created_date: new Date(),
            updated_date: new Date(),
            active: 1
          }

          this.dbService.add('metertype', object).then(() => {
            console.log('Create Meter Type');
          });
        }
      }
    });
  }
  
}
