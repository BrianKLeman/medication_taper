import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectAdhocTablesComponent } from './project-adhoc-tables.component';
import { FormsModule } from '@angular/forms';

describe('ProjectBeatchartsComponent', () => {
  let component: ProjectAdhocTablesComponent;
  let fixture: ComponentFixture<ProjectAdhocTablesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectAdhocTablesComponent],
      imports: [FormsModule]
    });
    fixture = TestBed.createComponent(ProjectAdhocTablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
