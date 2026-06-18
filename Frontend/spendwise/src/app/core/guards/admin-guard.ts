import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
export const adminGuard: CanActivateFn = (route, state) => {

  const token = localStorage.getItem('token');
  const router = inject(Router);
 
  if(!token){
    router.navigate(['/login']);
    return false;
  }

  const payload = JSON.parse(atob(token.split(".")[1]));
  const role = payload.role;



  if(role === 'admin'){
    return true;
  }

  router.navigate(['/dashboard']);
  return false;
};
