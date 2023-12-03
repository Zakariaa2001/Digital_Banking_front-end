import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AccountsService } from './../services/accounts.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AccountDetails } from '../model/account.model';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-accounts',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.css'
})
export class AccountsComponent {

  accountFormGroup!:FormGroup;
  currentPage:number=0;
  pageSize:number=5;
  accountObservable!:Observable<AccountDetails>;

  operationFormGroup!:FormGroup;
  errorMessage!:string;

  constructor(private fb:FormBuilder,private accountsService:AccountsService) {

  }

  ngOnInit() {
    this.accountFormGroup=this.fb.group({
      accountId : this.fb.control('')
    })
    this.operationFormGroup=this.fb.group({
      operationType:this.fb.control(null),
      amount:this.fb.control(0),
      description:this.fb.control(null),
      accountDestination:this.fb.control(null),
    })
  }
  handleSearchAccount() {
    let accountId:string=this.accountFormGroup.value.accountId;
    this.accountObservable= this.accountsService.getAccount(accountId,this.currentPage,this.pageSize).pipe(
      catchError(err => {
        this.errorMessage=err.message;
        return throwError(err)
      })
    );
  }
  gotoPage(page:number) {
    this.currentPage=page;
    this.handleSearchAccount();
  }
  handleAccountOperation() {
    let accountId = this.accountFormGroup.value.accountId;
    let operationType = this.operationFormGroup.value.operationType;
    let amount:number = this.operationFormGroup.value.amount;
    let description:string = this.operationFormGroup.value.description;
    let accountDestination:string = this.operationFormGroup.value.accountDestination;
    if(operationType=='debit'){
      this.accountsService.debit(accountId,amount,description).subscribe({
        next: data => {
          alert('Suucess Debit');
          this.operationFormGroup.reset();
          this.handleSearchAccount();
        },
        error:err => {
          console.log(err);
        }
      })
    } else if(operationType == 'credit') {
      this.accountsService.credit(accountId,amount,description).subscribe({
        next: data => {
          alert('Suucess Credit');
          this.operationFormGroup.reset();
          this.handleSearchAccount();

        },
        error:err => {
          console.log(err);
        }
      })
      
    } else if(operationType == 'transfer') {
      this.accountsService.transfer(accountId,accountDestination,amount,description).subscribe({
        next: data => {
          alert('Suucess Transfer');
          this.operationFormGroup.reset();
          this.handleSearchAccount();
        },
        error:err => {
          console.log(err);
        }
      })
    }
  }

}
