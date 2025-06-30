import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-input-gudang',
  templateUrl: './input-gudang.page.html',
  styleUrls: ['./input-gudang.page.scss'],
  standalone: false,
})
export class InputGudangPage implements OnInit {
  materials: any[] = [];
  selectedMaterialId: number | null = null;
  stockIn: number | null = null;

  constructor(
    private http: HttpClient,
    private api: ApiService
  ) {}

  ionViewDidEnter() {
    this.loadMaterials();
  }

  loadMaterials() {
    this.api.get<any>('material/get_data_raw')
      .subscribe({
        next: (res) => {
          if (res.success) {
            this.materials = res.data;
          } else {
            console.warn('API returned success=false');
          }
        },
        error: (err) => {
          console.error('Failed to load materials', err);
        }
      });
  }

  submit() {
    if (!this.selectedMaterialId || !this.stockIn || this.stockIn <= 0) {
      console.warn('Material dan stock harus diisi dengan benar.');
      return;
    }
  
    const body = {
      material_id: this.selectedMaterialId,
      qty: this.stockIn,
      status: 'in'
    };
  
    this.api.post<any>('materialstock/store', body).subscribe({
      next: (res) => {
        if (res.success) {
          console.log('Stok berhasil ditambahkan:', res);
          // Reset form atau tampilkan notifikasi
          this.selectedMaterialId = null;
          this.stockIn = null;
        } else {
          console.error('Gagal menambahkan stok:', res);
        }
      },
      error: (err) => {
        console.error('Terjadi kesalahan saat submit:', err);
      }
    });
  }

  ngOnInit() {
  }

}
