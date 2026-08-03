import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class Category {
 private apiUrl = 'https://spend-wise-five-nu.vercel.app/api/categories';

  constructor(private http:HttpClient){}
  
  getCategories(){
    return this.http.get(`${this.apiUrl}`);
  }


  createCategory(name:string, icon:string, color:string, type:string){
    return this.http.post(`${this.apiUrl}`,{
      name,
      icon,
      color,
      type

    });
  }

    updateCategory(id:string,name:string, icon:string, color:string, type:string){
      return this.http.put(`${this.apiUrl}/${id}`,{
        name,
        icon,
        color,
        type
      });
    }

    deleteCategory(id:string){
      return this.http.delete(`${this.apiUrl}/${id}`)
    };

}
