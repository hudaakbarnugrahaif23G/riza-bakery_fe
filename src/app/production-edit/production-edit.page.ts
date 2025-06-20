import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-production-edit',
  templateUrl: './production-edit.page.html',
  styleUrls: ['./production-edit.page.scss'],
  standalone: false,
})
export class ProductionEditPage implements OnInit {
  productionForm: FormGroup;

  constructor( 
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private location: Location
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

    // Set shift, date, line
    this.productionForm.patchValue({
      date: date,
      pic: user.name || ''
    });

    // Ambil detail line untuk cycle_time dan target
    const token = localStorage.getItem('access_token');
    const headers = { Authorization: `Bearer ${token}` };

    this.http.get<any>('https://riza-bakery.my.id/api/shift/get_data', { headers }).subscribe({
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

    this.http.get<any>('https://riza-bakery.my.id/api/line/get_data', { headers }).subscribe({
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
  goBack() {
    this.location.back();
  }
}
