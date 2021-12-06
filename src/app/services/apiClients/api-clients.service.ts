import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Response } from 'src/app/models/response';

const httpOptions = {
  headers: new HttpHeaders({
    'Contend-Type': 'application/jason'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ApiClientsService {

  url: string = "http://localhost:5295/api/clients"

  constructor(
    private _http: HttpClient
  ) { }

  get(): Observable<Response>{
    return this._http.get<Response>(this.url, httpOptions);
  }
}