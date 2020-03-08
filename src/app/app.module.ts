import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/* Angular Material UI */
import { MaterialModule } from './cores/material/material.module';

/* Database and storage */
import { NgxIndexedDBModule, DBConfig } from 'ngx-indexed-db';
import { DatabaseTables } from './cores/database';
import { LoginComponent } from './public/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './public/dashboard/dashboard.component';
import { NavigationComponent } from './public/share/navigation/navigation.component';
import { UnitSpecificationComponent } from './public/unit-specification/unit-specification.component';

const dbConfig: DBConfig = {
  name: 'moee',
  version: 1,
  objectStoresMeta: DatabaseTables
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    NavigationComponent,
    UnitSpecificationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NgxIndexedDBModule.forRoot(dbConfig),
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
