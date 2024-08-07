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
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
   }

  getById(id: string): Observable<StudentData>{
    return this.httpClient.get<StudentData>(`${this.apiUrlBasePath}students/${id}`)
  }

  getAllPageable(filter: StudentSearchFilter): Observable<StudentPage>{
    let params = new HttpParams()
    .set('pageNumber', filter.pageNumber)
    .set('pageSize', filter.pageSize)
    .set('column', filter.column)
    .set('direction', filter.direction);

    return this.httpClient.get<StudentPage>(`${this.apiUrlBasePath}students/page`, {params: params});
  }

  create(student: StudentData): Observable<StudentData>{
    return this.httpClient.post<StudentData>(`${this.apiUrlBasePath}students`,student, this.httpOptions)
  }

  update(student: StudentData): Observable<StudentData>{
    return this.httpClient.put<StudentData>(`${this.apiUrlBasePath}students/${student.id}`,student)
  }

  delete(id: number){
    return this.httpClient.delete(`${this.apiUrlBasePath}students/${id}`);
  }

}
