import { EventEmitter, Injectable } from '@angular/core';

import { LoggingService } from './logging.service';
import { Http } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs";

@Injectable()
export class AccountsService {
  accounts = [
    {
      name: 'Master Account',
      status: 'active'
    },
    {
      name: 'Testaccount',
      status: 'inactive'
    },
    {
      name: 'Hidden Account',
      status: 'unknown'
    }
  ];
  statusUpdated = new EventEmitter<string>();

  constructor(private loggingService: LoggingService, private http: Http) { }

  /**
   * Retrieves brazilian estates based on it's geonameId: 3469034
   */
  geoNames() {
    let params = {
      geonameId: 3469034
    }

    return this.http.get('http://www.geonames.org/childrenJSON', params)
      .map(res => res.json())
  }

  addAccount(name: string, status: string) {
    this.accounts.push({ name: name, status: status });
    this.loggingService.logStatusChange(status);
  }

  updateStatus(id: number, status: string) {
    this.accounts[id].status = status;
    this.loggingService.logStatusChange(status);
  }
}
