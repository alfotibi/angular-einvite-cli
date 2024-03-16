import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMainViewComponent } from './admin-main-view.component';

describe('AdminMainViewComponent', () => {
  let component: AdminMainViewComponent;
  let fixture: ComponentFixture<AdminMainViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminMainViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminMainViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
