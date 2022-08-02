import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree,Router  } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccesosGuard implements CanActivate {
  usuarioActualLocal:any=[]
  constructor(private router: Router){


  }

  canActivate(): boolean {
    let currentUser = JSON.parse(localStorage.getItem('usuario')!);


    if (currentUser[0]?.Rol===1) {
      return true;
    } else {
      this.router.navigate(['/crear-venta']);
      return false;
    }
  }

}
