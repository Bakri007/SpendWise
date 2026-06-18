import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private apiUrl = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient) {}

  register(name:string, email:string, password:string, currency:string) {
    return this.http.post(`${this.apiUrl}/register`,{
      name,
      email,
      password,
      currency
    });
}


login(email:string, password:string){
  return this.http.post(`${this.apiUrl}/login`, {
    email,
    password
  });
}

logout(){
  localStorage.removeItem('token');
}

isLoggedIn(): boolean {
  return !!localStorage.getItem('token');
  }
}
