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
  private database: SQLiteObject;
  private dbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private plt: Platform,
    private sqlitePorter: SQLitePorter,
    private sqlite: SQLite,
    private http: HttpClient) {

    this.plt.ready().then(() => {
      this.sqlite.create({
        name: 'developers.db',
        location: 'default'
      })
        .then((db: SQLiteObject) => {
          this.database = db;
          this.seedDatabase();
        });
    });
  }


  seedDatabase() {
    this.http.get('assets/database/V1_create_Insert_Lista.sql', { responseType: 'text' })
      .subscribe(sql => {
        this.sqlitePorter.importSqlToDb(this.database, sql)
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
