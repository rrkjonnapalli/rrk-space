import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextShareMainComponent } from './text-share-main.component';

describe('TextShareMainComponent', () => {
  let component: TextShareMainComponent;
  let fixture: ComponentFixture<TextShareMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextShareMainComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TextShareMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
