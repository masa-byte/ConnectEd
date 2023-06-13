import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { url } from 'environment/environment.dev';
import { Observable } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user: User = {
    id: 0,
    email: '',
    password: '',
    type: '',
    faculties: [],
    facultyMembers: [],
    students: [],
    subscribers: [],
    subscribees: [],
  };
  constructor(private http: HttpClient) {}

  signUp(
    email: string,
    password: string,
    type: string
  ): Observable<HttpResponse<any>> {
    return this.http.post(
      url + '/auth/signup',
      { email: email, password: password, type: type },
      { observe: 'response' }
    );
  }

  signIn(email: string, password: string): Observable<HttpResponse<any>> {
    return this.http.post(
      url + '/auth/signin',
      { email: email, password: password },
      { observe: 'response' }
    );
  }

  auth(token: string): Observable<HttpResponse<any>> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.get(url + '/auth/guardtest', {
      headers: headers,
      observe: 'response',
    });
  }

  getUser(id: number): Observable<HttpResponse<any>> {
    return this.http.get(url + '/user/' + id, { observe: 'response' });
  }

  deleteUser(id: number): Observable<HttpResponse<any>> {
    return this.http.delete(url + '/user/' + id, { observe: 'response' });
  }

  checkIfSubscribed(
    subscriberId: number,
    subscribesToId: number
  ): Observable<HttpResponse<any>> {
    return this.http.get(
      url + `/user/checkIfSubscribed/${subscriberId}/${subscribesToId}`,
      { observe: 'response' }
    );
  }

  subscribeTo(subscriberId: number, subscribesToId: number) {
    return this.http.post(
      url + `/user/subscribe/${subscriberId}/${subscribesToId}`,
      {},
      { observe: 'response' }
    );
  }

  unsubscribeFrom(subscriberId: number, subscribesToId: number) {
    return this.http.delete(
      url + `/user/unsubscribe/${subscriberId}/${subscribesToId}`,
      { observe: 'response' }
    );
  }

  getSubscribeesBooks(id: number): Observable<HttpResponse<any>> {
    return this.http.get(url + `/user/subscribees/${id}/books`, {
      observe: 'response',
    });
  }

  getSubscribeesPapers(id: number): Observable<HttpResponse<any>> {
    return this.http.get(url + `/user/subscribees/${id}/papers`, {
      observe: 'response',
    });
  }

  getSubscribeesProjects(id: number): Observable<HttpResponse<any>> {
    return this.http.get(url + `/user/subscribees/${id}/projects`, {
      observe: 'response',
    });
  }

  getAllSubscribers(id: number): Observable<HttpResponse<any>> {
    return this.http.get(url + `/user/subscribers/${id}`, {
      observe: 'response',
    });
  }
}
