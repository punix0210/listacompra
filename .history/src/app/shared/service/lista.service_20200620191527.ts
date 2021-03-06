import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Lista } from '../model/lista';
import { HttpClient } from '@angular/common/http';
import { DatabaseService } from './database.service';

const endpoint = 'despesa';

@Injectable({
  providedIn: 'root'
})
export class ListaService {

  constructor(private http: HttpClient, private dbService: DatabaseService) { }

  findById(id): Observable<Lista> {
    return this.http.get<Lista>(`${id}`);
  }

  post(lista: Lista) {
    return this.http.post(`${endpoint}`, lista);
  }

  put(lista: Lista) {
    return this.http.put(`${endpoint}`, lista);
  }

  delete(id) {
    return this.http.delete(`${endpoint}?id=${id}`);
  }

  findAll() {
    // this.dbService.dbBase.
  }


}
