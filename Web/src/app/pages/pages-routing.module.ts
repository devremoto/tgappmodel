import { Routes } from '@angular/router';
import { IndexComponent } from '../layout/index/index.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'home', component: HomeComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'contato', component: ContactComponent },
      { path: 'about', component: AboutComponent },
      { path: 'quemsomos', component: AboutComponent }
    ]
  }
];
