import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiderpageComponent } from './riderpage.component';

describe('RiderpageComponent', () => {
  let component: RiderpageComponent;
  let fixture: ComponentFixture<RiderpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RiderpageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RiderpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
