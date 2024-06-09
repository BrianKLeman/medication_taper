/* Angular imports */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatDialogModule } from '@angular/material/dialog';
import { AppRoutingModule } from './app-routing.module';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

/* Homemade imports*/
import { AppComponent } from './app.component';
import { PrescriptionsTableComponent } from './prescriptions-table/prescriptions-table.component';
import { MedicationDosesTableComponent } from './medication-doses-table/medication-doses-table.component';
import { NotesComponent } from './notes/notes.component';
import { NotesTableComponent } from './notes-table/notes-table.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthHttpInterceptorService } from './auth-http-interceptor.service';
import { AuthDialogComponent } from './auth-dialog/auth-dialog.component';

/* Register Module */
@NgModule({
  declarations: [
    AppComponent,
    PrescriptionsTableComponent,
    MedicationDosesTableComponent,
    NotesComponent,
    NotesTableComponent,
    AuthDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatDialogModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [
    { provide: HttpClient}, { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptorService, multi: true }/*,
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptorService }
  */],
  bootstrap: [AppComponent]
})
export class AppModule { }
