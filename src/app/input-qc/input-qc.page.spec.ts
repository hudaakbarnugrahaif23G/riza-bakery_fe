import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputQcPage } from './input-qc.page';

describe('InputQcPage', () => {
  let component: InputQcPage;
  let fixture: ComponentFixture<InputQcPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InputQcPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
