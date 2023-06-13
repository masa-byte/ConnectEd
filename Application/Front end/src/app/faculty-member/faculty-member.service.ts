import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url } from 'environment/environment.dev';
import { FacultyMember } from './faculty-member.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FacultyMemberService {
  constructor(private http: HttpClient) { }

  createProfileFacultyMember(
    facultyMember: FacultyMember
  ): Observable<HttpResponse<any>> {
    return this.http.post(
      url + '/faculty-member?userId=' + facultyMember.user?.id,
      {
        name: facultyMember.name,
        surname: facultyMember.surname,
        address: facultyMember.address,
        username: facultyMember.username,
        phoneNumber: facultyMember.phoneNumber,
        faculty: facultyMember.faculty,
        academicTitle: facultyMember.academicTitle,
        experience: facultyMember.experience,
        description: facultyMember.description,
        gradeCount: facultyMember.gradeCount,
        gradeSum: facultyMember.gradeSum,
      },
      { observe: 'response' }
    );
  }

  updateFacultyMember(
    facultyMember: FacultyMember
  ): Observable<HttpResponse<any>> {
    return this.http.put(
      url + '/faculty-member/' + facultyMember.id,
      {
        name: facultyMember.name,
        surname: facultyMember.surname,
        address: facultyMember.address,
        username: facultyMember.username,
        phoneNumber: facultyMember.phoneNumber,
        faculty: facultyMember.faculty,
        academicTitle: facultyMember.academicTitle,
        experience: facultyMember.experience,
        description: facultyMember.description,
      },
      { observe: 'response' }
    );
  }

  updateFacultyMemberGrade(
    facultyMemberId: number,
    grade: number
  ): Observable<HttpResponse<any>> {
    return this.http.put<any>(
      url + `/faculty-member/${facultyMemberId}/${grade}`,
      { observe: 'response' }
    );
  }

  getFacultyMember(id: number): Observable<HttpResponse<any>> {
    return this.http.get(url + '/faculty-member/' + id, {
      observe: 'response',
    });
  }

  getAllFacultyMembers(): Observable<HttpResponse<any>> {
    return this.http.get(url + '/faculty-member', { observe: 'response' });
  }

  getFacultyMemberPaperApplications(id: number): Observable<HttpResponse<any>> {
    return this.http.get(url + '/faculty-member/' + id + '/paperApplications', {
      observe: 'response',
    });
  }

  getFacultyMemberProjectApplications(
    id: number
  ): Observable<HttpResponse<any>> {
    return this.http.get(
      url + '/faculty-member/' + id + '/projectApplications',
      { observe: 'response' }
    );
  }

  getFacultyMemberBookApplications(id: number): Observable<HttpResponse<any>> {
    return this.http.get(url + '/faculty-member/' + id + '/bookApplications', {
      observe: 'response',
    });
  }

  applyForArticle(
    facultyMemberId: number,
    articleId: number,
    articleType: string
  ): Observable<HttpResponse<any>> {
    return this.http.post(
      url +
      '/faculty-member/' +
      facultyMemberId +
      '/article/' +
      articleId +
      '?articleType=' +
      articleType,
      {},
      { observe: 'response' }
    );
  }
}
