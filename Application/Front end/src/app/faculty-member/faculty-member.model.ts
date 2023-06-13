import { User } from '../user/user.model';

export interface FacultyMember {
    id: number;
    name: string;
    surname: string;
    address: string;
    username: string;
    phoneNumber: string;
    faculty: string;
    academicTitle: string;
    experience: string;
    description: string;
    gradeCount: number;
    gradeSum: number;
    user?: User;
    tags?: string[];
}
