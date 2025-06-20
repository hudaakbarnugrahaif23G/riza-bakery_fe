import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.page.html',
  styleUrls: ['./input.page.scss'],
  standalone: false,
})
export class InputPage {
  productionForm: FormGroup;
  isSuccessModalOpen = false;
  charCount = 0;

  constructor(private fb: FormBuilder) {
    this.productionForm = this.fb.group({
      productionDate: [null, Validators.required],
      shift: [null, Validators.required],
      productionLine: [null, Validators.required],
      productionUnits: [null, [Validators.required, Validators.min(1)]],
      materialUsed: [null, [Validators.required, Validators.min(0.01)]],
      productionStatus: [null, Validators.required],
      processNotes: [''],
      rejectUnits: [null, Validators.required],
      qualityLevel: [null, Validators.required],
    });
  }

  updateCharCount() {
    this.charCount = this.productionForm.get('processNotes')?.value?.length || 0;
  }

  submitForm() {
    if (this.productionForm.valid) {
      console.log('Data:', this.productionForm.value);
      this.isSuccessModalOpen = true;
    }
  }

  closeSuccessModal() {
    this.isSuccessModalOpen = false;
    this.productionForm.reset();
    this.charCount = 0;
  }
}
