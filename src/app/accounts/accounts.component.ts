import { Observable } from 'rxjs';
import { AccountsService } from './../services/accounts.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AccountDetails } from '../model/account.model';

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
  constructor(private fb:FormBuilder,private accountsService:AccountsService) {

  }

  ngOnInit() {
    this.accountFormGroup=this.fb.group({
      accountId : this.fb.control('')
    })
  }
  handleSearchAccount() {
    let accountId:string=this.accountFormGroup.value.accountId;
    this.accountObservable= this.accountsService.getAccount(accountId,this.currentPage,this.pageSize);
  }

}
