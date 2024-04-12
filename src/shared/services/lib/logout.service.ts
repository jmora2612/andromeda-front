import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NAVIGATION } from '../../url';


@Injectable({
  providedIn: 'root'
})
export class LogoutService {
  private routerList = `/${NAVIGATION.LOGIN}`;

  constructor(private router: Router) { }

  logout(): void {
    localStorage.clear();
    this.router.navigate([this.routerList]);
  }
}