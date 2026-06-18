import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})

export class Budget {
  private apiUrl = 'http://localhost:3000/api/budgets';

  constructor(private http: HttpClient){}

  getBudgets(month:number, year:number){
    return this.http.get(`${this.apiUrl}?month=${month}&year=${year}`);
  }


  createBudget(month:number, year:number, total_limit:number, category_limits: { category_id: string, limit: number }[]){
    return this.http.post(this.apiUrl,{
      month,
      year,
      total_limit,
      category_limits

    });
  }

  updateBudget(id:string,month:number, year:number, total_limit:number, category_limits: { category_id: string, limit: number }[]){
    return this.http.put(`${this.apiUrl}/${id}`,{
      month,
      year,
      total_limit,
      category_limits

    });
  }

  deleteBudget(id:string){
    return this.http.delete(`${this.apiUrl}/${id}`)
  }

  
}
