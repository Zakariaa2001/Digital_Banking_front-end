import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthServiceService } from '../services/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  formLogin! :FormGroup;
  constructor(private fb:FormBuilder,private authService:AuthServiceService,private router:Router){}

  ngOnInit() {
    this.formLogin = this.fb.group({
      username : this.fb.control(""),
      password : this.fb.control("")
    })
  }
  handleLogin() {
    //console.log(this.formLogin.value);
    let username = this.formLogin.value.username;
    let password = this.formLogin.value.password;
    this.authService.login(username,password).subscribe({
        next:data => {
          //console.log(data);
          this.authService.loadProfile(data)
          this.router.navigateByUrl("/admin")
        },
        error:err => {
          console.log(err);
        }
    })
  }


}
