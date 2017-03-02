import { Injectable } from "@angular/core";
import { AngularFire, AuthProviders, AuthMethods, FirebaseListObservable } from 'angularfire2';
@Injectable()
export class AF {
  public messages: FirebaseListObservable<any>;
  public users: FirebaseListObservable<any>;
  public displayName: string;
  public email: string;
  constructor(public af: AngularFire) { 

     this.messages = this.af.database.list('messages');
  }
  /**
   * Logs in the user
   * @returns {firebase.Promise<FirebaseAuthState>}
   */

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
  sendMessage(text,userData) {
    console.log("User Data ...");
    console.log(userData.email);
    var message = {
      message: text,
      displayName: userData.displayName,
      email: userData.email,
      timestamp: Date.now()
    };
    this.messages.push(message);
  }
}