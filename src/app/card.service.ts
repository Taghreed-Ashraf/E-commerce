import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CardService {

  baseUrl:string = `https://fakestoreapi.com/`

  constructor(private http:HttpClient) { }

  sendCard(model:any):Observable<any>
  {
    return this.http.post(`${this.baseUrl}carts` , model)
  }
}
