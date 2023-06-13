import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url } from 'environment/environment.dev';
import { Observable } from 'rxjs';
import { Student } from './student.model';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  constructor(private http: HttpClient) {}

  createStudent(student: Student): Observable<HttpResponse<any>> {
    return this.http.post(
      url + '/student?userId=' + student.user?.id,
      {
        name: student.name,
        surname: student.surname,
        address: student.address,
        username: student.username,
        phoneNumber: student.phoneNumber,
        faculty: student.faculty,
        degreeLevel: student.degreeLevel,
        experience: student.experience,
        description: student.description,
        gradeCount: student.gradeCount,
        gradeSum: student.gradeSum,
      },
      { observe: 'response' }
    );
  }

  updateStudent(student: Student): Observable<HttpResponse<any>> {
    return this.http.put(
      url + '/student/' + student.id,
      {
        name: student.name,
        surname: student.surname,
        address: student.address,
        username: student.username,
        phoneNumber: student.phoneNumber,
        faculty: student.faculty,
        degreeLevel: student.degreeLevel,
        experience: student.experience,
        description: student.description,
      },
      { observe: 'response' }
    );
  }

  updateStudentGrade(
    studentId: number,
    grade: number
  ): Observable<HttpResponse<any>> {
    return this.http.put<any>(url + `/student/${studentId}/${grade}`, {
      observe: 'response',
    });
  }

  getStudent(id: number): Observable<HttpResponse<any>> {
    return this.http.get(url + '/student/' + id, { observe: 'response' });
  }

  getAllStudents(): Observable<HttpResponse<any>> {
    return this.http.get(url + '/student', { observe: 'response' });
  }

  getStudentPaperApplications(id: number): Observable<HttpResponse<any>> {
    return this.http.get(url + '/student/' + id + '/paperApplications', {
      observe: 'response',
    });
  }

  getStudentProjectApplications(id: number): Observable<HttpResponse<any>> {
    return this.http.get(url + '/student/' + id + '/projectApplications', {
      observe: 'response',
    });
  }

  applyForArticle(
    studentId: number,
    articleId: number,
    articleType: string
  ): Observable<HttpResponse<any>> {
    return this.http.post(
      url +
        '/student/' +
        studentId +
        '/article/' +
        articleId +
        '?articleType=' +
        articleType,
      {},
      { observe: 'response' }
    );
  }
}
