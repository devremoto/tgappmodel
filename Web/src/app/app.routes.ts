import { Routes } from '@angular/router';
import { IndexComponent } from './layout/index/index.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [{
    path: '',
    component: IndexComponent,
},
{
    path: 'pages',
    loadChildren: () => import('./pages/pages-routing.module').then(m => m.PagesRoutingModule),
},

]

