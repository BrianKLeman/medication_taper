/* Angular imports */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips'
import {MatExpansionModule} from '@angular/material/expansion';
import {MatMenuModule} from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { MatTreeModule } from '@angular/material/tree';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
/* Homemade imports*/
import { AppComponent } from './app.component';
import { PrescriptionsTableComponent } from './prescriptions-table/prescriptions-table.component';
import { MedicationDosesTableComponent } from './medication-doses-table/medication-doses-table.component';
import { NotesComponent } from './notes/notes.component';
import { NotesTableComponent } from './notes-table/notes-table.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthHttpInterceptorService } from './auth-http-interceptor.service';
import { AuthDialogComponent } from './auth-dialog/auth-dialog.component';
import { ProjectsTableComponent } from './projects-table/projects-table.component';
import { LearningAimsTableComponent } from './learning-aims-table/learning-aims-table.component';
import { SleepsTableComponent } from './sleeps-table/sleeps-table.component';
import { PhenomenaTableComponent } from './phenomena-table/phenomena-table.component';
import { LinkNoteToComponent } from './link-note-to/link-note-to.component';
import { AppointmentsComponent } from './appointments-table/appointments-table.component';
import { JobsAtHomeComponent } from './jobs-at-home/jobs-at-home.component';
import { KanbanBoardComponent } from './kanban-board/kanban-board.component';
import { ShoppingBoardComponent } from './shopping-board/shopping-board.component';
import { TaskFormComponent } from './task-form/task-form.component';
import { LinkTaskToComponent } from './link-task-to/link-task-to.component';
import { SleepsFormComponent } from './sleeps-form/sleeps-form.component';
import { AlcoholTableComponent } from './alcohol-table/alcohol-table.component';
import { GroupPipe } from './group-pipe.pipe';
import { GroupsComponent } from './groups/groups.component';
import { ReferenceInformationComponent } from './reference-information/reference-information.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { AdhocTablesComponent } from './adhoc-tables/adhoctables.component';
import { ProjectAdhocTablesComponent } from './project-adhoc-tables/project-adhoc-tables.component';
import { AddMedicationComponent } from './add-medication/add-medication.component';
import { FoodDiaryComponent } from './food-diary/food-diary.component';
import { SprintChartComponent } from './sprint-chart/sprint-chart.component';
import { BacklogComponent } from './backlog/backlog.component';
import { EpicEditComponent } from './epic-edit/epic-edit.component';
import { RoadmapEditComponent } from './roadmap-edit/roadmap-edit.component';
import { TaskEditComponent } from './task-edit/task-edit.component';
import { SubTasksEditComponent } from './sub-tasks-edit/sub-tasks-edit.component';
import { SubTasksFormComponent } from './sub-tasks-form/sub-tasks-form.component';
import { StoryKanbanBoardComponent } from './story-kanban-board/story-kanban-board.component';
import { SprintTaskChartComponent } from './sprint-task-chart/sprint-task-chart.component';
import { RoadmapDialogComponent } from './roadmap-dialog/roadmap-dialog.component'
import { EpicDialogComponent } from './epic-dialog/epic-dialog.component';
/* Register Module */
@NgModule({ declarations: [
        AppComponent,
        PrescriptionsTableComponent,
        MedicationDosesTableComponent,
        NotesComponent,
        NotesTableComponent,
        AuthDialogComponent,
        ProjectsTableComponent,
        LearningAimsTableComponent,
        SleepsTableComponent,
        PhenomenaTableComponent,
        LinkNoteToComponent,
        AppointmentsComponent,
        JobsAtHomeComponent,
        KanbanBoardComponent,
        ShoppingBoardComponent,
        TaskFormComponent,
        LinkTaskToComponent,
        SleepsFormComponent,
        AlcoholTableComponent,
        GroupPipe,
        GroupsComponent,
        ReferenceInformationComponent,
        AppointmentComponent,
        AdhocTablesComponent,
        ProjectAdhocTablesComponent,
        AddMedicationComponent,
        FoodDiaryComponent,
        SprintChartComponent,
        BacklogComponent,
        EpicEditComponent,
        RoadmapEditComponent,
        TaskEditComponent,
        SubTasksEditComponent,
        SubTasksFormComponent,
        StoryKanbanBoardComponent,
        SprintTaskChartComponent,
        RoadmapDialogComponent,
        EpicDialogComponent
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        MatDialogModule,
        MatToolbarModule,
        MatIconModule,
        FormsModule,
        MatTabsModule,
        MatCardModule,
        MatChipsModule,
        MatExpansionModule,
        ReactiveFormsModule,
        MatMenuModule,
        MatSlideToggleModule,
        MatTreeModule,
        MatDividerModule,
        MatButtonModule], providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptorService, multi: true },
        provideHttpClient(withInterceptorsFromDi())
    ] })
export class AppModule { }
