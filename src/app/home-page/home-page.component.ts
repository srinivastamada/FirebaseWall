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
  public finalMessages: any;
  public error: any;


  constructor(public afService: AF) {
    this.finalMessages = this.afService.messages.map( (arr) => { return arr.reverse(); } ) as FirebaseListObservable<any[]>;
 
    this.user();
  

  }

  ngOnInit() {
  }

   getPost() {
    return this.messages.map(posts => {
      
      return posts.reverse();
    });
  }

  user() {

    if (localStorage.getItem('userData')) {

      this.userData = JSON.parse(localStorage.getItem('userData'));
     
    //  this.register();
    }
    else {
      console.log("No Data");
    }

  }

  removeMessage(key) {
    console.log( key);
    this.afService.removeMessage(key);
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