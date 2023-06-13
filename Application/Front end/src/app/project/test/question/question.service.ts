import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Question } from '../question.model';
import { url } from 'environment/environment.dev';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  constructor(private http: HttpClient) {}

  createQuestion(
    question: Question,
    testId: number
  ): Observable<HttpResponse<any>> {
    return this.http.post(url + `/question?testId=${testId}`, question, {
      observe: 'response',
    });
  }
}
