import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Test } from './test.model';
import { url } from 'environment/environment.dev';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TestService {
  constructor(private http: HttpClient) {}

  createTest(test: Test, projectId: number): Observable<HttpResponse<any>> {
    return this.http.post(
      `${url}/test?projectId=${projectId}`,
      {
        duration: test.duration,
      },
      { observe: 'response' }
    );
  }

  getTest(testId: number): Observable<HttpResponse<any>> {
    return this.http.get(`${url}/test/${testId}`, { observe: 'response' });
  }

  deleteTest(testId: number): Observable<HttpResponse<any>> {
    return this.http.delete(`${url}/test/${testId}`, { observe: 'response' });
  }
}
