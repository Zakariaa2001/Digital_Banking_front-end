import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from '../model/Customer.model';

@Component({
  selector: 'app-customer-account',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './customer-account.component.html',
  styleUrl: './customer-account.component.css'
})
export class CustomerAccountComponent {
  customerId!:number;
  customer!: Customer;
  constructor(private route:ActivatedRoute,private router:Router){
    this.customer = this.router.getCurrentNavigation()?.extras.state as Customer;
  }

  ngOnInit() {
    this.customerId =  this.route.snapshot.params['id'];
  }
}
