import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const canActivateGuard: CanActivateFn = async () => {
  const router = inject(Router)
  const auth = inject(AuthService)

  if (await auth.isAuthenticated())
    return true;
  router.navigate(['login'])
  return false
};

