import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Router } from '@angular/router';
import { ILogin, IRegister } from '../../../shared/entitites';
import { NAVIGATION } from '../../../shared/url';
import { UserService } from '../../../shared/services';
import { ParamsHttpPaginateDto, ResponseHttpPaginateDto } from '../../../shared/dtos';

@Injectable({
  providedIn: 'root',
})
export class DashBoardFacade {
  public handleChange$ = new Subject<IRegister>();
  public routerList = `/${NAVIGATION.DASHBOARD}`;

  constructor(
    private _userService: UserService,
    private _snackBar: MatSnackBar,
    private route: Router,
  ) {}

  public updateUser(add: IRegister): void {
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

  public getList(params?: ParamsHttpPaginateDto): Observable<ResponseHttpPaginateDto<IRegister[]>> {
    return this._userService.getUsers(params);
  }

  public showMessage(message: string) {
    this._snackBar.open(message, 'x', {
      verticalPosition: 'top',
      horizontalPosition: 'right',
    });
  }
}
