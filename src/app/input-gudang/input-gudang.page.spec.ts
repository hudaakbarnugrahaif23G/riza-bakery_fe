import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputGudangPage } from './input-gudang.page';

describe('InputGudangPage', () => {
  let component: InputGudangPage;
  let fixture: ComponentFixture<InputGudangPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InputGudangPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
