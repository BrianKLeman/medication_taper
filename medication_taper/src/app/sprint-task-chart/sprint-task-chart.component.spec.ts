import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintTaskChartComponent } from './sprint-task-chart.component';

describe('SprintTaskChartComponent', () => {
  let component: SprintTaskChartComponent;
  let fixture: ComponentFixture<SprintTaskChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SprintTaskChartComponent]
    });
    fixture = TestBed.createComponent(SprintTaskChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
