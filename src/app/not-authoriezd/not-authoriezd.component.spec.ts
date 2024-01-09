import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotAuthoriezdComponent } from './not-authoriezd.component';

describe('NotAuthoriezdComponent', () => {
  let component: NotAuthoriezdComponent;
  let fixture: ComponentFixture<NotAuthoriezdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotAuthoriezdComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NotAuthoriezdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
