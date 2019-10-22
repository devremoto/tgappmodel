import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module';
import { IndexComponent } from '../layout/index/index.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact';

export const routes: Routes = [
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

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes), SharedModule, ComponentsModule],
  exports: [RouterModule, SharedModule]
})
export class PagesRoutingModule {}
