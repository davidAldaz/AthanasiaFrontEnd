import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewSaleComponent } from './Components/clientComponents/new-sale/new-sale.component';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { AuthGuard } from './security/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent},
  { path: 'login', component: LoginComponent},
  { path: 'newSale', component: NewSaleComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
