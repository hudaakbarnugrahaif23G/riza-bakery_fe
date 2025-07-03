import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subscription, interval } from 'rxjs';
import { ApiService } from '../services/api.service';
import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { AfterViewInit } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit, AfterViewInit  {
  userName: string = 'User';
  role: string = '';
  materials: any[] = [];
  fgs: any[] = [];
  efficiencyChart: any;
  qcChart: any;

  private refreshSub!: Subscription;
  constructor(
    private router: Router, 
    private http: HttpClient,
    private api: ApiService
  ) {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.userName = user.name || 'User';
    this.role = user.role || '';

    const token = localStorage.getItem('access_token');
    if (!token) {
      this.router.navigateByUrl('/login', { replaceUrl: true });
    }
  }

  ionViewDidEnter() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.userName = user.name || 'User';
    this.role = user.role || '';

    if (this.role === 'gudang') {
  this.loadMaterials();
  this.loadFinishGoods();
  this.refreshSub = interval(5000).subscribe(() => {
    this.loadMaterials();
    this.loadFinishGoods();
  });
} else if (this.role === 'produksi') {
  setTimeout(() => this.loadEfficiencyData(), 500); // agar canvas sudah render
}
if (this.role === 'produksi') {
  this.loadEfficiencyData();
  this.refreshSub = interval(5000).subscribe(() => {
    this.loadEfficiencyData();
  });
} else if (this.role === 'qc') {
  this.loadQcPieData();
  this.refreshSub = interval(5000).subscribe(() => {
    this.loadQcPieData();
  });
}


  }

  loadMaterials() {
    this.api.get<any>('material/get_data_raw')
      .subscribe({
        next: (res) => {
          if (res.success) {
            this.materials = res.data;
          }
        },
        error: (err) => {
          console.error('Failed to load materials', err);
        }
      });
  }

  loadFinishGoods() {
    this.api.get<any>('material/get_data_finish_good')
      .subscribe({
        next: (res) => {
          if (res.success) {
            this.fgs = res.data;
          }
        },
        error: (err) => {
          console.error('Failed to load materials', err);
        }
      });
  }

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.userName = user.name || 'User';
  }

 ngOnDestroy() {
  if (this.refreshSub) {
    this.refreshSub.unsubscribe();
  }
}

ngAfterViewInit(): void {
  if (this.role === 'produksi') {
    this.loadEfficiencyData();
  } else if (this.role === 'qc') {
    this.loadQcPieData();
  }
}
  
 loadEfficiencyData() {
  this.api.get<any[]>('dashboard/efficiency-data').subscribe({
    next: (data) => {
      if (data.length > 0) {
        const line = data[0]; // ambil hanya 1 line (ROTI001)
        const hours = line.hours;
        const ok = line.ok_values;
        const plan = line.plan_values;

        // hitung efisiensi
        const efficiency = plan.map((p: number, i: number) => {
          if (p === 0) return 0;
          return Math.round((ok[i] / p) * 100);
        });

        this.renderEfficiencyChart(hours, efficiency);
      }
    },
    error: (err) => {
      console.error('❌ Gagal ambil data efisiensi:', err);
    }
  });
}

renderEfficiencyChart(labels: string[], values: number[]) {
  const canvas: any = document.getElementById('efficiencyChart');
  if (!canvas) return;

  if (this.efficiencyChart) {
    // update chart
    this.efficiencyChart.data.labels = labels;
    this.efficiencyChart.data.datasets[0].data = values;
    this.efficiencyChart.update();
  } else {
    // buat chart pertama kali
    this.efficiencyChart = new Chart(canvas, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Efisiensi per Jam',
          data: values,
          fill: true,
          tension: 0.4,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          pointBackgroundColor: 'white',
          pointBorderColor: 'rgba(75, 192, 192, 1)'
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            min: 0,
            max: 100,
            title: {
              display: true,
              text: 'Efisiensi (%)'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Jam'
            }
          }
        },
        plugins: {
          legend: { position: 'top' },
          tooltip: {
            mode: 'index',
            intersect: false
          }
        }
      }
    });
  }
}


loadQcPieData() {
  this.api.get<any>('dashboard-quality').subscribe({
    next: (res) => {
      if (res.success) {
        const ok = res.data.ok || 0;
        const ng = res.data.ng || 0;
        this.renderQcPieChart(ok, ng);
      }
    },
    error: (err) => {
      console.error('❌ Gagal ambil data QC:', err);
    }
  });
}

renderQcPieChart(ok: number, ng: number) {
  const canvas = document.getElementById('qcPieChart') as HTMLCanvasElement;
  if (!canvas) return;

  if (this.qcChart) {
    this.qcChart.data.datasets[0].data = [ok, ng];
    this.qcChart.update();
  } else {
    this.qcChart = new Chart(canvas, {
      type: 'pie',
      data: {
        labels: ['OK', 'NG'],
        datasets: [{
          data: [ok, ng],
          backgroundColor: ['#28a745', '#dc3545'],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'top' },
          tooltip: {
            callbacks: {
              label: (context) => {
                const label = context.label || '';
                const value = context.raw || 0;
                return `${label}: ${value} pcs`;
              }
            }
          }
        }
      }
    });
  }
}

}
