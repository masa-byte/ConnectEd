import { User } from '../user/user.model';

export interface Student {
  id: number;
  name: string;
  surname: string;
  address: string;
  username: string;
  phoneNumber: string;
  faculty: string;
  degreeLevel: string;
  experience: string;
  description: string;
  gradeCount: number;
  gradeSum: number;
  user?: User;
  tags?: string[];
}
