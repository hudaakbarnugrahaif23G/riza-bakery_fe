import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductionHistoryPage } from './production-history.page';

describe('ProductionHistoryPage', () => {
  let component: ProductionHistoryPage;
  let fixture: ComponentFixture<ProductionHistoryPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductionHistoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
