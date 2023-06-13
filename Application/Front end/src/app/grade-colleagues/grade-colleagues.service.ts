import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url } from 'environment/environment.dev';
import { BookApplication } from '../book/book-application.model';
import { PaperApplication } from '../paper/paper-application.model';
import { ProjectApplication } from '../project/project-application.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GradeColleaguesService {
  constructor(private httpClient: HttpClient) { }

  getUngradedBookApplications(applicantId: number) {
    return this.httpClient.get<BookApplication[]>(
      url + `/bookApplication/ungraded/${applicantId}`
    );
  }

  getUngradedPaperApplications(applicantId: number, applicantType: string) {
    return this.httpClient.get<PaperApplication[]>(
      url + `/paper-application/ungraded/${applicantId}/${applicantType}`
    );
  }

  getUngradedProjectApplications(applicantId: number, applicantType: string) {
    return this.httpClient.get<ProjectApplication[]>(
      url + `/project-application/ungraded/${applicantId}/${applicantType}`
    );
  }

  finishBookGrading(
    bookId: number,
    applicantId: number
  ): Observable<HttpResponse<any>> {
    return this.httpClient.put(
      url + `/bookApplication/${bookId}/${applicantId}`,
      {},
      { observe: 'response' }
    );
  }

  finishPaperGrading(
    paperId: number,
    applicantId: number,
    applicantType: string
  ): Observable<HttpResponse<any>> {
    return this.httpClient.put(
      url + `/paper-application/${paperId}/${applicantId}/${applicantType}`,
      {},
      { observe: 'response' }
    );
  }

  finishProjectGrading(
    projectId: number,
    applicantId: number,
    applicantType: string
  ): Observable<HttpResponse<any>> {
    return this.httpClient.put(
      url + `/project-application/${projectId}/${applicantId}/${applicantType}`,
      {},
      { observe: 'response' }
    );
  }
}
