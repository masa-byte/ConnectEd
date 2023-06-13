import { Component, OnInit } from '@angular/core';
import { Project } from '../project.model';
import { ProfileService } from 'src/app/main-page/profile/profile.service';
import { ProjectService } from '../project.service';
import { TestService } from '../test/test.service';
import { Test } from '../test/test.model';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatSlideToggle,
  MatSlideToggleChange,
} from '@angular/material/slide-toggle';
import { Question } from '../test/question.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/user/user.service';
import { EmailService } from 'src/app/email/email.service';
import { BackgroundService } from 'src/app/background.service';
import { QuestionService } from '../test/question/question.service';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss'],
})
export class ProjectFormComponent implements OnInit {
  project: Project = {
    id: 0,
    name: '',
    type: '',
    description: '',
    contributors: 0,
    durationInDays: 0,
    test: undefined,
    facultyMember: undefined,
    student: undefined,
    faculty: undefined,
    applications: [],
  };

  hasTest: boolean = false;
  test: Test = {
    id: 0,
    duration: 0,
    questions: [],
    project: undefined,
  };

  isEditing: boolean = false;

  projectFormGroup!: FormGroup;

  questionFormGroup!: FormGroup;

  constructor(
    private profileService: ProfileService,
    private projectService: ProjectService,
    private testService: TestService,
    private questionService: QuestionService,
    private userService: UserService,
    private emailService: EmailService,
    public backgroundService: BackgroundService,
    private _formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      if (
        params.get('action') == 'edit' &&
        this.projectService.editProject !== null
      ) {
        this.project = this.projectService.editProject;
        this.test =
          this.project.test !== null && this.project.test !== undefined
            ? this.project.test
            : {
                id: 0,
                duration: 0,
                questions: [],
                project: undefined,
              };
        this.projectService.editProject = null;
        this.isEditing = true;
        this.hasTest = this.project.test != undefined;
        this.projectFormGroup = this._formBuilder.group({
          projectName: [this.project.name, Validators.required],
          projectType: [this.project.type, Validators.required],
          projectDescription: [this.project.description, Validators.required],
          projectContributors: [this.project.contributors, Validators.required],
          projectDuration: [this.project.durationInDays, Validators.required],
          testEnabled: [this.project.test != undefined],
          testDuration: [
            { value: this.project.test?.duration, disabled: !this.hasTest },
            Validators.required,
          ],
        });
        this.questionFormGroup = this._formBuilder.group({
          questions: this._formBuilder.array([]),
        });
        for (let question of this.test.questions) {
          this.addQuestion(
            question.text,
            question.points,
            question.answer1,
            question.answer2,
            question.answer3,
            question.answer4,
            question.correctAnswerIndex
          );
        }
      } else {
        this.projectFormGroup = this._formBuilder.group({
          projectName: ['', Validators.required],
          projectType: ['', Validators.required],
          projectDescription: ['', Validators.required],
          projectContributors: ['', Validators.required],
          projectDuration: ['', Validators.required],
          testEnabled: [''],
          testDuration: [{ value: '', disabled: true }, Validators.required],
        });
        this.questionFormGroup = this._formBuilder.group({
          questions: this._formBuilder.array([]),
        });
        this.addQuestion();
      }
    });
  }

  get questions() {
    return this.questionFormGroup.get('questions') as FormArray;
  }

  addQuestion(
    text?: string,
    points?: number,
    answer1?: string,
    answer2?: string,
    answer3?: string,
    answer4?: string,
    correctAnswerIndex?: number
  ) {
    this.questions.push(
      this._formBuilder.group({
        text: [text, Validators.required],
        points: [points, Validators.required],
        answer1: [answer1, Validators.required],
        answer2: [answer2, Validators.required],
        answer3: [answer3, Validators.required],
        answer4: [answer4, Validators.required],
        correctAnswerIndex: [correctAnswerIndex, Validators.required],
      })
    );
  }

  removeQuestion(index: number) {
    this.questions.removeAt(index);
  }

  addTest() {
    this.projectFormGroup.addControl(
      'testDuration',
      this._formBuilder.control('', Validators.required)
    );
  }

  toggleTest(event: MatSlideToggleChange) {
    this.hasTest = event.checked;
    if (this.hasTest) this.projectFormGroup.get('testDuration')?.enable();
    else this.projectFormGroup.get('testDuration')?.disable();
  }

  saveProject() {
    this.project.name = this.projectFormGroup.get('projectName')?.value;
    this.project.type = this.projectFormGroup.get('projectType')?.value;
    this.project.description =
      this.projectFormGroup.get('projectDescription')?.value;
    this.project.contributors = this.projectFormGroup.get(
      'projectContributors'
    )?.value;
    this.project.durationInDays =
      this.projectFormGroup.get('projectDuration')?.value;

    this.createOrUpdateProject();
  }

  getQuestionsFromForm() {
    let questions: Question[] = [];
    for (let i = 0; i < this.questions.length; i++) {
      let question: Question = {
        id: 0,
        text: this.questions.at(i).get('text')?.value,
        points: this.questions.at(i).get('points')?.value,

        answer1: this.questions.at(i).get('answer1')?.value,
        answer2: this.questions.at(i).get('answer2')?.value,
        answer3: this.questions.at(i).get('answer3')?.value,
        answer4: this.questions.at(i).get('answer4')?.value,
        correctAnswerIndex: this.questions.at(i).get('correctAnswerIndex')
          ?.value,
      };
      questions.push(question);
    }
    return questions;
  }

  createOrUpdateProject() {
    if (this.isEditing) {
      this.projectService.updateProject(this.project).subscribe((response) => {
        const updatedProject: Project = response.body;
        if (response.status == 200) {
          this.testService.deleteTest(this.test.id).subscribe((response) => {
            if (response.status == 200) {
              this.test.duration =
                this.projectFormGroup.get('testDuration')?.value;
              this.testService
                .createTest(this.test, updatedProject.id)
                .subscribe((response) => {
                  if (response.status == 201) {
                    // saving questions by iterating through questions array
                    let questions = this.getQuestionsFromForm();
                    for (let i = 0; i < questions.length; i++) {
                      this.questionService
                        .createQuestion(questions[i], response.body['id'])
                        .subscribe();
                    }
                    this.openSnackBar('Project updated successfully.');
                    this.router.navigate(['/mainPage/myArticles']);
                  }
                });
            }
          });
        }
      });
    } else {
      if ('university' in this.profileService.profile)
        this.project.faculty = this.profileService.profile;
      else if ('degreeLevel' in this.profileService.profile)
        this.project.student = this.profileService.profile;
      else this.project.facultyMember = this.profileService.profile;

      this.projectService.createProject(this.project).subscribe((response) => {
        if (response.status == 201) {
          if (this.hasTest) {
            this.test.duration =
              this.projectFormGroup.get('testDuration')?.value;
            this.testService
              .createTest(this.test, response.body['id'])
              .subscribe((response) => {
                if (response.status == 201) {
                  // saving questions by iterating through questions array
                  let questions = this.getQuestionsFromForm();
                  for (let i = 0; i < questions.length; i++) {
                    this.questionService
                      .createQuestion(questions[i], response.body['id'])
                      .subscribe();
                  }
                }
              });
          }
          this.openSnackBar('Project created successfully.');
          this.router.navigate(['/mainPage/myArticles']);
        }
      });
    }
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  sendMail() {
    if (this.isEditing) {
      this.projectService
        .getAllApplicants(this.project.id)
        .subscribe((response) => {
          if (response.status == 200) {
            let applicants = response.body;
            console.log(applicants);
            for (let applicant of applicants) {
              this.emailService.sendUpdatedArticleEmail(
                applicant.email,
                this.project
              );
            }
          }
        });
    } else {
      this.userService
        .getAllSubscribers(this.profileService.profile.user!.id)
        .subscribe((response) => {
          if (response.status == 200) {
            let subscribers = response.body;
            console.log(subscribers);
            for (let subscriber of subscribers) {
              this.emailService.sendNewProjectEmail(
                subscriber.email,
                this.project
              );
            }
          }
        });
    }
  }

  back() {
    window.history.back();
  }
}
