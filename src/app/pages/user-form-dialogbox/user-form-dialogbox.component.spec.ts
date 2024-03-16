import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFormDialogboxComponent } from './user-form-dialogbox.component';

describe('UserFormDialogboxComponent', () => {
  let component: UserFormDialogboxComponent;
  let fixture: ComponentFixture<UserFormDialogboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserFormDialogboxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserFormDialogboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
