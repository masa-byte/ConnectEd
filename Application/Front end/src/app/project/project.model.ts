import { FacultyMember } from '../faculty-member/faculty-member.model';
import { Faculty } from '../faculty/faculty.model';
import { Student } from '../student/student.model';
import { ProjectApplication } from './project-application.model';
import { Test } from './test/test.model';

export interface Project {
  id: number;
  name: string;
  type: string;
  description: string;
  contributors: number;
  durationInDays: number;
  closed?: boolean;
  test?: Test;
  facultyMember?: FacultyMember;
  student?: Student;
  faculty?: Faculty;
  applications?: ProjectApplication[];
}
