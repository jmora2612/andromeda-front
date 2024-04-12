import { Routes } from '@angular/router';
import { NAVIGATION } from '../shared/url';
import { AuthComponent } from './auth/auth/auth.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { canActivateGuard } from '../shared/guard';
import { UserComponent } from './user/user/user.component';

export const routes: Routes = [
  { path: NAVIGATION.LOGIN, component: AuthComponent },
  {
    path: NAVIGATION.DASHBOARD,
    canActivate: [canActivateGuard],
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
    ],
  },
  {
    path: '',
    canActivate: [canActivateGuard],
    children: [
      {
        path: NAVIGATION.ADD_USER,
        component: UserComponent,
      },
      {
        path: NAVIGATION.EDIT_USER+'/:id',
        component: UserComponent,
      },
    ],
  },
  { path: '**', redirectTo: 'dashboard', pathMatch: 'full' }, // Redirigir a dashboard por defecto
];
