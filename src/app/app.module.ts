import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSidenavModule } from '@angular/material/sidenav';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { MatTableModule} from '@angular/material/table'
import { MatDialogModule} from '@angular/material/dialog'
import { MatCardModule} from '@angular/material/card'
import { MatInputModule} from '@angular/material/input'
import { MatButtonModule} from '@angular/material/button'
import { MatSnackBarModule} from '@angular/material/snack-bar'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatGridListModule} from '@angular/material/grid-list'; 
import {MatToolbarModule} from '@angular/material/toolbar';

import { NewSaleComponent } from './Components/clientComponents/new-sale/new-sale.component';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NewSaleComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatTableModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatCardModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatToolbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }