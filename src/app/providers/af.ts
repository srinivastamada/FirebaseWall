import { OrderBySelection } from 'angularfire2/interfaces';
import { Injectable } from "@angular/core";
import { AngularFire, AuthProviders, AuthMethods, FirebaseListObservable } from 'angularfire2';
@Injectable()
export class AF {
  public messages: FirebaseListObservable<any>;
  public users: FirebaseListObservable<any>;
  // public users: FirebaseListObservable<any>;
  public displayName: string;
  public email: string;
  public finalMessages : any;
  constructor(public af: AngularFire) {

    this.messages = this.af.database.list('messages',  {
      query: {
        orderByChild: 'timestamp',
        limitToLast: 40
      }
    });
    this.users = this.af.database.list('users');
   
  }



  removeMessage(key: string) {
    this.messages.remove(key).then(_ => console.log('item deleted!'));
  }

    socialLogin(loginProvider) {
      var provider;
      if (loginProvider === 'google') {
        provider = AuthProviders.Google;
      }
      else if (loginProvider === 'facebook') {
        provider = AuthProviders.Facebook;
      }
      else if (loginProvider === 'github') {
        provider = AuthProviders.Github;
      }
      else if (loginProvider === 'twitter') {
        provider = AuthProviders.Twitter;
      }

      return this.af.auth.login({
        provider: provider,
        method: AuthMethods.Popup,
      });
    }

    logout() {

      return this.af.auth.logout();
    }
    sendMessage(text, userData) {

      var message = {
        message: text,
        displayName: userData.displayName,
        email: userData.email,
        photoURL: userData.photoURL,
        timestamp: Date.now()
      };

      console.log("this.messages");
      console.log(this.messages);
      //this.messages.push(message);
      this.messages.push(message);
      
    }

    userLogin(userData) {
      var user = {
        displayName: userData.displayName,
        email: userData.email,
        photoURL: userData.photoURL,
        timestamp: firebase.database.ServerValue.TIMESTAMP
      };
      this.users.push(user);
    }

    saveUserInfoFromForm(userData) {
      return this.af.database.object('registeredUsers/' + userData.uid).set({
        name: userData.displayName,
        email: userData.email,
        photoURL: userData.photoURL
      });
    }


    registerUser(userData) {
      return this.af.auth.createUser({
        email: userData.email,
        password: 'xxxxxxxxxxxx',
      });
    }

  }