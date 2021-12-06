import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Response } from '../../models/response'
import { Sale } from 'src/app/models/sale';

const httpOptions = {
  headers: new HttpHeaders({
    'Contend-Type': 'application/json'
  })
};
@Injectable({
  providedIn: 'root'
})
export class ApiSaleService {
  url: string = "http://localhost:5295/api/sale";

  constructor(private _http: HttpClient) { }

  add(sale: Sale): Observable<Response>{
    return this._http.post<Response>(this.url, sale, httpOptions);
  }
}
