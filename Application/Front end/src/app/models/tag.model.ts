import { FacultyMember } from '../faculty-member/faculty-member.model';
import { Faculty } from '../faculty/faculty.model';
import { Student } from '../student/student.model';

export interface Tag {
    id: number;
    text: string;
    student: Student;
    facultyMember: FacultyMember;
    faculty: Faculty;
}
