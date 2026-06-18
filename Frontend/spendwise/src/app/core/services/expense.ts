import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})


export class Expense {
  private apiUrl='http://localhost:3000/api/expenses';

  constructor(private http: HttpClient){}

  getExpenses(){
    return this.http.get(`${this.apiUrl}`)

  }

  createExpense(amount:number, description:string, date:Date, payment_method:string, category_id:string){
    return this.http.post(`${this.apiUrl}`,{
      amount,
      description,
      date,
      payment_method,
      category_id
    });
  }

  updateExpense(id:string,amount:number, description:string, date:Date, payment_method:string, category_id:string){
    return this.http.put(`${this.apiUrl}/${id}`,{
      amount,
      description,
      date,
      payment_method,
      category_id
    });
  }

  deleteExpense(id:string){
    return this.http.delete(`${this.apiUrl}/${id}`)
  }

}
