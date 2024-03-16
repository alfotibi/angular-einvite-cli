import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDiskSideAComponent } from './user-disk-side-a.component';

describe('UserDiskSideAComponent', () => {
  let component: UserDiskSideAComponent;
  let fixture: ComponentFixture<UserDiskSideAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserDiskSideAComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserDiskSideAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
