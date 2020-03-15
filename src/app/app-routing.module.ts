import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './public/login/login.component';
import { DashboardComponent } from './public/dashboard/dashboard.component';
import { AuthGuard } from './cores/guards/auth.guard';
import { DataComponent } from './demo/data/data.component';
import { RegionalComponent } from './public/regional/regional.component';
import { DivisionComponent } from './public/division/division.component';
import { MeterOfficeComponent } from './public/meter-office/meter-office.component';
import { CreateLeagerbookComponent } from './public/create-leagerbook/create-leagerbook.component';
import { PageComponent } from './public/page/page.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  { path: 'demo', component: DataComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'regional', component: RegionalComponent, canActivate: [AuthGuard] },
  { path: 'division', component: DivisionComponent, canActivate:[AuthGuard] },
  { path: 'meter-office', component: MeterOfficeComponent, canActivate:[AuthGuard] },
  { path: 'create-leagerbook', component: CreateLeagerbookComponent, canActivate:[AuthGuard] },
  { path: 'page/:id', component: PageComponent, canActivate:[AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
