import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QualityEditPage } from './quality-edit.page';

describe('QualityEditPage', () => {
  let component: QualityEditPage;
  let fixture: ComponentFixture<QualityEditPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(QualityEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
