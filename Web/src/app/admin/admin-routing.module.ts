import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthCanActivateGuard } from '../auth/auth-can-activate.guard';
import { AdminLayoutModule } from './_layout/admin-layout.module';
import { IndexComponent } from './_layout/index/index.component';
import { AppSettingsComponent } from './adminPages/app-settings/app-settings.component';
import { DashboardComponent } from './adminPages/dashboard/dashboard.component';
import { ContactIndexComponent } from './_generated/Contact/ContactIndex.component';
import { LanguageSettingsComponent } from './adminPages/language-settings/language-settings.component';
import { LanguageEditorComponent } from './adminPages/language-editor/language-editor.component';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    canActivate: [AuthCanActivateGuard],
    children: [
      { path: 'app-settings', component: AppSettingsComponent, canActivate: [AuthCanActivateGuard], },
      { path: 'language-settings', component: LanguageSettingsComponent, canActivate: [AuthCanActivateGuard], },
      { path: 'language-editor', component: LanguageEditorComponent, canActivate: [AuthCanActivateGuard], },
      { path: 'dashboard', component: DashboardComponent, canActivate: [AuthCanActivateGuard], },
      { path: 'contact', component: ContactIndexComponent, canActivate: [AuthCanActivateGuard], },
      {
        path: '',
        loadChildren: () => import('./generated').then(m => m.GeneratedAdminModule),
        canActivate: [AuthCanActivateGuard],
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes), AdminLayoutModule],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
