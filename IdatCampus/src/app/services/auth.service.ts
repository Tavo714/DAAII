import { Injectable } from '@angular/core';
import { PlatformService } from './platform.service';
import {SsrCookieService} from 'ngx-cookie-service-ssr'
import { LoginRequest } from '../models/login-request';
import { of, switchMap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginResponse } from '../models/login-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrlBasePath = "http://localhost:8080/";
  httpOptions;

  constructor(
    private platformService: PlatformService, 
    private cookieService: SsrCookieService,
    private httpClient: HttpClient
  
  ) 
  {
    this.httpOptions = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json'
        }
      )
    }
  }

  login(LoginRequest: LoginRequest){

    return this.httpClient.post<LoginResponse>(`${this.apiUrlBasePath}login`, LoginRequest, {headers: this.httpOptions.headers})
    .pipe(
      switchMap(
        data=>{

          let token= btoa(`${LoginRequest.username}:${LoginRequest.password}`);

          if(this.platformService.isBrowser()){
            data.side='client';
            localStorage.setItem('authToken',token);
          }else{
            data.side='server';
            this.cookieService.set('authToken', token);
          }
          return of(data);
        }
      )
    );    
  }

  getToken(){
    let token='';
    if(this.platformService.isBrowser()){
      console.log('getToken en ClientSide');
      token= localStorage.getItem('authToken')!;
    }else{
      console.log('getToken en ServerSide');
      token= this.cookieService.get('authToken')!;
    }
    return token;
  }

  logout(){
    let response= {isLogged: false, side: ''}
    if(this.platformService.isBrowser()){
      response.side='client';
      console.log('logout en ClientSide');
      localStorage.removeItem('authToken');
    }else{
      response.side='server';
      console.log('logout en ServerSide');
      this.cookieService.delete('authToken');
    }
    return of(response);
  }

  isAuthenticated(): boolean{
    if(this.platformService.isBrowser()){
      console.log('isAuthenticated en ClientSide. Token=>', localStorage.getItem('authToken'));
      return !!localStorage.getItem('authToken');
    }else{
      console.log('isAuthenticated en ServerSide. Token=>' + this.cookieService.get('authToken'));
      return this.cookieService.check('authToken');
    }
  }

}
