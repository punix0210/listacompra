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

  public getDB() {
    return this.sqlite.create({
      name: 'developers.db',
      location: 'default'
    });
  }

  public async createDataBase() {

    const conn = await this.getDB();

    await this.createtable(conn);

    await this.insertDefault(conn);
  }

  private createtable(db: SQLiteObject) {
    this.http.get('assets/database/V1_create_table.sql', { responseType: 'text' }).subscribe((sql) => {
      this.sqlitePorter.importSqlToDb(db, sql)
        .then(_ => {
          this.dbReady.next(true);
        })
        .catch(e => console.error(e));
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
