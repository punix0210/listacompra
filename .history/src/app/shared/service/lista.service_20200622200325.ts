import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Lista } from '../model/lista';
import { HttpClient } from '@angular/common/http';
import { DatabaseService } from './database.service';
import { Response } from '../model/response';

const endpoint = 'despesa';

@Injectable({
  providedIn: 'root'
})
export class ListaService {

  constructor(private dbService: DatabaseService) { }

  findAll(): Promise<Response> {
    return new Promise(async (resolve) => {
      try {

        const items: Lista[] = [];
        const conn = await this.dbService.getDB();
        const resp = await conn.executeSql('Select * From ListaDespesa', []);

        if (resp.rows.length > 0) {
          let rows = resp.rows;
          for (let i = 0; i < rows.length; i++) {
            items.push({
              id: rows.item(i).id,
              descricao: rows.item(i).descricao,
              data: rows.item(i).data,
              vlPrevisto: rows.item(i).vlPrevisto
            });
          }
        }

        resolve({ success: true, data: items, error: false });

      } catch (error) {
        resolve({ success: false, data: error, error: true });
      }
    });

  }

  save(lista: Lista): Promise<Response> {
    return new Promise(async (resolve) => {
      try {
        const conn = await this.dbService.getDB();

        if (lista.id === 0) {
          const sql = 'insert into ListaDespesa (descricao, data, vlPrevisto) values (?, ?, ?)';
          const data = [lista.descricao, lista.data, lista.vlPrevisto];
          const resp = await conn.executeSql(sql, data);
          resolve({ success: true, data: resp, error: false });
        } else {
          const sql = 'update ListaDespesa set descricao=? data=? vlPrevisto=? Where id=?';
          const data = [lista.descricao, lista.data, lista.vlPrevisto, lista.id];
          const resp = await conn.executeSql(sql, data);
          resolve({ success: true, data: resp, error: false });
        }

      } catch (error) {
        resolve({ success: false, data: error, error: true });
      }
    });
  }

  findById(id): Promise<Response> {
    return new Promise(async (resolve) => {
      try {
        const conn = await this.dbService.getDB();
        const sql = 'Select * from ListaDespesa Where id=?';
        const data = [id];

        const resp = await conn.executeSql(sql, data);

        let lista = new Lista();

        if (resp.rows.length > 0) {
          let row = resp.rows.item(0);
          lista.id = row.id;
          lista.descricao = row.descricao;
          lista.data = row.data;
          lista.vlPrevisto = row.vlPrevisto;
        }

        resolve({ success: true, data: lista, error: false });

      } catch (error) {
        resolve({ success: false, data: error, error: true });
      }
    });
  }


}



// try {



//   const resp = await conn.executeSql('Select * from ListaDespesa', []).then((res) => {

//     const items: Lista[] = [];

//     if (res.rows.length > 0) {

//       for (let i = 0; i < res.rows.length; i++) {
//         items.push({
//           id: res.rows.item(i).id,
//           descricao: res.rows.item(i).descricao,
//           data: res.rows.item(i).data,
//           vlPrevisto: res.rows.item(i).vlPrevisto
//         });
//       }
//     }
//     return items;
//   });
//   return resp;
// } catch (error) {
//   console.log(error);
// }
