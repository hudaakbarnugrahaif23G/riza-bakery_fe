import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QualityEntryPage } from './quality-entry.page';

describe('QualityEntryPage', () => {
  let component: QualityEntryPage;
  let fixture: ComponentFixture<QualityEntryPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(QualityEntryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
