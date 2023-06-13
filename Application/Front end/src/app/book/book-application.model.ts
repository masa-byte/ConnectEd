import { FacultyMember } from '../faculty-member/faculty-member.model';
import { Book } from './book.model';

export interface BookApplication {
    id: number;
    book: Book;
    facultyMember: FacultyMember;
}
