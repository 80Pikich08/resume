import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Selfdev } from './selfdev';

describe('Selfdev', () => {
  let component: Selfdev;
  let fixture: ComponentFixture<Selfdev>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Selfdev]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Selfdev);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
