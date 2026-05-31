import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LinkTaskToComponent } from './link-task-to.component';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';

describe('LinkTaskToComponent', () => {
  let component: LinkTaskToComponent;
  let fixture: ComponentFixture<LinkTaskToComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LinkTaskToComponent],      
      imports: [MatDialogModule, FormsModule],
      providers:[
       {
          provide: MAT_DIALOG_DATA,
          useValue: { noteIDs : [1]}
        }]
    });
    fixture = TestBed.createComponent(LinkTaskToComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
