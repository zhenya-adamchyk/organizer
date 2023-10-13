import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalendarComponent } from './calendar/calendar.component';
import { EventComponent } from './event/event.component';

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAM7sVwsY8CougTXVQJyaTKl50whky4HfQ",
  authDomain: "organizer-9ac18.firebaseapp.com",
  projectId: "organizer-9ac18",
  storageBucket: "organizer-9ac18.appspot.com",
  messagingSenderId: "65732087901",
  appId: "1:65732087901:web:e2f53c7401dd7ecd8dbdb4",
  measurementId: "G-DC9GVDJF8H"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    EventComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
