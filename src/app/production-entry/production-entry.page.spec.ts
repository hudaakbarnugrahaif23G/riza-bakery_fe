import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductionEntryPage } from './production-entry.page';

describe('ProductionEntryPage', () => {
  let component: ProductionEntryPage;
  let fixture: ComponentFixture<ProductionEntryPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductionEntryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
