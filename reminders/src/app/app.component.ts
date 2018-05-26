import { Component } from '@angular/core';
import { AngularIndexedDB } from 'angular2-indexeddb';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'REMINDER APP';
  reminder: string;
  total = ["S.No", "reminder", "description"];
  sNo: number;
  reminderDsc: string;
  arrayRe = [];
  reminderDetails = { "index": 0, "sNo": 0, "reminder": "", "reminderDsc": "" };
  dele = [];
  isEdit: boolean = false;
  editIndex: number = 0;
  constructor() {
    this.getReminders();
  }

  getReminders(){
    this.arrayRe = JSON.parse(localStorage.getItem("REMINDERS"));
  }
  
  add() {

    this.reminderDetails = { "index": 0, "sNo": 0, "reminder": "", "reminderDsc": "" };

    this.reminderDetails.sNo = this.sNo;
    this.reminderDetails.reminder = this.reminder;
    this.reminderDetails.reminderDsc = this.reminderDsc;
    if (this.isEdit) {
      this.reminderDetails.index = this.editIndex;
      this.arrayRe[this.editIndex] = this.reminderDetails;
      this.isEdit = false;
    } else {
      this.reminderDetails.index = this.arrayRe.length;
      this.arrayRe.push(this.reminderDetails);
    }
    localStorage.setItem("REMINDERS",JSON.stringify(this.arrayRe));
  }
  editReminder(index) {
    this.isEdit = true;
    this.editIndex = index;
    this.sNo = this.arrayRe[index].sNo;
    this.reminder = this.arrayRe[index].reminder;
    this.reminderDsc = this.arrayRe[index].reminderDsc;

  }

  deleteReminder(id) {
    for(let item=0; item < this.arrayRe.length;item++){
      if(this.arrayRe[item].index == id){
        this.arrayRe.splice(item,1);
      }
    }
    localStorage.setItem("REMINDERS",JSON.stringify(this.arrayRe));
  }
}
