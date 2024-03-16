import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPrintLayoutComponent } from './user-print-layout.component';

describe('UserPrintLayoutComponent', () => {
  let component: UserPrintLayoutComponent;
  let fixture: ComponentFixture<UserPrintLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserPrintLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserPrintLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
