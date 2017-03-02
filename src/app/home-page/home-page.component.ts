import { Component, OnInit } from '@angular/core';
import { AF } from ".././providers/af";
import { FirebaseListObservable } from "angularfire2";
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  userData: any;
  public newMessage: string;
  public messages: FirebaseListObservable<any>;

  constructor(public afService: AF) {
    this.messages = this.afService.messages;


    this.user();

  }

  ngOnInit() {
  }

  user() {

    if (localStorage.getItem('userData')) {

      this.userData = JSON.parse(localStorage.getItem('userData'));

      console.log(this.userData);
    }
    else {
      console.log("No Data");
    }

  }

  sendMessage(){
    this.afService.sendMessage(this.newMessage, this.userData);
    this.newMessage = '';
  }

}
