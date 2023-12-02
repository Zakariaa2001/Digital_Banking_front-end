import { Customer } from './../model/Customer.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  backendHost:string="http://localhost:8080";

  constructor(private http:HttpClient) {

  }

  public getCustomers():Observable<Array<Customer>> {
    return this.http.get<Array<Customer>>(this.backendHost+"/customers")
  }

  public searchCustomers(keyword : string):Observable<Array<Customer>> {
    return this.http.get<Array<Customer>>(this.backendHost+"/customers/search?keyword="+keyword);
  }

  public saveCustomers(Customer:Customer):Observable<Customer> {
      return this.http.post<Customer>(this.backendHost+"/customers",Customer);
  }
  public deleteCustomer(customerId:number) {
      return this.http.delete(this.backendHost+"/customers/"+customerId);
  }
}
