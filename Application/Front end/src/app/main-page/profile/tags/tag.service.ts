import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url } from 'environment/environment.dev';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TagService {
  constructor(private http: HttpClient) { }

  getAllTags(): Observable<HttpResponse<any>> {
    return this.http.get(url + '/tag', { observe: 'response' });
  }

  addTag(
    tagText: string,
    type: string,
    id: number
  ): Observable<HttpResponse<any>> {
    return this.http.post(
      url + `/tag/?creatorId=${id}&creatorType=${type}`,
      {
        text: tagText,
      },
      { observe: 'response' }
    );
  }

  removeTag(id: number): Observable<HttpResponse<any>> {
    return this.http.delete(url + '/tag/' + id, { observe: 'response' });
  }
}
