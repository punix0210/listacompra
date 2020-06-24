import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';

import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { HttpClient } from '@angular/common/http';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private dbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private sqlitePorter: SQLitePorter,
    private sqlite: SQLite,
    private http: HttpClient) { }

  public async getDB() {
    return await this.sqlite.create({
      name: 'developers.db',
      location: 'default'
    });
  }

  public createDataBase() {

    const conn = this.getDB();

    // return this.getDB()
    //   .then((db: SQLiteObject) => {
    //     console.log('database');

    //     this.createtable(db);

    //   }).catch((e) => {
    //     console.log(e);
    //   });
  }

  private createtable(db: SQLiteObject) {
    this.http.get('assets/database/V1_create_table.sql', { responseType: 'text' }).subscribe((sql) => {
      console.log(sql);
      // this.sqlitePorter.importSqlToDb(db, sql)
      //   .then(_ => {
      //     this.dbReady.next(true);
      //   })
      //   .catch(e => console.error(e));
    });
  }

  private insertDefault(db: SQLiteObject) {
    this.http.get('V1.1_Insert_default_table.sql', { responseType: 'text' }).subscribe((sql) => {
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
