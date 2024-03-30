import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginRiderComponent } from './login-rider.component';

describe('LoginRiderComponent', () => {
  let component: LoginRiderComponent;
  let fixture: ComponentFixture<LoginRiderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginRiderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoginRiderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
