import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from './project.model';
import { Observable } from 'rxjs';
import { url } from 'environment/environment.dev';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private http: HttpClient) {}

  editProject: Project | null = null;

  createProject(project: Project): Observable<HttpResponse<any>> {
    let id: number = -1;
    let type: string = '';

    if (project.facultyMember !== undefined) {
      id = project.facultyMember.id;
      type = 'facultyMember';
    } else if (project.student !== undefined) {
      id = project.student.id;
      type = 'student';
    } else if (project.faculty !== undefined) {
      id = project.faculty.id;
      type = 'faculty';
    }
    return this.http.post(
      url + `/project?creatorId=${id}&creatorType=${type}`,
      {
        name: project.name,
        type: project.type,
        description: project.description,
        contributors: project.contributors,
        durationInDays: project.durationInDays,
        facultyMember: project.facultyMember,
        student: project.student,
        faculty: project.faculty,
        applications: project.applications,
      },
      { observe: 'response' }
    );
  }

  updateProject(project: Project): Observable<HttpResponse<any>> {
    return this.http.put(
      url + `/project/${project.id}`,
      {
        name: project.name,
        type: project.type,
        description: project.description,
        contributors: project.contributors,
        durationInDays: project.durationInDays,
        facultyMember: project.facultyMember,
        student: project.student,
        faculty: project.faculty,
        applications: project.applications,
      },
      { observe: 'response' }
    );
  }

  checkIfApplicationExists(
    projectId: number,
    applicantId: number,
    applicantType: string
  ): Observable<HttpResponse<any>> {
    return this.http.get(
      url +
        `/project-application/checkIfApplicationExists/${projectId}/${applicantId}/${applicantType}`,
      { observe: 'response' }
    );
  }

  closeProject(projectId: number): Observable<HttpResponse<any>> {
    return this.http.put<any>(url + `/project/close/${projectId}`, {
      observe: 'response',
    });
  }

  getProject(id: number): Observable<HttpResponse<any>> {
    return this.http.get(url + `/project/${id}`, { observe: 'response' });
  }

  getAllProjects(): Observable<HttpResponse<any>> {
    return this.http.get(url + '/project', { observe: 'response' });
  }

  getCreatorProjects(
    id: number,
    creatorType: string
  ): Observable<HttpResponse<any>> {
    return this.http.get(url + `/project/creator/${id}/${creatorType}`, {
      observe: 'response',
    });
  }

  getAllApplicants(id: number): Observable<HttpResponse<any>> {
    return this.http.get(url + `/project/applicants/${id}`, {
      observe: 'response',
    });
  }
}
