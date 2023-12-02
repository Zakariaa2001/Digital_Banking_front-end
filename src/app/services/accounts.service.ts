import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AccountDetails } from '../model/account.model';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  backendHost:string="http://localhost:8080";

  constructor(private http:HttpClient) { }

  public getAccount(accountId:string,page:number,size:number) : Observable<AccountDetails>{
    return this.http.get<AccountDetails>(this.backendHost+"/accounts/"+accountId+"/pageOperations?page="+page+"&size="+size);
  }
}
