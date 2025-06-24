import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductionEditPage } from './production-edit.page';

describe('ProductionEditPage', () => {
  let component: ProductionEditPage;
  let fixture: ComponentFixture<ProductionEditPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductionEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
