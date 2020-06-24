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

  async findAll() {
    try {

      const conn = await this.dbService.getDB();

      const resp = await conn.executeSql('Select * from ListaDespesa', []).then((res) => {

        const items: Lista[] = [];

        if (res.rows.length > 0) {

          for (let i = 0; i < res.rows.length; i++) {
            items.push({
              id: res.rows.item(i).id,
              descricao: res.rows.item(i).descricao,
              data: res.rows.item(i).data,
              vlPrevisto: res.rows.item(i).vlPrevisto
            });
          }
        }
        return items;
      });
      return resp;
    } catch (error) {
      console.log(error);
    }

  }

  async save(lista: Lista) {
    const conn = await this.dbService.getDB();
    if (lista.id !== 0) {
      conn.executeSql('Insert into (descricao,data,vlPrevisto) values ()');
    }

  }


}
