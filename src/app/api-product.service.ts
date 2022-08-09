import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable , BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiProductService {

  baseUrl:string = `https://fakestoreapi.com/`
  numItem = new BehaviorSubject(null);

  constructor(private http:HttpClient) { }

  getNumItems()
  {
    let items:any = localStorage.getItem('numberItem');
    this.numItem.next(items);
  }

  getAllProducts():Observable<any>
  {
    return this.http.get(`${this.baseUrl}products`)
  }

  getAllCategory():Observable<any>
  {
    return this.http.get(`${this.baseUrl}products/categories`)
  }

  getProductByCategory(typeCategory:string):Observable<any>
  {
    return this.http.get(`${this.baseUrl}products/category/${typeCategory}`)
  }

  getProductDetails(id:number):Observable<any>
  {
    return this.http.get(`${this.baseUrl}products/${id}`)
  }

}
