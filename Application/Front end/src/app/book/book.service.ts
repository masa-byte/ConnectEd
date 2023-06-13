import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from './book.model';
import { Observable } from 'rxjs';
import { url } from 'environment/environment.dev';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  constructor(private http: HttpClient) { }

  editBook: Book | null = null;

  createBook(book: Book): Observable<HttpResponse<any>> {
    return this.http.post(
      url + '/book?creatorId=' + book.facultyMember?.id,
      {
        title: book.title,
        topic: book.topic,
        description: book.description,
        contributors: book.contributors,
      },
      { observe: 'response' }
    );
  }

  closeBook(bookId: number): Observable<HttpResponse<any>> {
    return this.http.put<any>(url + `/book/close/${bookId}`, {
      observe: 'response',
    });
  }

  getBook(id: number): Observable<HttpResponse<any>> {
    return this.http.get(url + `/book/${id}`, { observe: 'response' });
  }

  getAllBooks(): Observable<HttpResponse<any>> {
    return this.http.get(url + '/book', { observe: 'response' });
  }

  getCreatorBooks(id: number): Observable<HttpResponse<any>> {
    return this.http.get(url + `/book/creator/${id}`, { observe: 'response' });
  }

  getAllApplicants(id: number): Observable<HttpResponse<any>> {
    return this.http.get(url + `/book/applicants/${id}`, {
      observe: 'response',
    });
  }

  updateBook(book: Book): Observable<HttpResponse<any>> {
    return this.http.put(
      url + `/book/${book.id}`,
      {
        title: book.title,
        topic: book.topic,
        description: book.description,
        contributors: book.contributors,
      },
      { observe: 'response' }
    );
  }
}
