import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProgramPresentationComponent } from './user-program-presentation.component';

describe('UserProgramPresentationComponent', () => {
  let component: UserProgramPresentationComponent;
  let fixture: ComponentFixture<UserProgramPresentationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserProgramPresentationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserProgramPresentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
