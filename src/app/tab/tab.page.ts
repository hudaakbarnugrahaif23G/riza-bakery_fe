import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.page.html',
  styleUrls: ['./tab.page.scss'],
  standalone: false,
})
export class TabPage implements OnInit {
  inputHref: string | null = null;
  inputLabel: string | null = null;
  role: string = '';
  constructor() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.role = user.role || '';
    if (user.role === 'produksi') {
      this.inputHref = '/tabs/input';
      this.inputLabel = 'Input Produksi';
    } else if (user.role === 'qc') {
      this.inputHref = '/tabs/input_qc';
      this.inputLabel = 'Input QC';
    } else if (user.role === 'gudang') {
      this.inputHref = '/tabs/input_gudang';
      this.inputLabel = 'Input Gudang';
    } else {
      // Tidak ada tab input
      this.inputHref = null;
      this.inputLabel = null;
    }
  }

  ngOnInit() {
  }

}
