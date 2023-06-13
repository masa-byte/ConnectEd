import { FacultyMember } from '../faculty-member/faculty-member.model';
import { Student } from '../student/student.model';
import { PaperApplication } from './paper-application.model';

export interface Paper {
    id: number;
    title: string;
    topic: string;
    description: string;
    contributors: number;
    closed?: boolean;
    student?: Student;
    facultyMember?: FacultyMember;
    applications: PaperApplication[];
}
