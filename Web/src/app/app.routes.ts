import { Routes } from '@angular/router';
import { IndexComponent } from './layout/index/index.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [{
    path: '',
    component: HomeComponent,
    children: [{
        path: '',
        component: HomeComponent
    }, {
        path: 'home',
        component: HomeComponent
    }]
}];
