import {RouterModule, Routes} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {MaterialModule} from '@angular/material';
import {AppComponent} from './app.component';
import {AngularFireModule} from 'angularfire2';
import { LinkyModule } from 'angular-linky';
import {AF} from "./providers/af";
import {LoginPageComponent} from './login-page/login-page.component';
import {HomePageComponent} from './home-page/home-page.component';
import {AdsenseModule} from 'ng2-adsense';
import {MomentModule} from 'angular2-moment';

export const firebaseConfig = {
  apiKey: "AIzaSyAEb6AiYN8k1gKeRNSjGHCTfx7jJwS4kNY",
  authDomain: "chat-e9764.firebaseapp.com",
  databaseURL: "https://chat-e9764.firebaseio.com",
  projectId: "chat-e9764",
  storageBucket: "chat-e9764.appspot.com",
  messagingSenderId: "58504191053"
};

const routes : Routes = [
  {
    path: 'home',
    component: HomePageComponent
  }, {
    path: '',
    component: LoginPageComponent
  }
];

@NgModule({
  declarations: [
    AppComponent, LoginPageComponent, HomePageComponent, AppComponent
  ],
  providers: [AF],
  imports: [
    BrowserModule, FormsModule, HttpModule, AngularFireModule.initializeApp(firebaseConfig),
    RouterModule.forRoot(routes),
    MaterialModule.forRoot(),
    AdsenseModule.forRoot({adClient: 'ca-pub-6904774409601870', adSlot: 4242245788}),
    MomentModule, LinkyModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}