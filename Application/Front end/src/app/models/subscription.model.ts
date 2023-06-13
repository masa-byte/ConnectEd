import { User } from '../user/user.model';

export interface Subscription {
    id: number;
    subscribedUser: User;
    subscribeeUser: User;
}
