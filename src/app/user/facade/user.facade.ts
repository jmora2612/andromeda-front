import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Router } from '@angular/router';
import { IRegister } from '../../../shared/entitites';
import { NAVIGATION } from '../../../shared/url';
import { UserService } from '../../../shared/services';

@Injectable({
  providedIn: 'root',
})
export class UserFacade {
  public handleChange$ = new Subject<IRegister>();
  public routerList = `/${NAVIGATION.DASHBOARD}`;

  constructor(
    private _userService: UserService,
    private _snackBar: MatSnackBar,
    private route: Router
  ) {}

  public createUser(add: IRegister): void {
    this._userService.add(add).subscribe({
      next: (el) => {
        this.showMessage(el.message);
        this.route.navigate([this.routerList]);
        this.handleChange$.next(el.data);
      },
      error: ({ error }) => {
        this.showMessage(error.message);
      },
    });
  }

  public updateUser(id:string, update: IRegister): void {
    this._userService.update(id, update).subscribe({
      next: (el) => {
        this.showMessage(el.message);
        this.route.navigate([this.routerList]);
        this.handleChange$.next(el.data);
      },
      error: ({ error }) => {
        this.showMessage(error.message);
      },
    });
  }

  public loadOne(id: string) {
    return this._userService
      .getUserById(id);
  }

  public showMessage(message: string) {
    this._snackBar.open(message, 'x', {
      verticalPosition: 'top',
      horizontalPosition: 'right',
    });
  }
}
