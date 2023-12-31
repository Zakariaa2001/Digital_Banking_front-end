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

  public debit(accounId:string, amount : number, description:string) {
    let data ={accounId : accounId,amount : amount,description:description}
    return this.http.post(this.backendHost+'/accounts/debit',data);
  }

  public credit(accounId:string, amount : number, description:string) {
    let data ={accounId : accounId,amount : amount,description:description}
    return this.http.post(this.backendHost+'/accounts/credit',data);
  }

  public transfer(accountSource:string,accountDestination:string, amount : number, description:string) {
    //let data ={accountSource:accountSource , accountDestination : accountDestination, amount : amount,description:description}
    let data ={accountSource ,  accountDestination,amount,description}
    return this.http.post(this.backendHost+'/accounts/transfer',data);
  }
}
