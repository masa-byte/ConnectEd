import { FacultyMember } from '../faculty-member/faculty-member.model';
import { Faculty } from '../faculty/faculty.model';
import { Student } from '../student/student.model';
import { Project } from './project.model';

export interface ProjectApplication {
  id: number;
  facultyMember: FacultyMember;
  student: Student;
  faculty: Faculty;
  project: Project;
}
