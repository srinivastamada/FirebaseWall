import {Component, AfterViewChecked, ElementRef, ViewChild, OnInit} from '@angular/core';
import {AF} from ".././providers/af";
import {FirebaseListObservable} from "angularfire2";
import {MomentModule} from 'angular2-moment';

@Component({selector: 'app-home-page', templateUrl: './home-page.component.html', styleUrls: ['./home-page.component.css']})
export class HomePageComponent implements OnInit {
  @ViewChild('scrollMe')private myScrollContainer : ElementRef;
  userData : any;
  public newMessage : string;
  public messages : FirebaseListObservable < any >;
  public finalMessages : any;
  public error : any;

  constructor(public afService : AF) {
    this.finalMessages = this
      .afService
      .messages
      .map((arr) => {
        return arr;
      })as FirebaseListObservable < any[] >;

    this.user();
  }

  ngOnInit() {
    this.scrollToBottom();
  }

  // ngAfterViewChecked() {   console.log("Hrer");   //this.scrollToBottom(); }
  scrollToBottom() : void {
    try {
      //console.log(this.myScrollContainer.nativeElement.scrollTop);
      console.log("XXXXX" + this.myScrollContainer.nativeElement.scrollHeight);
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight + 400;
    } catch (err) {}
  }

  getPost() {
    return this
      .messages
      .map(posts => {

        return posts;
      });
  }
  logout(){
    this.afService.logout();
  }

  user() {
    if (localStorage.getItem('userData')) {
      this.userData = JSON.parse(localStorage.getItem('userData'));
      //  this.register();
    } else {
      console.log("No Data");
    }

  }

  removeMessage(key) {
    console.log(key);
    this
      .afService
      .removeMessage(key);
  }

  sendMessage() {

    setTimeout(() => this.scrollToBottom(), 100);

    this
      .afService
      .sendMessage(this.newMessage, this.userData);
    this.newMessage = '';

  }

  register() {
    this
      .afService
      .registerUser(this.userData)
      .then((user) => {
        console.log("asdfasdfsadfsadfsadf");
        console.log(user);
        this
          .afService
          .saveUserInfoFromForm(this.userData)
          .then(() => {
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