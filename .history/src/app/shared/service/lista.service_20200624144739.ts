import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Lista } from '../model/lista';
import { DatabaseService } from './database.service';
import { Response } from '../model/response';

const endpoint = 'despesa';

@Injectable({
  providedIn: 'root'
})
export class ListaService {

  private despesaList = new BehaviorSubject<Lista[]>([]);

  constructor(private dbService: DatabaseService) {
    console.log('ListaService');
    this.findAll();
  }

  clearDespesas() {
    this.despesaList.next([]);
  }

  fetchDespesas(): Observable<Lista[]> {
    return this.despesaList.asObservable();
  }

  private async findAll() {

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
    this.despesaList.next(items);
  }

  findById(id): Promise<Response> {
    return new Promise(async (resolve) => {
      try {
        const conn = await this.dbService.getDB();
        const sql = 'Select * from ListaDespesa';
        const data = [id];

        const resp = await conn.executeSql(sql, []);
        console.log(resp.row);
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

  save(lista: Lista): Promise<Response> {
    return new Promise(async (resolve) => {
      try {
        const conn = await this.dbService.getDB();

        if (lista.id === 0) {
          const sql = 'insert into ListaDespesa (descricao, data, vlPrevisto) values (?, ?, ?)';
          const data = [lista.descricao, lista.data, lista.vlPrevisto];
          const resp = await conn.executeSql(sql, data);
          lista.id = resp.insertId;
          resolve({ success: true, data: lista, error: false });
        } else {
          const sql = 'update ListaDespesa set descricao=? data=? vlPrevisto=? Where id=?';
          const data = [lista.descricao, lista.data, lista.vlPrevisto, lista.id];
          const resp = await conn.executeSql(sql, data);
          resolve({ success: true, data: resp, error: false });
        }

        this.findAll();

      } catch (error) {
        resolve({ success: false, data: error, error: true });
      }
    });
  }

  delete(id): Promise<Response> {
    return new Promise(async (resolve) => {
      try {

        const conn = await this.dbService.getDB();

        const sql1 = `Delete From ListaDespesaItem where listaId=?`;
        const data1 = [id];
        const resp1 = await conn.executeSql(sql1, data1);

        const sql2 = `Delete From ListaDespesa where id=?`;
        const data2 = [id];
        const resp2 = await conn.executeSql(sql2, data2);

        resolve({ success: true, data: resp2, error: false });

      } catch (error) {
        resolve({ success: false, data: error, error: true });
      }

      this.findAll();

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
