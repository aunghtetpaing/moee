import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './public/login/login.component';
import { DashboardComponent } from './public/dashboard/dashboard.component';
import { AuthGuard } from './cores/guards/auth.guard';
import { DataComponent } from './demo/data/data.component';
import { RegionalComponent } from './public/regional/regional.component';
import { UnitSpecificationComponent } from './public/unit-specification/unit-specification.component';
import { UnitSpecificationDetailComponent } from './public/unit-specification-detail/unit-specification-detail.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  { path: 'demo', component: DataComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'regional', component: RegionalComponent, canActivate: [AuthGuard] },
  { path: 'unit-specification', component: UnitSpecificationComponent, canActivate: [AuthGuard] },
  { path: 'unit-specification-detail/:id', component: UnitSpecificationDetailComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
