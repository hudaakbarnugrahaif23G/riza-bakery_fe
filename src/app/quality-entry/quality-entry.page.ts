import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-quality-entry',
  templateUrl: './quality-entry.page.html',
  styleUrls: ['./quality-entry.page.scss'],
  standalone: false,
})
export class QualityEntryPage implements OnInit {
  productionItem: any;
  user: any = {};
  judgement: string = '';
  corrective_action: string = '';
  isSubmitting: boolean = false;
  shift_id: string = '';
  date: string = '';
  item_id: string = '';
  line_id: string = '';
  productionForm: FormGroup;

  constructor(
    private location: Location,
    private api: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
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
    this.route.queryParamMap.subscribe((params) => {
      this.item_id = params.get('item_id') || '';
      this.line_id = params.get('line_id') || '';
      this.shift_id = params.get('shift_id') || '';
      this.date = params.get('date') || '';

      this.getProductionData();
    });

    this.user = JSON.parse(localStorage.getItem('user') || '{}');
  }

  getProductionData() {
    const url = `production/get_data?line_id=${this.line_id}&shift_id=${this.shift_id}&date=${this.date}`;
    this.api.get<any>(url).subscribe({
      next: (res) => {
        if (res.success) {
          const item = res.data.find((d: any) => d.id == this.item_id);
          if (item) {
            this.productionItem = item;
            const user = JSON.parse(localStorage.getItem('user') || '{}');

            this.productionForm.patchValue({
              shift: item.shift?.name || '',
              date: item.date,
              plan_qty: item.plan_qty,
              line: item.line?.line_name || '',
              cycle_time: item.line?.cycle_time || '',
              target: item.line?.target || '',
              pic: user.name || '',
            });
          } else {
            console.warn('Data item ID tidak ditemukan.');
          }
        } else {
          console.warn('Gagal ambil data produksi:', res.message);
        }
      },
      error: (err) => {
        console.error('Error ambil data:', err);
      }
    });
  }

  goBack() {
    this.location.back();
  }

  submit() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    if (!this.productionItem) {
      console.warn('Data produksi belum tersedia.');
      return;
    }

    this.isSubmitting = true;

    const payload = {
      production_data_id: this.productionItem.id,
      judgement: this.judgement,
      corrective_action: this.corrective_action,
      user_id: user.id,
    };
    console.log('Payload untuk submit:', payload);
    this.api.post<any>('quality/entry', payload).subscribe({
      next: (res) => {
        this.isSubmitting = false;
        if (res.success) {
          console.log('✅ Data berhasil disubmit:', res);
          this.router.navigate(['/tabs/input/production-edit'], {
            queryParams: {
              line_id: this.productionItem.line_id,
              shift_id: this.shift_id,
              date: this.date
            }
          });
        } else {
          console.warn('❌ Gagal submit:', res.message);
        }
      },
      error: (err) => {
        this.isSubmitting = false;
        console.error('❌ Error submit:', err);
      }
    });
  }
}
