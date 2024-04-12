import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NAVIGATION } from '../../../shared/url';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HighchartsChartModule } from 'highcharts-angular';
import * as Highcharts from 'highcharts/highstock';
import { MatTableModule } from '@angular/material/table';
import {
  Subject,
  catchError,
  map,
  merge,
  startWith,
  switchMap,
  takeUntil,
  of as observableOf,
} from 'rxjs';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { IRegister } from '../../../shared/entitites';
import { LogoutService, UserService } from '../../../shared/services';
import { DashBoardFacade } from '../facade/dashBoard.facade';
import { UsersParamsHttpDto } from '../../../shared/dtos';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-dashboard',
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
    HighchartsChartModule,
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule,
  ],
  providers: [UserService, DashBoardFacade, LogoutService],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit, AfterViewInit {
  chartOptions: any;
  highcharts: typeof Highcharts = Highcharts;
  public routerList = `/${NAVIGATION.LOGIN}`;
  public routerAddUser = `/${NAVIGATION.ADD_USER}`;
  public routerEditUser = `/${NAVIGATION.EDIT_USER}`;
  public list: IRegister[] = [];
  destroy$: Subject<boolean> = new Subject<boolean>();
  displayedColumns: string[] = ['name', 'email', 'phone', 'action'];
  public resultsLength = 0;
  public params: UsersParamsHttpDto = {
    skip: 0,
    limit: 0,
  };
  filterSelect = 0;
  filterInput: string;

  filter: string[] = ['Todos', 'Nombre', 'Email'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    private route: Router,
    private dashBoardFacade: DashBoardFacade,
    private logoutService: LogoutService
  ) {}

  ngOnInit(): void {
    this.barChart();
  }

  ngAfterViewInit(): void {
    if (this.paginator) {
      this.initPaginate();
    }
  }

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filterInput = filterValue;
  }

  public filterChange(event: any) {
    this.filterInput = '';
    this.filterSelect = 0;
    delete this.params.name;
    delete this.params.email;

    if (event.value === 'Nombre') {
      this.filterSelect = 1;
    } else if (event.value === 'Email') {
      this.filterSelect = 2;
    } else {
      this.filterSelect = 3;
    }
  }

  initPaginate() {
    this.destroy$.next(true);
    merge(this.paginator.page)
      .pipe(
        takeUntil(this.destroy$),
        startWith({}),
        switchMap(() => {
          this.params.skip = this.paginator.pageIndex * this.paginator.pageSize;
          this.params.limit = this.paginator.pageSize;
          return this.dashBoardFacade
            .getList(this.params)
            .pipe(catchError(() => observableOf(null)));
        }),
        map((response: any) => {
          if (response) {
            this.resultsLength = response.count;
            return response.data;
          }
        })
      )
      .subscribe((response: IRegister[]) => {
        this.list = response;
      });
  }

  barChart() {
    this.chartOptions = {
      chart: {
        type: 'column',
      },
      title: {
        text: 'Gráfica de barra',
      },
      xAxis: {
        categories: ['Africa', 'America', 'Asia', 'Europe'],
      },
      credits: {
        enabled: false,
      },
      series: this.chartData,
    };
  }

  chartData = [
    {
      name: 'Año 1',
      data: [10, 20, 50, 60],
    },
    {
      name: 'Año 2',
      data: [60, 50, 20, 10],
    },
  ];

  public find() {
    if (this.filterSelect === 1) {
      this.params.name = this.filterInput;
    } else if (this.filterSelect === 2) {
      this.params.email = this.filterInput;
    } else {
      this.params = { ...this.params, email: '', name: '' };
    }
    this.paginator.firstPage();
    this.initPaginate();
  }

  public add() {
    this.route.navigate([this.routerAddUser]);
  }

  public edit(user: any) {
    const prueba = this.routerEditUser+'/'+user._id    
    this.route.navigate([this.routerEditUser+'/'+user._id]);
  }

  public logout() {
    this.logoutService.logout();
  }
}
