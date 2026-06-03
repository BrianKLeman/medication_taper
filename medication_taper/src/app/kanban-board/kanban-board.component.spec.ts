import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KanbanBoardComponent } from './kanban-board.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { GroupsComponent } from '../groups/groups.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { SprintChartComponent } from '../sprint-chart/sprint-chart.component';
import { FormsModule } from '@angular/forms';

describe('KanbanBoardComponent', () => {
  let component: KanbanBoardComponent;
  let fixture: ComponentFixture<KanbanBoardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    declarations: [KanbanBoardComponent, GroupsComponent, SprintChartComponent],
    imports: [MatToolbarModule, MatSlideToggle, MatChipsModule, MatExpansionModule, FormsModule],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
    fixture = TestBed.createComponent(KanbanBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
