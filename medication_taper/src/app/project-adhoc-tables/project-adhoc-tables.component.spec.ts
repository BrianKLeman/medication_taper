import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectAdhocTablesComponent } from './project-adhoc-tables.component';

describe('ProjectBeatchartsComponent', () => {
  let component: ProjectAdhocTablesComponent;
  let fixture: ComponentFixture<ProjectAdhocTablesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectAdhocTablesComponent]
    });
    fixture = TestBed.createComponent(ProjectAdhocTablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
