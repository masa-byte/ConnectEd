import { User } from '../user/user.model';

export interface Faculty {
  id: number;
  name: string;
  address: string;
  phoneNumber: string;
  university: string;
  description: string;
  user?: User;
  tags?: string[];
}
