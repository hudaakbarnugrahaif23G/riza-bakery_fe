import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
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
    const line_id = this.route.snapshot.paramMap.get('line_id');
    const shift_id = this.route.snapshot.paramMap.get('shift_id');
    const date = this.route.snapshot.paramMap.get('date');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    
    // Set shift, date, pic
    this.productionForm.patchValue({
      date: date,
      pic: user.name || ''
    });
  
    // Ambil shift
    this.api.get<any>('shift/get_data').subscribe({
      next: (res) => {
        const shifts = res.data ?? [];
        const selectedShift = shifts.find((s: any) => s.id == shift_id);
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
  
    // Ambil line
    this.api.get<any>('line/get_data').subscribe({
      next: (res) => {
        const lines = res.data ?? [];
        const selectedLine = lines.find((l: any) => l.id == line_id);
        if (selectedLine) {
          this.productionForm.patchValue({
            cycle_time: selectedLine.cycle_time,
            target: selectedLine.target,
            line: selectedLine.line_name,
          });
        }
      },
      error: (err) => {
        console.error('Gagal ambil data line:', err);
      }
    });
  }
  
  submitProduction() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
  
    const body = {
      shift_id: this.route.snapshot.paramMap.get('shift_id'),
      date: this.route.snapshot.paramMap.get('date'),
      line_id: this.route.snapshot.paramMap.get('line_id'),
      user_id: user.id
    };
  
    this.api.post<any>('production/generate', body).subscribe({
      next: (res) => {
        if (res.success) {
          this.router.navigate(['/tabs/input/production-edit', {
            line_id: body.line_id,
            shift_id: body.shift_id,
            date: body.date
          }]);
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
}
