import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Paper } from './paper.model';
import { Observable } from 'rxjs';
import { url } from 'environment/environment.dev';

@Injectable({
  providedIn: 'root',
})
export class PaperService {
  editPaper: Paper | null = null;

  constructor(private http: HttpClient) { }

  createPaper(paper: Paper): Observable<HttpResponse<any>> {
    let id: number = -1;
    let type: string = '';
    if (paper.student !== undefined) {
      id = paper.student.id;
      type = 'student';
    } else if (paper.facultyMember !== undefined) {
      id = paper.facultyMember.id;
      type = 'facultyMember';
    }
    return this.http.post(
      url + `/paper?creatorId=${id}&creatorType=${type}`,
      {
        title: paper.title,
        topic: paper.topic,
        description: paper.description,
        contributors: paper.contributors,
      },
      { observe: 'response' }
    );
  }

  closePaper(paperId: number): Observable<HttpResponse<any>> {
    return this.http.put<any>(url + `/paper/close/${paperId}`, {
      observe: 'response',
    });
  }

  getPaper(id: number): Observable<HttpResponse<any>> {
    return this.http.get(url + `/paper/${id}`, { observe: 'response' });
  }

  getAllPapers(): Observable<HttpResponse<any>> {
    return this.http.get(url + '/paper', { observe: 'response' });
  }

  getCreatorPapers(
    id: number,
    creatorType: string
  ): Observable<HttpResponse<any>> {
    return this.http.get(url + `/paper/creator/${id}/${creatorType}`, {
      observe: 'response',
    });
  }

  getAllApplicants(id: number): Observable<HttpResponse<any>> {
    return this.http.get(url + `/paper/applicants/${id}`, {
      observe: 'response',
    });
  }

  updatePaper(paper: Paper): Observable<HttpResponse<any>> {
    return this.http.put(
      url + `/paper/${paper.id}`,
      {
        title: paper.title,
        topic: paper.topic,
        description: paper.description,
        contributors: paper.contributors,
      },
      { observe: 'response' }
    );
  }
}
