import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpicDialogComponent } from './epic-dialog.component';

describe('EpicDialogComponent', () => {
  let component: EpicDialogComponent;
  let fixture: ComponentFixture<EpicDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EpicDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EpicDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
