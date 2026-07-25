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

  forgotPassword(email: string) {
  return this.http.post(`${this.apiUrl}/forgot-password`, { email });
}

verifyResetCode(email: string, resetCode: string) {
  return this.http.post(`${this.apiUrl}/verify-reset-code`, { email, resetCode });
}

resetPassword(email: string, resetCode: string, newPassword: string) {
  return this.http.post(`${this.apiUrl}/reset-password`, { email, resetCode, newPassword });
}
changePassword(email: string, newPassword: string) {
  return this.http.patch(`${this.apiUrl}/change-password`, { email, newPassword });
}
getAllUsers() {
  return this.http.get(`${this.apiUrl}/users`);
}

deleteUser(id: string) {
  return this.http.delete(`${this.apiUrl}/users/${id}`);
}
}


