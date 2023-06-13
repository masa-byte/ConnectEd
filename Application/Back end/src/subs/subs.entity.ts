import { User } from "../user/user.entity";
import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Sub {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.subscribers, { onDelete: 'CASCADE' })
    subscribeeUser: User;
  
    @ManyToOne(() => User, user => user.subscribees, { onDelete: 'CASCADE' })
    subscribedUser: User;
}