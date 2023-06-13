import { Injectable } from '@angular/core';
import { Subject, forkJoin } from 'rxjs';
import { BookService } from '../book/book.service';
import { PaperService } from '../paper/paper.service';
import { ProjectService } from '../project/project.service';
import { ProfileService } from '../main-page/profile/profile.service';
import { FacultyMemberService } from '../faculty-member/faculty-member.service';
import { FacultyService } from '../faculty/faculty.service';
import { StudentService } from '../student/student.service';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  myArticles: boolean = false;
  myApplications: boolean = false;
  mySubscriptions: boolean = false;
  viewProfile: boolean = false;

  allArticles: any[] = [];
  filteredArticles: any[] = [];
  invokeSearch: Subject<any[]> = new Subject();

  searchText: string = '';

  filters = {
    sortByApplicantsAsc: false,
    sortByApplicantsDesc: false,
    sortByCreatorRating: false,
    uploadToday: false,
    uploadThisWeek: false,
    uploadThisMonth: false,
    articleBook: false,
    articlePaper: false,
    articleProject: false,
  };

  constructor(
    private bookService: BookService,
    private paperService: PaperService,
    private projectService: ProjectService,
    private profileService: ProfileService,
    private studentService: StudentService,
    private facultyMemberService: FacultyMemberService,
    private facultyService: FacultyService,
    private userService: UserService
  ) {}

  fetchFilteredArticles() {
    const requests = [];

    // my subscriptions
    if (this.mySubscriptions) {
      if (
        this.filters.articleBook == false &&
        this.filters.articlePaper == false &&
        this.filters.articleProject == false &&
        this.allArticles.length == 0
      ) {
        requests.push(
          this.userService.getSubscribeesBooks(
            this.profileService.profile.user!.id
          )
        );
        requests.push(
          this.userService.getSubscribeesPapers(
            this.profileService.profile.user!.id
          )
        );
        requests.push(
          this.userService.getSubscribeesProjects(
            this.profileService.profile.user!.id
          )
        );
      } else if (
        this.filters.articleBook == true ||
        this.filters.articlePaper == true ||
        this.filters.articleProject == true
      ) {
        this.filteredArticles = [];

        if (this.filters.articleBook) {
          this.filteredArticles = this.filteredArticles.concat(
            this.allArticles.filter(
              (article) =>
                article.name == undefined && article.student == undefined
            )
          );
        }

        if (this.filters.articlePaper) {
          this.filteredArticles = this.filteredArticles.concat(
            this.allArticles.filter(
              (article) =>
                article.name == undefined && article.student != undefined
            )
          );
        }

        if (this.filters.articleProject) {
          this.filteredArticles = this.filteredArticles.concat(
            this.allArticles.filter((article) => article.name != undefined)
          );
        }
      } else {
        this.filteredArticles = this.allArticles;
      }

      if (requests.length > 0) {
        forkJoin(requests).subscribe((responses: any[]) => {
          responses.forEach((response) => {
            this.allArticles = this.allArticles.concat(
              response.body.filter((article: any) => article != null)
            );
          });
          this.filteredArticles = this.allArticles;
          this.applyFilters();
          this.invokeSearch.next(this.filteredArticles);
        });
      } else {
        this.applyFilters();
        this.invokeSearch.next(this.filteredArticles);
      }
    }
    // my articles
    else if (this.myArticles) {
      if (
        this.filters.articleBook == false &&
        this.filters.articlePaper == false &&
        this.filters.articleProject == false &&
        this.allArticles.length == 0
      ) {
        if (this.profileService.typeOfProfile == 'student') {
          requests.push(
            this.paperService.getCreatorPapers(
              this.profileService.profile.id,
              this.profileService.typeOfProfile
            )
          );
          requests.push(
            this.projectService.getCreatorProjects(
              this.profileService.profile.id,
              this.profileService.typeOfProfile
            )
          );
        } else if (this.profileService.typeOfProfile == 'facultyMember') {
          requests.push(
            this.bookService.getCreatorBooks(this.profileService.profile.id)
          );
          requests.push(
            this.paperService.getCreatorPapers(
              this.profileService.profile.id,
              this.profileService.typeOfProfile
            )
          );
          requests.push(
            this.projectService.getCreatorProjects(
              this.profileService.profile.id,
              this.profileService.typeOfProfile
            )
          );
        } else if (this.profileService.typeOfProfile == 'faculty') {
          requests.push(
            this.projectService.getCreatorProjects(
              this.profileService.profile.id,
              this.profileService.typeOfProfile
            )
          );
        }
      } else if (
        this.filters.articleBook == true ||
        this.filters.articlePaper == true ||
        this.filters.articleProject == true
      ) {
        this.filteredArticles = [];

        if (this.filters.articleBook) {
          this.filteredArticles = this.filteredArticles.concat(
            this.allArticles.filter(
              (article) =>
                article.name == undefined && article.student == undefined
            )
          );
        }

        if (this.filters.articlePaper) {
          this.filteredArticles = this.filteredArticles.concat(
            this.allArticles.filter(
              (article) =>
                article.name == undefined && article.student != undefined
            )
          );
        }

        if (this.filters.articleProject) {
          this.filteredArticles = this.filteredArticles.concat(
            this.allArticles.filter((article) => article.name != undefined)
          );
        }
      } else {
        this.filteredArticles = this.allArticles;
      }

      if (requests.length > 0) {
        forkJoin(requests).subscribe((responses: any[]) => {
          responses.forEach((response) => {
            this.allArticles = this.allArticles.concat(
              response.body.filter((article: any) => article != null)
            );
          });
          this.filteredArticles = this.allArticles;
          this.applyFilters();
          this.invokeSearch.next(this.filteredArticles);
        });
      } else {
        this.applyFilters();
        this.invokeSearch.next(this.filteredArticles);
      }
    }
    // my applications
    else if (this.myApplications) {
      if (
        this.filters.articleBook == false &&
        this.filters.articlePaper == false &&
        this.filters.articleProject == false &&
        this.allArticles.length == 0
      ) {
        if (this.profileService.typeOfProfile == 'student') {
          requests.push(
            this.studentService.getStudentPaperApplications(
              this.profileService.profile.id
            )
          );
          requests.push(
            this.studentService.getStudentProjectApplications(
              this.profileService.profile.id
            )
          );
        } else if (this.profileService.typeOfProfile == 'facultyMember') {
          requests.push(
            this.facultyMemberService.getFacultyMemberPaperApplications(
              this.profileService.profile.id
            )
          );
          requests.push(
            this.facultyMemberService.getFacultyMemberProjectApplications(
              this.profileService.profile.id
            )
          );
          requests.push(
            this.facultyMemberService.getFacultyMemberBookApplications(
              this.profileService.profile.id
            )
          );
        } else if (this.profileService.typeOfProfile == 'faculty') {
          requests.push(
            this.facultyService.getFacultyProjectApplications(
              this.profileService.profile.id
            )
          );
        }
      } else if (
        this.filters.articleBook == true ||
        this.filters.articlePaper == true ||
        this.filters.articleProject == true
      ) {
        this.filteredArticles = [];

        if (this.filters.articleBook) {
          this.filteredArticles = this.filteredArticles.concat(
            this.allArticles.filter(
              (article) =>
                article.name == undefined && article.student == undefined
            )
          );
        }

        if (this.filters.articlePaper) {
          this.filteredArticles = this.filteredArticles.concat(
            this.allArticles.filter(
              (article) =>
                article.name == undefined && article.student != undefined
            )
          );
        }

        if (this.filters.articleProject) {
          this.filteredArticles = this.filteredArticles.concat(
            this.allArticles.filter((article) => article.name != undefined)
          );
        }
      } else {
        this.filteredArticles = this.allArticles;
      }

      if (requests.length > 0) {
        forkJoin(requests).subscribe((responses: any[]) => {
          responses.forEach((response) => {
            this.allArticles = this.allArticles.concat(
              response.body.filter((article: any) => article != null)
            );
          });
          this.filteredArticles = this.allArticles;
          this.applyFilters();
          this.invokeSearch.next(this.filteredArticles);
        });
      } else {
        this.applyFilters();
        this.invokeSearch.next(this.filteredArticles);
      }
    }
    // view profile
    else if (this.viewProfile) {
      if (
        this.filters.articleBook == false &&
        this.filters.articlePaper == false &&
        this.filters.articleProject == false &&
        this.allArticles.length == 0
      ) {
        if (this.profileService.typeOfProfileToDisplay == 'student') {
          requests.push(
            this.paperService.getCreatorPapers(
              this.profileService.profileToDisplay!.id,
              this.profileService.typeOfProfileToDisplay
            )
          );
          requests.push(
            this.projectService.getCreatorProjects(
              this.profileService.profileToDisplay!.id,
              this.profileService.typeOfProfileToDisplay
            )
          );
        } else if (
          this.profileService.typeOfProfileToDisplay == 'facultyMember'
        ) {
          requests.push(
            this.bookService.getCreatorBooks(
              this.profileService.profileToDisplay!.id
            )
          );
          requests.push(
            this.paperService.getCreatorPapers(
              this.profileService.profileToDisplay!.id,
              this.profileService.typeOfProfileToDisplay
            )
          );
          requests.push(
            this.projectService.getCreatorProjects(
              this.profileService.profileToDisplay!.id,
              this.profileService.typeOfProfileToDisplay
            )
          );
        } else if (this.profileService.typeOfProfileToDisplay == 'faculty') {
          requests.push(
            this.projectService.getCreatorProjects(
              this.profileService.profileToDisplay!.id,
              this.profileService.typeOfProfileToDisplay
            )
          );
        }
      } else if (
        this.filters.articleBook == true ||
        this.filters.articlePaper == true ||
        this.filters.articleProject == true
      ) {
        this.filteredArticles = [];

        if (this.filters.articleBook) {
          this.filteredArticles = this.filteredArticles.concat(
            this.allArticles.filter(
              (article) =>
                article.name == undefined && article.student == undefined
            )
          );
        }

        if (this.filters.articlePaper) {
          this.filteredArticles = this.filteredArticles.concat(
            this.allArticles.filter(
              (article) =>
                article.name == undefined && article.student != undefined
            )
          );
        }

        if (this.filters.articleProject) {
          this.filteredArticles = this.filteredArticles.concat(
            this.allArticles.filter((article) => article.name != undefined)
          );
        }
      } else {
        this.filteredArticles = this.allArticles;
      }

      if (requests.length > 0) {
        forkJoin(requests).subscribe((responses: any[]) => {
          responses.forEach((response) => {
            this.allArticles = this.allArticles.concat(
              response.body.filter((article: any) => article != null)
            );
          });
          this.filteredArticles = this.allArticles;
          this.applyFilters();
          this.invokeSearch.next(this.filteredArticles);
        });
      } else {
        this.applyFilters();
        this.invokeSearch.next(this.filteredArticles);
      }
    }
    // home page
    else {
      if (
        this.filters.articleBook == false &&
        this.filters.articlePaper == false &&
        this.filters.articleProject == false &&
        this.allArticles.length == 0
      ) {
        requests.push(this.bookService.getAllBooks());
        requests.push(this.paperService.getAllPapers());
        requests.push(this.projectService.getAllProjects());
      } else if (
        this.filters.articleBook == true ||
        this.filters.articlePaper == true ||
        this.filters.articleProject == true
      ) {
        this.filteredArticles = [];

        if (this.filters.articleBook) {
          this.filteredArticles = this.filteredArticles.concat(
            this.allArticles.filter(
              (article) =>
                article.name == undefined && article.student == undefined
            )
          );
        }

        if (this.filters.articlePaper) {
          this.filteredArticles = this.filteredArticles.concat(
            this.allArticles.filter(
              (article) =>
                article.name == undefined && article.student != undefined
            )
          );
        }

        if (this.filters.articleProject) {
          this.filteredArticles = this.filteredArticles.concat(
            this.allArticles.filter((article) => article.name != undefined)
          );
        }
      } else {
        this.filteredArticles = this.allArticles;
      }

      if (requests.length > 0) {
        forkJoin(requests).subscribe((responses: any[]) => {
          responses.forEach((response) => {
            this.allArticles = this.allArticles.concat(
              response.body.filter((article: any) => article != null)
            );
          });
          this.filteredArticles = this.allArticles;
          this.applyFilters();
          this.invokeSearch.next(this.filteredArticles);
        });
      } else {
        this.applyFilters();
        this.invokeSearch.next(this.filteredArticles);
      }
    }
  }

  applyFilters() {
    // sorting filters
    if (this.filters.sortByApplicantsAsc) {
      this.filteredArticles.sort((a, b) => {
        return a.applications.length - b.applications.length;
      });
    }
    if (this.filters.sortByApplicantsDesc) {
      this.filteredArticles.sort((a, b) => {
        return b.applications.length - a.applications.length;
      });
    }
    if (this.filters.sortByCreatorRating) {
      this.filteredArticles.sort((a, b) => {
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

    // date filters
    if (this.filters.uploadToday) {
      this.filteredArticles = this.filteredArticles.filter((article) => {
        return (
          new Date(article.postDate).toDateString() == new Date().toDateString()
        );
      });
    }
    if (this.filters.uploadThisWeek) {
      this.filteredArticles = this.filteredArticles.filter((article) => {
        const date1 = new Date(article.postDate).getTime();
        const date2 = new Date(
          new Date().getTime() - 7 * 24 * 60 * 60 * 1000
        ).getTime();
        return date1 >= date2;
      });
    }
    if (this.filters.uploadThisMonth) {
      this.filteredArticles = this.filteredArticles.filter((article) => {
        const date1 = new Date(article.postDate).getTime();
        const date2 = new Date(
          new Date().getTime() - 30 * 24 * 60 * 60 * 1000
        ).getTime();
        return date1 >= date2;
      });
    }

    // text search
    this.filteredArticles = this.filteredArticles.filter((article) => {
      if (this.searchText == '') {
        return true;
      } else {
        return article.description
          .toLowerCase()
          .includes(this.searchText.toLowerCase());
      }
    });
  }
}
