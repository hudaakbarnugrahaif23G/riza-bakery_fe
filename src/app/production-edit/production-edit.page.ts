import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-production-edit',
  templateUrl: './production-edit.page.html',
  styleUrls: ['./production-edit.page.scss'],
  standalone: false,
})
export class ProductionEditPage implements OnInit {
  productionForm: FormGroup;
  productionData: any[] = [];
  line_id: string = '';
  shift_id: string = '';
  date: string = '';

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private location: Location,
    private api: ApiService
  ) {
    this.productionForm = this.fb.group({
      shift: [''],
      date: [''],
      line: [''],
      pic: [''],
      cycle_time: [''],
      target: [''],
    });
  }

  ngOnInit() {
    // Ambil dari queryParams (bukan paramMap)
    this.route.queryParams.subscribe(params => {
      this.line_id = params['line_id'] || '';
      this.shift_id = params['shift_id'] || '';
      this.date = params['date'] || '';

      this.loadAllData();
    });
  }

  loadAllData() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    // Set form awal
    this.productionForm.patchValue({
      date: this.date,
      pic: user.name || '',
    });

    // Get shift info
    this.api.get<any>('shift/get_data').subscribe({
      next: (res) => {
        const selected = res.data?.find((s: any) => s.id == this.shift_id);
        if (selected) {
          this.productionForm.patchValue({ shift: selected.name });
        }
      },
      error: (err) => console.error('Gagal ambil shift:', err),
    });

    // Get line info
    this.api.get<any>('line/get_data').subscribe({
      next: (res) => {
        const selected = res.data?.find((l: any) => l.id == this.line_id);
        if (selected) {
          this.productionForm.patchValue({
            cycle_time: selected.cycle_time,
            target: selected.target,
            line: selected.line_name,
          });
        }
      },
      error: (err) => console.error('Gagal ambil line:', err),
    });

    // Get data produksi
    this.getProductionData();
  }

  getProductionData() {
    const params = `?line_id=${this.line_id}&shift_id=${this.shift_id}&date=${this.date}`;
    this.api.get<any>('production/get_data' + params).subscribe({
      next: (res) => {
        if (res.success) {
          this.productionData = res.data;
        } else {
          console.warn('Gagal ambil data produksi:', res.message);
        }
      },
      error: (err) => {
        console.error('Error ambil data produksi:', err);
      }
    });
  }

  goBack() {
    this.location.back();
  }
}
