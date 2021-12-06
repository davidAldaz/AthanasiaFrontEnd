import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSidenavModule } from '@angular/material/sidenav';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { MatTableModule} from '@angular/material/table'
import { MatCardModule} from '@angular/material/card'
import { MatInputModule} from '@angular/material/input'
import { MatButtonModule} from '@angular/material/button'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatToolbarModule} from '@angular/material/toolbar';

//#region Material
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';

//#endregion

import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { JwtInterceptor } from './security/jwt.interceptor';
import { SidenavComponent } from './Components/sidenav/sidenav.component'
import { HeaderComponent } from './Components/header/header.component';
import { ProductViewComponent } from './Components/product-view/product-view.component';
import { NewSaleComponent } from './Components/clientComponents/new-sale/new-sale.component';
import { SaleCompletedComponent } from './Components/clientComponents/sale-completed/sale-completed.component';
import { adminLoginComponent } from './Components/adminComponents/login/admin-login.component';
import { ClientsComponent } from './Components/adminComponents/clients/clients.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    adminLoginComponent,
    ProductViewComponent,
    SidenavComponent,
    HeaderComponent,
    ProductViewComponent,
    NewSaleComponent,
    SaleCompletedComponent,
    ClientsComponent
  ],
  imports: [
    MatDividerModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatToolbarModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor,
    multi: true} 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }