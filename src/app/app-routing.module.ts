import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './public/login/login.component';
import { DashboardComponent } from './public/dashboard/dashboard.component';
import{ MoneylistTypeComponent } from './public/money-list-type/money-list-type.component';
import { MoneyListTypeEditComponent } from './public/money-list-type-edit/money-list-type-edit.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'money-list-type',component:MoneylistTypeComponent},
  { path: 'money-list-type/edit/:id',component:MoneyListTypeEditComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
