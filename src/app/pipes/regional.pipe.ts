import { Pipe, PipeTransform } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { BehaviorSubject } from 'rxjs';

@Pipe({ name: 'regional' })

export class RegionalPipe implements PipeTransform {

  ddd = null;

  constructor(
    private dbService: NgxIndexedDBService
  ) { 
    this.dbService.getAll('regional').then(() => {

    });
  }

  transform(value: any): any {
    
  }

}
