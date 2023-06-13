import { FacultyMember } from '../faculty-member/faculty-member.model';
import { Student } from '../student/student.model';
import { Paper } from './paper.model';

export interface PaperApplication {
  id: number;
  facultyMember: FacultyMember;
  student: Student;
  paper: Paper;
}
