import { AccountsComponent } from './accounts/accounts.component';
import { CustomersComponent } from './customers/customers.component';
import { NavbarComponent } from './navbar/navbar.component';
import { Routes } from '@angular/router';
import { NewCustomerComponent } from './new-customer/new-customer.component';

export const routes: Routes = [
    // {path:"",component:NavbarComponent},
    {path:"customers",component:CustomersComponent},
    {path:"accounts",component:AccountsComponent},
    {path:"new-customer",component:NewCustomerComponent},
    {path:"",redirectTo:"app",pathMatch:'full'},
    
];
