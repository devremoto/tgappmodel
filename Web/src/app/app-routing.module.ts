import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthCanActivateGuard } from './auth/auth-can-activate.guard';
import { LayoutModule } from './layout/layout.module';

const routes: Routes = [
  { path: '', data: { title: 'Home' }, redirectTo: 'home', pathMatch: 'full' },
  { path: '', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule), canActivate: [AuthCanActivateGuard] },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled', useHash: false, anchorScrolling: 'enabled' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
