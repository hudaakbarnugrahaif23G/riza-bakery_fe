import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductionGeneratePage } from './production-generate.page';

describe('ProductionGeneratePage', () => {
  let component: ProductionGeneratePage;
  let fixture: ComponentFixture<ProductionGeneratePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductionGeneratePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
