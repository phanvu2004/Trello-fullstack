import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { canActivateGuard } from './can-activate.guard';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [canActivateGuard]
  },
  {
    path: 'home',
    redirectTo: '',
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: "**",
    component: PageNotFoundComponent
  }
];
