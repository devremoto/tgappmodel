import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthCanActivateGuard } from '../auth/auth-can-activate.guard';
import { AdminLayoutModule } from './_layout/admin-layout.module';
import { IndexComponent } from './_layout/index/index.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'admin',
    data: { title: 'Admin' },
    component: IndexComponent,
    canActivate: [AuthCanActivateGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./adminPages/admin-pages.module').then(m => m.AdminPagesModule),
        canActivate: [AuthCanActivateGuard]
      },
      { path: '', loadChildren: () => import('./generated').then(m => m.GeneratedAdminModule), canActivate: [AuthCanActivateGuard] }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), AdminLayoutModule],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
