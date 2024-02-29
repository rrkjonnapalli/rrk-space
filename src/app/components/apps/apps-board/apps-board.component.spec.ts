import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppsBoardComponent } from './apps-board.component';

describe('AppsBoardComponent', () => {
  let component: AppsBoardComponent;
  let fixture: ComponentFixture<AppsBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppsBoardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppsBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
