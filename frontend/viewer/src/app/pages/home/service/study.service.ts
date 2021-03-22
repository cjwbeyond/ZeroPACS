import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class StudyService {
  private apiUrl = `/dcm4chee-arc/aets/DCM4CHEE/rs`;
  constructor(private http: HttpClient) {
  }

  getStudies(params: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/studies`, { params });
  }

}
