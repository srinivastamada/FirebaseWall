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
  public error: any;


  constructor(public afService: AF) {
    this.messages = this.afService.messages;
  //  this.loginUsers = this.afService.users;
    this.user();

  }

  ngOnInit() {
  }

  user() {

    if (localStorage.getItem('userData')) {

      this.userData = JSON.parse(localStorage.getItem('userData'));
      console.log(this.userData);
    //  this.register();
    }
    else {
      console.log("No Data");
    }

  }

  sendMessage() {
    this.afService.sendMessage(this.newMessage, this.userData);
    this.newMessage = '';
  }


  register() {
    this.afService.registerUser(this.userData).then((user) => {
      console.log("asdfasdfsadfsadfsadf");
      console.log(user);
      this.afService.saveUserInfoFromForm(this.userData).then(() => {
       // this.router.navigate(['']);
      })
        .catch((error) => {
          this.error = error;
        });
    })
      .catch((error) => {
        this.error = error;
        console.log(this.error);
      });
  }
}