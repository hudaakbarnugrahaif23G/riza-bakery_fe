import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
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
    
    // Set shift, date, line
    this.productionForm.patchValue({
      date: date,
      pic: user.name || ''
    });
  
    // Ambil detail shift
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
  
    // Ambil detail line
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
  goBack() {
    this.location.back();
  }
}
