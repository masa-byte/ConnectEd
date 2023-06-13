import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url } from 'environment/environment.prod';
import { Faculty } from './faculty.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FacultyService {
  constructor(private http: HttpClient) { }

  createFaculty(faculty: Faculty): Observable<HttpResponse<any>> {
    return this.http.post(
      url + '/faculty?userId=' + faculty.user?.id,
      {
        name: faculty.name,
        address: faculty.address,
        phoneNumber: faculty.phoneNumber,
        university: faculty.university,
        description: faculty.description,
        user: faculty.user,
      },
      { observe: 'response' }
    );
  }

  updateFaculty(faculty: Faculty): Observable<HttpResponse<any>> {
    return this.http.put(
      url + '/faculty/' + faculty.id,
      {
        name: faculty.name,
        address: faculty.address,
        phoneNumber: faculty.phoneNumber,
        university: faculty.university,
        description: faculty.description,
      },
      { observe: 'response' }
    );
  }

  getFaculty(id: number): Observable<HttpResponse<any>> {
    return this.http.get(url + '/faculty/' + id, { observe: 'response' });
  }

  getAllFaculties(): Observable<HttpResponse<any>> {
    return this.http.get(url + '/faculty', { observe: 'response' });
  }

  getFacultyProjectApplications(id: number): Observable<HttpResponse<any>> {
    return this.http.get(url + '/faculty/' + id + '/projectApplications', {
      observe: 'response',
    });
  }

  applyForArticle(
    facultyId: number,
    articleId: number
  ): Observable<HttpResponse<any>> {
    return this.http.post(
      url + '/faculty/' + facultyId + '/article/' + articleId,
      {},
      { observe: 'response' }
    );
  }
}
