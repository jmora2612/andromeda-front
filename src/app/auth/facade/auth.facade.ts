import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Router } from '@angular/router';
import { ILogin, IRegister } from '../../../shared/entitites';
import { NAVIGATION } from '../../../shared/url';
import { UserService } from '../../../shared/services';

@Injectable({
  providedIn: 'root',
})
export class AuthFacade {
  public handleChange$ = new Subject<IRegister>();
  public routerList = `/${NAVIGATION.DASHBOARD}`;

  constructor(
    private _userService: UserService,
    private _snackBar: MatSnackBar,
    private route: Router,
  ) {}

  public login(add: ILogin): void {    
    this._userService.login(add).subscribe({
      next: (el) => {
        this.showMessage(el.message);        
        localStorage.setItem("token", el.data.token);
  
        this.route.navigate([this.routerList]);
        this.handleChange$.next(el.data);
      },
      error: ({ error }) => {
        this.showMessage(error.message);
      },
    });
  }

  public createUser(add: IRegister): void {
    this._userService.add(add).subscribe({
      next: (el) => {
        this.showMessage(el.message);        
        localStorage.setItem("token", el.data.token);
        this.route.navigate([this.routerList]);
        this.handleChange$.next(el.data);
      },
      error: ({ error }) => {
        this.showMessage(error.message);
      },
    });
  }

  public showMessage(message: string) {
    this._snackBar.open(message, 'x', {
      verticalPosition: 'top',
      horizontalPosition: 'right',
    });
  }
}
