import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/components/login.component';
import { AuthGuard } from './services/auth-guard';
import { UserResolver } from './services/user.resolver';
import { SampleResolver } from './services/sample.resolver';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard', // lazy loading su standalone component
    loadComponent: () =>
    import('./dashboard/components/dashboard.component').then(m => m.DashboardComponent),
    canActivate: [AuthGuard],
    resolve: { user: UserResolver },
    children: [
      {
        path: "cards",
        loadComponent: () =>
          import('./dashboard/cards/components/cards.component').then(m => m.CardsComponent),
          canActivate: [AuthGuard],
      },
      {
        path: "samples",
        loadComponent: () =>
          import('./dashboard/samples/components/sample.component').then(m => m.SampleComponent),
          canActivate: [AuthGuard],
          resolve: { sample: SampleResolver },
      }
    ]
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }