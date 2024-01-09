import { CustomerAccountComponent } from './customer-account/customer-account.component';
import { AccountsComponent } from './accounts/accounts.component';
import { CustomersComponent } from './customers/customers.component';
import { NavbarComponent } from './navbar/navbar.component';
import { Routes, CanActivateFn } from '@angular/router';
import { NewCustomerComponent } from './new-customer/new-customer.component';
import { LoginComponent } from './login/login.component';
import { AdminTemplateComponent } from './admin-template/admin-template.component';
import { authenticationGuard } from './guards/authentication.guard';
import { authorizationGuard } from './guards/authorization.guard';
import { NotAuthoriezdComponent } from './not-authoriezd/not-authoriezd.component';

export const routes: Routes = [
    // {path:"",component:NavbarComponent},
    {path:"login",component:LoginComponent},
    {path:"",redirectTo : 'login',pathMatch:"full"},
    {path:"admin",component:AdminTemplateComponent,canActivate:[authenticationGuard] , children : [
        {path:"customers",component:CustomersComponent},
        {path:"accounts",component:AccountsComponent},
        {path:"new-customer",component:NewCustomerComponent,canActivate:[authorizationGuard],data:{role:"ADMIN"}},
        {path:"customer-accounts/:id",component:CustomerAccountComponent},
        {path:"notAuthoriezd",component:NotAuthoriezdComponent},
        
    ]}
    
];
