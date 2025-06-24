import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.page.html',
  styleUrls: ['./input.page.scss'],
  standalone: false,
})
export class InputPage implements OnInit {
  productionForm: FormGroup;
  isSuccessModalOpen = false;
  charCount = 0;
  selectedDate: string = new Date().toISOString();
  shifts: any[] = [];
  lines: any[] = [];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private api: ApiService
  ) {
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

  ngOnInit() {
    const token = localStorage.getItem('access_token');
    if (!token) {
      this.router.navigateByUrl('/login');
      return;
    }

    this.getShiftData();
    this.getLines(); 
  }

  getShiftData() {
    this.api.get<any>('shift/get_data').subscribe({
      next: (res) => {
        this.shifts = res.data ?? res;
      },
      error: (err) => {
        console.error('Gagal mengambil data shift:', err);
      }
    });
  }

  getLines() {
    this.api.get<any>('line/get_data').subscribe({
      next: (res) => {
        this.lines = res.data ?? [];
      },
      error: (err) => {
        console.error('Gagal mengambil data line:', err);
      }
    });
  }

  selectLine(lineId: number) {
    this.productionForm.get('productionLine')?.setValue(lineId);
    console.log('Line ID terpilih:', lineId);
  }

  onDateChange(event: any) {
    this.selectedDate = event.detail.value;
    this.productionForm.get('productionDate')?.setValue(this.selectedDate);
    console.log('Selected date:', this.selectedDate);
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

  refreshData() {
    const rawDate = this.productionForm.get('productionDate')?.value;
    const date = new Date(rawDate).toISOString().split('T')[0];
    const shift_id = this.productionForm.get('shift')?.value;
    
    if (!date || !shift_id) {
      alert('Pilih tanggal dan shift terlebih dahulu');
      return;
    }
  
    this.api.post<any>('production/select', { date, shift_id })
      .subscribe({
        next: (res) => {
          this.lines = res.data ?? [];
        },
        error: (err) => {
          console.error('Gagal ambil data:', err);
        }
      });
  }

  navigateLine(line: any) {
    const rawDate = this.productionForm.get('productionDate')?.value;
    const date = new Date(rawDate).toISOString().split('T')[0];
    const shift_id = this.productionForm.get('shift')?.value;
    
    if (line.exists) {
      // Edit Production Data
      this.router.navigate(['/tabs/input/production-edit', {
        line_id: line.id,
        shift_id,
        date
      }]);
    } else {
      // Generate Production Data
      this.router.navigate(['/tabs/input/production-generate', {
        line_id: line.id,
        shift_id,
        date
      }]);
    }
  }
}
