import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LogoutService, UserService } from '../../../shared/services';
import { NAVIGATION } from '../../../shared/url';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { UserFacade } from '../facade/user.facade';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
    MatSnackBarModule,
    MatIconModule,
    MatButton,
  ],
  providers: [UserService, LogoutService, UserFacade],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent implements OnInit {
  public routerList = `/${NAVIGATION.DASHBOARD}`;
  public addForm: FormGroup;
  public hidePassword = true;
  public userId: string | null | undefined;
  public isNewRecord = true;
  constructor(
    private route: Router,
    private userFacade: UserFacade,
    private logoutService: LogoutService,
    private formBuilder: FormBuilder,
    private _route: ActivatedRoute,
  ) {

    this.addForm = this.formBuilder.group({
      name: ['', [this.userId ? [] :Validators.required]],
      phone: [
        '',
        [this.userId ? [] :
          Validators.required,
          Validators.pattern('^[0-9]+$'),
          Validators.maxLength(11),
          Validators.minLength(11),
        ],
      ],
      email: ['', [this.userId ? [] :Validators.required, Validators.email]],
      password: ['', this.userId ? [] : Validators.required]
    });

  }
  
  ngOnInit(): void {
    this.userId = this._route.snapshot.paramMap.get('id');    
    if (this.userId) {
      this.isNewRecord = false;
      this.loadDefaultData(this.userId);
    }
  }

  public onSubmit() {
    this.addForm.markAllAsTouched();
    if (this.addForm.valid) {
      if (!this.isNewRecord && this.userId) {
        this.userFacade.updateUser(this.userId, this.addForm.value);
      }else{
        this.userFacade.createUser(this.addForm.value);
        this.addForm.reset();
      }
      
    }
  }

  public loadDefaultData(_id: string): void {
    this.userFacade.loadOne(_id).subscribe(({ data }) => {
      this.addForm.patchValue({
        ...data,
      });
    });
  }

  public back() {
    this.route.navigate([this.routerList]);
  }

  public logout() {
    this.logoutService.logout();
  }
}
