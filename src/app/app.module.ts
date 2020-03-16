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

/* Demo Data */
import { DataComponent } from './demo/data/data.component';
import { SideNavigationComponent } from './public/share/side-navigation/side-navigation.component';
import { NavigationComponent } from './public/share/navigation/navigation.component';
import { RegionalComponent } from './public/regional/regional.component';
import { UnitSpecificationComponent } from './public/unit-specification/unit-specification.component';
import { UnitSpecificationDetailComponent } from './public/unit-specification-detail/unit-specification-detail.component';
import { DivisionComponent } from './public/division/division.component';
import { MeterOfficeComponent } from './public/meter-office/meter-office.component';
import { RegionalPipe } from './pipes/regional.pipe';
import { CreateLeagerbookComponent } from './public/create-leagerbook/create-leagerbook.component';
import { PageComponent } from './public/page/page.component';
import { MoneytypeComponent } from './public/moneytype/moneytype.component';
import { MetertypeComponent } from './public/metertype/metertype.component';
import { AddMeterComponent } from './public/add-meter/add-meter.component';
import { TransformerComponent } from './public/transformer/transformer.component';
import { TransformerDetailComponent } from './public/transformer-detail/transformer-detail.component';

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
    DataComponent,
    SideNavigationComponent,
    NavigationComponent,
    RegionalComponent,
    UnitSpecificationComponent,
    UnitSpecificationDetailComponent,
    DivisionComponent,
    MeterOfficeComponent,
    RegionalPipe,
    CreateLeagerbookComponent,
    PageComponent,
    MoneytypeComponent,
    MetertypeComponent,
    AddMeterComponent,
<<<<<<< HEAD
=======
    TransformerComponent,
    TransformerDetailComponent
>>>>>>> 55cb0ea4e03e81c11aec64ebe52d17d6734b408f
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
