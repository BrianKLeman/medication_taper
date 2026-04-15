import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintChartComponent } from './sprint-chart.component';

describe('SprintChartComponent', () => {
  let component: SprintChartComponent;
  let fixture: ComponentFixture<SprintChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SprintChartComponent]
    });
    fixture = TestBed.createComponent(SprintChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
