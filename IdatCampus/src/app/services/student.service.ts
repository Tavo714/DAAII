import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StudentSearchFilter } from '../models/student-search-filter';
import { StudentData } from '../models/student-data';
import { Observable } from 'rxjs';
import { StudentPage } from '../models/student-page';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  apiUrlBasePath = "http://localhost:8080/api/v1/";
  httpOptions;

  constructor(private httpClient: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders(
        {
          'Authorization': 'Basic YWRtaW46MDEyMzQ1Njc= ',
          'Content-Type': 'application/json'
        }
      )
    }
   }

  getById(id: string): Observable<StudentData>{
    return this.httpClient.get<StudentData>(`${this.apiUrlBasePath}students/${id}`, this.httpOptions)
  }

  getAllPageable(filter: StudentSearchFilter): Observable<StudentPage>{
    let filterParams = new HttpParams()
    .set('pageNumber', filter.pageNumber)
    .set('pageSize', filter.pageSize)
    .set('columnOrder', filter.column)
    .set('direction', filter.direction)
    .set('filter', filter.filter);

    return this.httpClient.get<StudentPage>(`${this.apiUrlBasePath}students/page`, {params: filterParams, headers: this.httpOptions.headers});
  }

  create(student: StudentData): Observable<StudentData>{
    return this.httpClient.post<StudentData>(`${this.apiUrlBasePath}students`,student, this.httpOptions)
  }

  update(student: StudentData): Observable<StudentData>{
    return this.httpClient.put<StudentData>(`${this.apiUrlBasePath}students/${student.id}`,student, this.httpOptions)
  }

  delete(id: number){
    return this.httpClient.delete(`${this.apiUrlBasePath}students/${id}`, {responseType: 'text', headers: this.httpOptions.headers});
  }

}
