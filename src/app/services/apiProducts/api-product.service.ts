import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Response } from 'src/app/models/response';
import { AthURL } from 'src/app/resources/AthURL';

const httpOptions = {
  headers: new HttpHeaders({
    'Contend-Type': 'application/jason'
  })
};
@Injectable({
  providedIn: 'root'
})
export class ApiProductService {

  url: string = AthURL.PRODUCT;

  constructor(
    private _http: HttpClient
  ) { }

  get(): Observable<Response>{
    return this._http.get<Response>(this.url, httpOptions);
  }
  getSpecifiedProduct(id: number): Observable<Response>{
    console.log(this.url + "/" + id);
    return this._http.get<Response>(this.url + "/" + id, httpOptions)
  }
}