import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})

export class Income {
  private apiUrl = 'http://localhost:3000/api/incomes';

  constructor(private http:HttpClient){}

  getIncomes(){
    return this.http.get(this.apiUrl)
  }

  createIncome(amount:number, description:string, date:Date, source:string, category_id:string){
    return this.http.post(this.apiUrl,{
      amount,
      description,
      date,
      source,
      category_id

    });
  }


  updateIncome(id:string,amount:number, description:string, date:Date, source:string, category_id:string){
    return this.http.put(`${this.apiUrl}/${id}`,{
      amount,
      description,
      date,
      source, 
      category_id

    });
  }

  deleteIncome(id:string){
    return this.http.delete(`${this.apiUrl}/${id}`)
  }

  

}
