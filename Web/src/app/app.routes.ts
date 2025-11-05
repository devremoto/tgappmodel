import { Routes } from '@angular/router';
import { IndexComponent } from './layout/index/index.component';
import { HomeComponent } from './pages/home/home.component';
import { ContactComponent } from './pages/contact/contact';
import { AboutComponent } from './pages/about/about.component';
import { AuthCanActivateGuard } from './auth/auth-can-activate.guard';
import { AppSettingsComponent } from './admin/adminPages/app-settings/app-settings.component';
import { DashboardComponent } from './admin/adminPages/dashboard/dashboard.component';

export const routes: Routes = [{
    path: '',
    component: IndexComponent,
    children: [
        { path: '', component: HomeComponent },
        { path: 'home', component: HomeComponent },
        { path: 'contact', component: ContactComponent },
        { path: 'contato', component: ContactComponent },
        { path: 'about', component: AboutComponent },
        { path: 'quemsomos', component: AboutComponent },

    ],
},
{ path: 'admin', loadChildren: () => import('./admin/admin-routing.module').then(m => m.AdminRoutingModule) },
{ path: '', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
];

