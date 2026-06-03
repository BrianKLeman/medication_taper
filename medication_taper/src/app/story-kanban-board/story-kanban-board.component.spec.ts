import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryKanbanBoardComponent } from './story-kanban-board.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSlideToggle, MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormsModule } from '@angular/forms';
import { GroupsComponent } from '../groups/groups.component';
import { SprintTaskChartComponent } from '../sprint-task-chart/sprint-task-chart.component';

describe('StoryKanbanBoardComponent', () => {
  let component: StoryKanbanBoardComponent;
  let fixture: ComponentFixture<StoryKanbanBoardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StoryKanbanBoardComponent, GroupsComponent, SprintTaskChartComponent],
      imports: [MatToolbarModule, MatSlideToggle, MatChipsModule, MatExpansionModule, FormsModule],
    });
    fixture = TestBed.createComponent(StoryKanbanBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
