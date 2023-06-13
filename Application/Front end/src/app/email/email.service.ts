import { Injectable } from '@angular/core';
import { Paper } from '../paper/paper.model';
import { Book } from '../book/book.model';
import { Project } from '../project/project.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { url } from 'environment/environment.dev';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  constructor(private http: HttpClient) { }

  sendDeclineEmail(email: string, application: any) {
    let article: string = '';

    if ('name' in application) {
      article = application.name;
    } else if ('title' in application) {
      article = application.title;
    }

    let text: string = `Your application for ${article} has been declined by owner. Please contact the owner for more information.`;
    let subject: string = 'Application Declined';
    this.sendEmail(email, subject, text).subscribe((response) => { });
  }

  sendAcceptEmail(email: string, application: any, date: Date, time: string) {
    let article: string = '';

    if ('name' in application) {
      article = application.name;
    } else if ('title' in application) {
      article = application.title;
    }
    let text: string = `Your application for ${article} has been accepted. Meeting date is ${date.toLocaleDateString()} and time ${time}. Please contact the owner for more information.`;
    let subject: string = 'Application Accepted';
    //TODO:add date and time
    this.sendEmail(email, subject, text).subscribe((response) => { });
  }

  sendNewPaperEmail(email: string, paper: Paper) {
    let text: string = `A new paper has been added to the system. Please check it out.\n`;
    text += `Title: ${paper.title}\n`;
    text += `Topic: ${paper.topic}\n`;
    text += `Description: ${paper.description}\n`;
    let subject: string = 'New Paper';

    this.sendEmail(email, subject, text).subscribe((response) => { });
  }

  sendNewBookEmail(email: string, book: Book) {
    let text: string = `A new book has been added to the system. Please check it out.\n`;
    text += `Title: ${book.title}\n`;
    text += `Topic: ${book.topic}\n`;
    text += `Description: ${book.description}\n`;
    let subject: string = 'New Book';

    this.sendEmail(email, subject, text).subscribe((response) => { });
  }

  sendNewProjectEmail(email: string, project: Project) {
    let text: string = `A new project has been added to the system. Please check it out.\n`;
    text += `Name: ${project.name}\n`;
    text += `Type: ${project.type}\n`;
    text += `Description: ${project.description}\n`;
    let subject: string = 'New Project';

    this.sendEmail(email, subject, text).subscribe((response) => { });
  }

  sendUpdatedArticleEmail(email: string, article: Book | Paper | Project) {
    let text: string = `An article of person/faculty you are subscribed to has been updated. Please check it out.\n`;
    if ('name' in article) {
      text += `Name: ${article.name}\n`;
    } else if ('title' in article) {
      text += `Title: ${article.title}\n`;
    }

    let subject: string = 'Updated Article';

    this.sendEmail(email, subject, text).subscribe((response) => { });
  }

  sendReviewResultsMail(
    email: string | undefined,
    author: string,
    result: number,
    title: string | undefined
  ) {
    let text: string = `The grade ${author} gave you after review of article ${title} has been ${result}.`;
    let subject: string = 'Review Results';

    if (email !== undefined) {
      this.sendEmail(email, subject, text).subscribe((response) => {
      });
    }
  }

  private sendEmail(
    to: string,
    subject: string,
    text: string
  ): Observable<HttpResponse<any>> {
    return this.http.post(
      url + '/email',
      {
        to: to,
        subject: subject,
        text: text,
      },
      { observe: 'response' }
    );
  }
}
