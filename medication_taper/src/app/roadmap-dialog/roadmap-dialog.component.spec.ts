import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoadmapDialogComponent } from './roadmap-dialog.component';

describe('RoadmapDialogComponent', () => {
  let component: RoadmapDialogComponent;
  let fixture: ComponentFixture<RoadmapDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoadmapDialogComponent]
    });
    fixture = TestBed.createComponent(RoadmapDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
