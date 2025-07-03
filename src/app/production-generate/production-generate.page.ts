import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-production-generate',
  templateUrl: './production-generate.page.html',
  styleUrls: ['./production-generate.page.scss'],
  standalone: false,
})
export class ProductionGeneratePage implements OnInit {
  productionForm: FormGroup;
  materials: any[] = [];
  selectedLine: any;

  // simpan query param
  line_id: string | null = null;
  shift_id: string | null = null;
  date: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
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
    this.route.queryParams.subscribe(params => {
      this.line_id = params['line_id'];
      this.shift_id = params['shift_id'];
      this.date = params['date'];

      const user = JSON.parse(localStorage.getItem('user') || '{}');

      // Set PIC & tanggal
      this.productionForm.patchValue({
        date: this.date,
        pic: user.name || ''
      });

      // Ambil shift
      if (this.shift_id) {
        this.api.get<any>('shift/get_data').subscribe({
          next: (res) => {
            const shifts = res.data ?? [];
            const selectedShift = shifts.find((s: any) => s.id == this.shift_id);
            if (selectedShift) {
              this.productionForm.patchValue({
                shift: selectedShift.name
              });
            }
          },
          error: (err) => {
            console.error('Gagal ambil data shift:', err);
          }
        });
      }

      // Ambil line
      if (this.line_id) {
        this.api.get<any>('line/get_data').subscribe({
          next: (res) => {
            const lines = res.data ?? [];
            const selectedLine = lines.find((l: any) => l.id == this.line_id);
            if (selectedLine) {
              this.selectedLine = selectedLine;
              this.productionForm.patchValue({
                cycle_time: selectedLine.cycle_time ?? '',
                target: selectedLine.target ?? '',
                line: selectedLine.line_name ?? ''
              });
            }
          },
          error: (err) => {
            console.error('Gagal ambil data line:', err);
          }
        });
      }

      // Ambil data material
      this.getMaterialFinishGoodData();
    });
  }

  submitProduction() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    if (!this.line_id || !this.shift_id || !this.date || !this.selectedLine?.material_id) {
      console.error('❌ Data tidak lengkap untuk submit');
      return;
    }

    const body = {
      shift_id: this.shift_id,
      date: this.date,
      line_id: this.line_id,
      user_id: user.id,
      material_id: this.selectedLine.material_id,
    };

    this.api.post<any>('production/generate', body).subscribe({
      next: (res) => {
        if (res.success) {
          this.router.navigate(['/tabs/input/production-edit'], {
            queryParams: {
              line_id: this.line_id,
              shift_id: this.shift_id,
              date: this.date
            }
          });
        } else {
          console.error('Gagal generate production:', res);
        }
      },
      error: (err) => {
        console.error('Error saat kirim data:', err);
      }
    });
  }

  goBack() {
    this.location.back();
  }

  getMaterialFinishGoodData() {
    this.api.get<any>('material/get_data_finish_good').subscribe({
      next: (res) => {
        this.materials = res.data ?? res;
      },
      error: (err) => {
        console.error('Gagal mengambil data material:', err);
      }
    });
  }
}
