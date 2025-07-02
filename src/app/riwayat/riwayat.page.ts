import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-riwayat',
  templateUrl: './riwayat.page.html',
  styleUrls: ['./riwayat.page.scss'],
  standalone: false,
})
export class RiwayatPage implements OnInit {
  userName: string = 'User';
  role: string = '';
  productionData: any[] = [];
  qualityData: any[] = [];
  gudangData: any[] = [];

  constructor(
    private api: ApiService
  ) { 
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.userName = user.name || 'User';
    this.role = user.role || '';
  }

  ngOnInit() {
    this.getProductionData();
    this.getQualityData();
  }

  getProductionData() {
    this.api.get<any>('production/history').subscribe({
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

  getQualityData() {
    this.api.get<any>('quality/history').subscribe({
      next: (res) => {
        if (res.success) {
          this.qualityData = res.data;
        } else {
          console.warn('Gagal ambil data quality:', res.message);
        }
      },
      error: (err) => {
        console.error('Error ambil data quality:', err);
      }
    });

    this.api.get<any>('material/history').subscribe({
      next: (res) => {
        if (res.success) {
          this.gudangData = res.data;
        } else {
          console.warn('Gagal ambil data gudang:', res.message);
        }
      },
      error: (err) => {
        console.error('Error ambil data gudang:', err);
      }
    });
  }
}
