import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { error } from 'console';
import { CustomersService } from '../services/customers.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Customer } from './../model/Customer.model';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { routes } from '../app.routes';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent {

  customers! : Observable<Array<Customer>>;
  errorMessage! : string;
  keyword! : string;

  constructor(private customerService:CustomersService,private router:Router){

  }
  ngOnInit() {
    // using pipe for catch errors
   this.customers= this.customerService.getCustomers().pipe(
    catchError(err => {
      this.errorMessage=err.message;
      return throwError(err)
    })
   );
  }

  searchCustomers() {
    this.customers= this.customerService.searchCustomers(this.keyword).pipe(
      catchError(err => {
        this.errorMessage=err.message;
        return throwError(err)
      })
     );
  }
  handleDeleteCustomer(c:Customer) {
    let conf = confirm('Are You Sure ?');
    if(!conf) return;
    this.customerService.deleteCustomer(c.id).subscribe({
      next:(resp) => {
        this.customers=this.customers.pipe(
          map(data => {
            let index = data.indexOf(c)
            data.slice(index,1)
            return data
          })
        )
      },
      error:err => {
        console.log(err);
      }
    })
  }
  handleCustomerAccounts(customer:Customer) {
    this.router.navigateByUrl('/customer-accounts/'+customer.id,{state : customer})
  }
}
