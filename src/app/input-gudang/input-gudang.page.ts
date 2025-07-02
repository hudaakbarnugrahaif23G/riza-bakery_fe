import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiService } from '../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-input-gudang',
  templateUrl: './input-gudang.page.html',
  styleUrls: ['./input-gudang.page.scss'],
  standalone: false,
})
export class InputGudangPage implements OnInit {
  materials: any[] = [];
  fgs: any[] = [];
  selectedMaterialId: number | null = null;
  stockIn: number | null = null;
  stockOut: number | null = null;
  destination: string = '';

  constructor(
    private http: HttpClient,
    private api: ApiService,
    private toastr: ToastrService,
    private toastController: ToastController
  ) {}

  async showToast(message: string, color: string = 'success') {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
      position: 'top'
    });
    await toast.present();
  }

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

      this.api.get<any>('material/get_data_finish_good')
      .subscribe({
        next: (res) => {
          if (res.success) {
            this.fgs = res.data;
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
      stock: this.stockIn,
      status: 'in',
      user_id: JSON.parse(localStorage.getItem('user') || '{}').id,
    };

    this.api.post<any>('material/store', body).subscribe({
      next: (res) => {
        if (res.success) {
          console.log('Stok berhasil ditambahkan:', res);
          this.toastr.success('Stok berhasil ditambahkan', 'Sukses');
          this.showToast('Stok berhasil ditambahkan', 'success');

          // Reset form
          this.selectedMaterialId = null;
          this.stockIn = null;
        } else {
          console.error('Gagal menambahkan stok:', res);
          this.toastr.error('Gagal menambahkan stok', 'Gagal');
        }
      },
      error: (err) => {
        console.error('Terjadi kesalahan saat submit:', err);
        this.toastr.error('Terjadi kesalahan saat submit', 'Error');
      }
    });
  }

  submitDelivery() {
    if (!this.selectedMaterialId || !this.stockOut || this.stockOut <= 0) {
      console.warn('Material dan stock harus diisi dengan benar.');
      return;
    }

    const body = {
      material_id: this.selectedMaterialId,
      quantity: this.stockOut,
      destination: this.destination,
      status: 'out',
      user_id: JSON.parse(localStorage.getItem('user') || '{}').id,
    };

    this.api.post<any>('distribution/store', body).subscribe({
      next: (res) => {
        if (res.success) {
          console.log('Produk berhasil dikirim:', res);
          this.toastr.success('Produk berhasil dikirim', 'Sukses');
          this.showToast('Produk berhasil dikirim', 'success');

          // Reset form
          this.selectedMaterialId = null;
          this.stockOut = null;
          this.destination = '';
        } else {
          console.error('Gagal menambahkan stok:', res);
          this.toastr.error('Gagal menambahkan stok', 'Gagal');
        }
      },
      error: (err) => {
        console.error('Terjadi kesalahan saat submit:', err);
        this.toastr.error('Terjadi kesalahan saat submit', 'Error');
      }
    });
  }

  ngOnInit() {
  }

}
