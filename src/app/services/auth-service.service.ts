import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  isAuthentification : boolean = false;
  roles : any ;
  username : any;
  accesToken! :any;

  constructor(private http:HttpClient,private router:Router) { }

  public login(username:string,password:string){
    let options = {
      headers: new HttpHeaders().set("Content-Type","application/x-www-form-urlencoded")
    }
    let params = new HttpParams().set("username",username).set("password",password);
    return this.http.post("http://localhost:8080/auth/login",params,options)
  }

  public loadProfile(data:any) {
    //let jwt = data['access-token'];
    this.isAuthentification = true;
    this.accesToken= data['access-token'];
    let decodedJwt : any = jwtDecode(this.accesToken);
    //console.log(decodedJwt);
    this.username = decodedJwt.sub;
    this.roles = decodedJwt.scope;
    window.localStorage.setItem("jwt-token",this.accesToken);
  }
  logout() {
    this.isAuthentification=false;
    this.accesToken=undefined;
    this.roles=undefined;
    this.username=undefined;
    window.localStorage.removeItem("jwt-token")
    this.router.navigateByUrl('/login')
  }
  loadJwtTokenFromLocalStorage(){
    let token = window.localStorage.getItem("jwt-token"); 
    if(token) {
      this.loadProfile({'access-token':token});
      this.router.navigateByUrl("/admin")
    }
  }
}
