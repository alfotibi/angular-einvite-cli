import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserStepperMainComponent } from './user-stepper-main.component';

describe('UserStepperMainComponent', () => {
  let component: UserStepperMainComponent;
  let fixture: ComponentFixture<UserStepperMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserStepperMainComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserStepperMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
