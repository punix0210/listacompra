import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';

import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { HttpClient } from '@angular/common/http';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { BehaviorSubject, Observable } from 'rxjs';
import { Response } from '../model/response';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private dbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private sqlitePorter: SQLitePorter,
    private sqlite: SQLite,
    private http: HttpClient) { console.log('DatabaseService'); }

  public async getDB() {
    return await this.sqlite.create({
      name: 'developers.db',
      location: 'default'
    });
  }

  public createDataBase(): Promise<Response> {

    return new Promise(async (resolve) => {

      try {
        const conn = await this.getDB();
        const resp = await this.createtable(conn);
        resolve(
          {
            success: true, data: conn, error: false
          });
      } catch (error) {
        resolve(
          {
            success: false, data: error, error: true
          });
      }
    });

  }

  private createtable(db: SQLiteObject): Promise<Response> {

    return new Promise(async (resolve) => {
      try {
        const sql = await this
          .http
          .get('assets/database/V1_create_table.sql', { responseType: 'text' })
          .toPromise();
        await this.sqlitePorter.importSqlToDb(db, sql);
        resolve(
          {
            success: true, data: sql, error: false
          });
      } catch (error) {
        resolve(
          {
            success: false, data: error, error: true
          });
      }
    });
  }

  private insertDefault(db: SQLiteObject) {
    this.http.get('assets/database/V2_Insert_default_table.sql', { responseType: 'text' }).subscribe((sql) => {
      this.sqlitePorter.importSqlToDb(db, sql)
        .then(_ => {
          this.dbReady.next(true);
        })
        .catch(e => console.error(e));
    });
  }


  getDatabaseState() {
    return this.dbReady.asObservable();
  }


}


    // return this.http.get('assets/database/V1_create_table.sql', { responseType: 'text' }).subscribe((sql) => {
    //   return this.sqlitePorter.importSqlToDb(db, sql)
    //     .then(_ => {
    //       this.dbReady.next(true);
    //     })
    //     .catch(e => console.error(e));
    // });
