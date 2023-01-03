import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OthersComponent } from './components/others/others.component';
import { PeopleComponent } from './components/people/people.component';
import { PicoPreviewComponent } from './components/pico-preview/pico-preview.component';
import { ProductsComponent } from './components/products/products.component';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: 'products', component: ProductsComponent },
  { path: 'person', component: PeopleComponent },
  { path: 'pico-preview', component: PicoPreviewComponent },
  { path: 'others', component: OthersComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
