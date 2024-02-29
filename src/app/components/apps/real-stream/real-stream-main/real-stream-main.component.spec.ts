import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealStreamMainComponent } from './real-stream-main.component';

describe('RealStreamMainComponent', () => {
  let component: RealStreamMainComponent;
  let fixture: ComponentFixture<RealStreamMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RealStreamMainComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RealStreamMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
