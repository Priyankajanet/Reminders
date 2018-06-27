import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  db :any;
  no:any;
  description:String;
  name:string;
  constructor(public navCtrl: NavController, private sqlite: SQLite) {
    this.initializeDb();
  }

  initializeDb() {
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      console.log('DB Created '+db);
      this.db = db;
      this.createTable();
    }).catch(error => {
      console.log("Error in DB creation  " + error);
    });
  }

  createTable() {

    this.db.executeSql('CREATE TABLE IF NOT EXISTS items( INTEGER PRIMARY KEY, no INT, name TEXT, description TEXT)', {})
      .then(res => {
        console.log('Executed SQL ¬¬ CREATE TABLE');
        //this.insertData();
      })
      .catch(e => {
        console.log("Error in Table creation  " + e)
      });


  }

  insertData() {
    let query = "INSERT INTO items(no,name,description) VALUES";
    let values = "("+this.no+",'"+this.name+"','"+this.description+"')";
    query  = query  +values;
    this.db.executeSql(query,[])
      .then(no => {
        console.log("INSERT Sucess", no);
        //this.findAll();
      }, error => {
        console.log("INSERT ERROR", error);
      });
  }

  findAll() {

    this.db.executeSql("SELECT no,name,description FROM items", {}).then((data) => {
       for(let rowData = 0; rowData < data.rows.length; rowData ++){
         console.log(JSON.stringify(data.rows.item(rowData)));
         alert(JSON.stringify(data.rows.item(rowData)));
       }
      
      /* if(data.rows.length > 0) {
           for(var i = 0; i < data.rows.length; i++) {
               this.items.push({
                 no:data.row.items(i).no,
                 name:data.row.items(i).name,
                 description:data.row.it
           });
         }
         console.log('data.row.items(i).no');
   } */

    }).catch(error => {
      console.log('Executed in data fetch');
    });

  }

}
