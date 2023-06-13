import { Subscription } from 'rxjs';
import { FacultyMember } from '../faculty-member/faculty-member.model';
import { Faculty } from '../faculty/faculty.model';
import { Student } from '../student/student.model';

export interface User {
  id: number;
  email: string;
  password: string;
  type: string;
  faculties: Faculty[];
  facultyMembers: FacultyMember[];
  students: Student[];
  subscribers: Subscription[];
  subscribees: Subscription[];
}
