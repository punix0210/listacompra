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
    const con = await this.sqlite.create({
      name: 'data.db',
      location: 'default'
    });

    con.open().then((db: SQLiteObject) => {
      db.executeSql('create table danceMoves(name VARCHAR(32))', [])
        .then(() => console.log('Executed SQL'))
        .catch(e => console.log(e));


    })
      .catch(e => console.log(e));
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
