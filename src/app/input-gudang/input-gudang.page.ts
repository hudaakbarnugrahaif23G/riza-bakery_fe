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
    console.log('Material ID:', this.selectedMaterialId);
    console.log('Stock In:', this.stockIn);
    // Kirim data POST jika diperlukan
  }

  ngOnInit() {
  }

}
