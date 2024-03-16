import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDiskSideBComponent } from './user-disk-side-b.component';

describe('UserDiskSideBComponent', () => {
  let component: UserDiskSideBComponent;
  let fixture: ComponentFixture<UserDiskSideBComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserDiskSideBComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserDiskSideBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
