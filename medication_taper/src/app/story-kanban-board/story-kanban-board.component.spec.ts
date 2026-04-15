import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryKanbanBoardComponent } from './story-kanban-board.component';

describe('StoryKanbanBoardComponent', () => {
  let component: StoryKanbanBoardComponent;
  let fixture: ComponentFixture<StoryKanbanBoardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StoryKanbanBoardComponent]
    });
    fixture = TestBed.createComponent(StoryKanbanBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
