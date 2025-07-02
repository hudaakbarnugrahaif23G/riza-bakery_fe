import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabPage } from './tab.page';

const routes: Routes = [
  {
    path: '',
    component: TabPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'input',
        children: [
          {
            path: '',
            loadChildren: () => import('../input/input.module').then(m => m.InputPageModule)
          },
          {
            path: 'production-generate',
            loadChildren: () => import('../production-generate/production-generate.module').then(m => m.ProductionGeneratePageModule)
          },
          {
            path: 'production-edit',
            loadChildren: () => import('../production-edit/production-edit.module').then(m => m.ProductionEditPageModule)
          },
          {
            path: 'production-entry',
            loadChildren: () => import('../production-entry/production-entry.module').then(m => m.ProductionEntryPageModule)
          },
          {
            path: 'quality-edit',
            loadChildren: () => import('../quality-edit/quality-edit.module').then( m => m.QualityEditPageModule)
          },
          {
            path: 'quality-entry',
            loadChildren: () => import('../quality-entry/quality-entry.module').then( m => m.QualityEntryPageModule)
          },
        ]
      },
      {
        path: 'input_qc',
        children: [
          {
            path: '',
            loadChildren: () => import('../input-qc/input-qc.module').then(m => m.InputQcPageModule)
          },
        ]
      },
      {
        path: 'input_gudang',
        children: [
          {
            path: '',
            loadChildren: () => import('../input-gudang/input-gudang.module').then(m => m.InputGudangPageModule)
          },
        ]
      },
      {
        path: 'riwayat',
        children: [
          {
            path: '',
            loadChildren: () => import('../riwayat/riwayat.module').then(m => m.RiwayatPageModule)
          },
          {
            path: 'production-history',
            loadChildren: () => import('../production-history/production-history.module').then(m => m.ProductionHistoryPageModule)
          }
        ]
      },
      {
        path: 'profile',
        loadChildren: () => import('../profile/profile.module').then(m => m.ProfilePageModule)
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabRoutingModule {}
