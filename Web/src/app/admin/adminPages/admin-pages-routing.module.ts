import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthCanActivateGuard } from '../../auth/auth-can-activate.guard';
import { AppSettingsComponent } from './app-settings/app-settings.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LanguageEditorComponent } from './language-editor/language-editor.component';
import { ProfileComponent } from './profile/profile.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';

const routes: Routes = [
  { path: '', data: { title: 'Home' }, redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', data: { title: 'Dashboard' }, component: DashboardComponent, canActivate: [AuthCanActivateGuard] },
  { path: 'profile', data: { title: 'Profile' }, component: ProfileComponent, canActivate: [AuthCanActivateGuard] },
  { path: 'language-editor', data: { title: 'Language Editor' }, component: LanguageEditorComponent, canActivate: [AuthCanActivateGuard] },
  {
    path: 'language-settings',
    data: { title: 'Language Settings' },
    component: LanguageEditorComponent,
    canActivate: [AuthCanActivateGuard]
  },
  { path: 'user-settings', data: { title: 'User Settings' }, component: UserSettingsComponent, canActivate: [AuthCanActivateGuard] },
  { path: 'app-settings', data: { title: 'App Settings' }, component: AppSettingsComponent, canActivate: [AuthCanActivateGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPagesRoutingModule {}
