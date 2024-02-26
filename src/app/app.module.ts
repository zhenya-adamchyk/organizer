import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { CalendarComponent } from './calendar/calendar.component';

import { initializeApp } from "firebase/app";
import { OrganizerComponent } from './organizer/organizer.component';
import { SelectorComponent } from './selector/selector.component';
import { MomentPipe } from './shared/moment.pipe';
import { ServiceWorkerModule } from '@angular/service-worker';

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

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    SelectorComponent,
    OrganizerComponent,
    MomentPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
