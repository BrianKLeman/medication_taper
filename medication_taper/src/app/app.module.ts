import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrescriptionsTableComponent } from './prescriptions-table/prescriptions-table.component';
import { MedicationDosesTableComponent } from './medication-doses-table/medication-doses-table.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NotesComponent } from './notes/notes.component';
import { NotesTableComponent } from './notes-table/notes-table.component';

@NgModule({
  declarations: [
    AppComponent,
    PrescriptionsTableComponent,
    MedicationDosesTableComponent,
    NotesComponent,
    NotesTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
