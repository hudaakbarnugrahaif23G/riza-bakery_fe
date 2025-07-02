import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-production-entry',
  templateUrl: './production-entry.page.html',
  styleUrls: ['./production-entry.page.scss'],
  standalone: false,
})
export class ProductionEntryPage implements OnInit {
  productionForm: FormGroup;

  item_id: string = '';
  line_id: string = '';
  shift_id: string = '';
  date: string = '';
  user: any = {};

  productionItem: any;
  okQty: number = 0;
  ngQty: number = 0;
  note: string = '';
  isSubmitting: boolean = false;

  materialList: any[] = [];
  materialStocks: { material_id: number | null; qty: number }[] = [];

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router
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
        
      console.log('Item ID:', this.item_id);
      this.getProductionData();
    });

    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    
    this.getMaterialList();
  }

  goBack() {
    this.location.back();
  }

  getMaterialList() {
    this.api.get<any>('material/get_data_raw').subscribe({
      next: (res) => {
        this.materialList = res.data ?? [];
      },
      error: (err) => {
        console.error('Gagal ambil material:', err);
      }
    });
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

  addMaterial() {
    this.materialStocks.push({
      material_id: null,
      qty: 0
    });
  }

  removeMaterial(index: number) {
    this.materialStocks.splice(index, 1);
  }

  submit() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    if (!this.productionItem) {
      console.warn('Data produksi belum tersedia.');
      return;
    }

    this.isSubmitting = true;

    const material_stocks = this.materialStocks.map((m) => ({
      material_id: m.material_id,
      qty: m.qty,
      user_id: user.id,
      line_id: this.productionItem.line_id,
      production_data_id: this.productionItem.id,
      status: 'out'
    }));

    const payload = {
      id: this.productionItem.id,
      ok: this.okQty,
      ng: this.ngQty,
      note: this.note || '',
      material_stocks: material_stocks
    };
    console.log('Payload untuk submit:', payload);
    this.api.post<any>('production/entry', payload).subscribe({
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
