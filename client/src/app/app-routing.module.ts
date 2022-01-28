import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './components/customer/customer.component';
import { HubConnectionsComponent } from './components/hub-connections/hub-connections.component';
import { LoginComponent } from './components/login/login.component';
import { ShopComponent } from './components/shop/shop.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {
    path: '',
    children:[
      {path: 'Shop', component: ShopComponent},
      {path: 'Customer', component: CustomerComponent},
      {path: 'Hub', component: HubConnectionsComponent},
    ]
  },
  {path: '**', component: LoginComponent, pathMatch: 'full'},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
