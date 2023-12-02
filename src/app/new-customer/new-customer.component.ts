import { CustomersService } from './../services/customers.service';
import { Customer } from './../model/Customer.model';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-customer',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './new-customer.component.html',
  styleUrl: './new-customer.component.css'
})
export class NewCustomerComponent {
  
  newFormCustomer!:FormGroup;

  constructor(private CustomersService:CustomersService ,private fb:FormBuilder,private router:Router) {

  }
  ngOnInit():void {
    this.newFormCustomer=this.fb.group({
      name:this.fb.control(null,[Validators.required,Validators.minLength(3)]),
      email:this.fb.control(null,[Validators.required,Validators.email]),
    })
  }

  handleSaveCustomer(){
    let Customer:Customer = this.newFormCustomer.value;
    this.CustomersService.saveCustomers(Customer).subscribe({
      next:data => {
        alert("Customer has been succesfully saved");
        //this.newFormCustomer.reset();
        this.router.navigateByUrl("/customers")
      },
      error:err => {
        console.log(err);
      }
    })
   
  }

}
