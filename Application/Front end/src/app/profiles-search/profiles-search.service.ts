import { Injectable } from '@angular/core';
import { Subject, forkJoin } from 'rxjs';
import { FacultyMemberService } from '../faculty-member/faculty-member.service';
import { FacultyService } from '../faculty/faculty.service';
import { StudentService } from '../student/student.service';

@Injectable({
  providedIn: 'root',
})
export class ProfilesSearchService {
  allProfiles: any[] = [];
  filteredProfiles: any[] = [];
  invokeSearch: Subject<any[]> = new Subject();

  searchText: string = '';
  selectedTag: string | null = '';

  filters = {
    sortByArticlesAsc: false,
    sortByArticlesDesc: false,
    sortByRating: false,
    student: false,
    facultyMember: false,
    faculty: false,
  };

  constructor(
    private studentService: StudentService,
    private facultyMemberService: FacultyMemberService,
    private facultyService: FacultyService
  ) {}

  fetchFilteredProfiles() {
    const requests: any[] = [];

    if (
      this.filters.student == false &&
      this.filters.facultyMember == false &&
      this.filters.faculty == false &&
      this.allProfiles.length == 0
    ) {
      requests.push(this.studentService.getAllStudents());
      requests.push(this.facultyMemberService.getAllFacultyMembers());
      requests.push(this.facultyService.getAllFaculties());
    } else if (
      this.filters.student == true ||
      this.filters.facultyMember == true ||
      this.filters.faculty == true
    ) {
      this.filteredProfiles = [];

      if (this.filters.student) {
        this.filteredProfiles = this.filteredProfiles.concat(
          this.allProfiles.filter((profile) => profile.degreeLevel != undefined)
        );
      }

      if (this.filters.facultyMember) {
        this.filteredProfiles = this.filteredProfiles.concat(
          this.allProfiles.filter(
            (profile) => profile.academicTitle != undefined
          )
        );
      }

      if (this.filters.faculty) {
        this.filteredProfiles = this.filteredProfiles.concat(
          this.allProfiles.filter((profile) => profile.surname == undefined)
        );
      }
    } else {
      this.filteredProfiles = this.allProfiles;
    }

    if (requests.length > 0) {
      forkJoin(requests).subscribe((responses: any[]) => {
        responses.forEach((response) => {
          if (response.body[0] != null)
            this.allProfiles = this.allProfiles.concat(response.body);
        });
        this.filteredProfiles = this.allProfiles;
        this.applyFilters();
        this.invokeSearch.next(this.filteredProfiles);
      });
    } else {
      this.applyFilters();
      this.invokeSearch.next(this.filteredProfiles);
    }
  }

  applyFilters() {
    // sorting filters
    if (this.filters.sortByArticlesAsc) {
      this.filteredProfiles.sort((a, b) => {
        let articleNum1 = 0;
        articleNum1 += a.books != undefined ? a.books.length : 0;
        articleNum1 += a.papers != undefined ? a.papers.length : 0;
        articleNum1 += a.projects != undefined ? a.projects.length : 0;

        let articleNum2 = 0;
        articleNum2 += b.books != undefined ? b.books.length : 0;
        articleNum2 += b.papers != undefined ? b.papers.length : 0;
        articleNum2 += b.projects != undefined ? b.projects.length : 0;

        return articleNum1 - articleNum2;
      });
    }
    if (this.filters.sortByArticlesDesc) {
      this.filteredProfiles.sort((a, b) => {
        let articleNum1 = 0;
        articleNum1 += a.books != undefined ? a.books.length : 0;
        articleNum1 += a.papers != undefined ? a.papers.length : 0;
        articleNum1 += a.projects != undefined ? a.projects.length : 0;

        let articleNum2 = 0;
        articleNum2 += b.books != undefined ? b.books.length : 0;
        articleNum2 += b.papers != undefined ? b.papers.length : 0;
        articleNum2 += b.projects != undefined ? b.projects.length : 0;

        return articleNum2 - articleNum1;
      });
    }
    if (this.filters.sortByRating) {
      this.filteredProfiles.sort((a, b) => {
        const valB = b.student
          ? b.student.gradeSum / b.student.gradeCount == 0
            ? 1
            : b.student.gradeCount
          : b.facultyMember.gradeSum / b.facultyMember.gradeCount == 0
          ? 1
          : b.facultyMember.gradeCount;
        const valA = a.student
          ? a.student.gradeSum / a.student.gradeCount == 0
            ? 1
            : a.student.gradeCount
          : a.facultyMember.gradeSum / a.facultyMember.gradeCount == 0
          ? 1
          : a.facultyMember.gradeCount;
        return valB - valA;
      });
    }

    // tag filter
    if (this.selectedTag) {
      this.filteredProfiles = this.allProfiles.filter((profile) => {
        if (profile.tags == undefined) {
          return false;
        } else {
          return profile.tags
            .map((tag: any) => tag.text)
            .includes(this.selectedTag);
        }
      });
    }

    // text search
    this.filteredProfiles = this.filteredProfiles.filter((profile) => {
      if (this.searchText == '') {
        return true;
      } else {
        return profile.description
          .toLowerCase()
          .includes(this.searchText.toLowerCase());
      }
    });
  }
}
