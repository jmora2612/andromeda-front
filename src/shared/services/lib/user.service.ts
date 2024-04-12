import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';
import { ResponseHttpPaginateDto } from '../../dtos';
import { IRegister } from '../../entitites';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public token = localStorage.getItem('token');
  constructor(private http: HttpClient) {}

  add(user: any): Observable<any> {    
    return this.http.post<any>(`${environment.apiUrl}/usuario`, user);
  }

  update(id:string, user: any): Observable<any> {    
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.put<any>(`${environment.apiUrl}/usuario/${id}`, user, { headers });
  }

  login(user: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/login`, user);
  }

  getUsers(params?: any): Observable<ResponseHttpPaginateDto<IRegister[]>> {
    return this.http.get<ResponseHttpPaginateDto<IRegister[]>>(`${environment.apiUrl}/usuarios`, { params });
  }

  getUserById(id: string): Observable<any> {
    
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<any>(`${environment.apiUrl}/usuario/${id}`, { headers });
  }
}
