import { Sub } from '../subs/subs.entity';
import { FacultyMember } from '../faculty-member/faculty-member.entity';
import { Faculty } from '../faculty/faculty.entity';
import { Student } from '../student/student.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';


@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column()
    type: string;

    @OneToMany(() => Faculty, faculty => faculty.user,)
    faculties: Faculty[];

    @OneToMany(() => FacultyMember, facultyMember => facultyMember.user,)
    facultyMembers: FacultyMember[];

    @OneToMany(() => Student, student => student.user,)
    students: Student[];

    @OneToMany(() => Sub, subscribtion => subscribtion.subscribeeUser,)
    subscribers: Sub[];

    @OneToMany(() => Sub, subscribtion => subscribtion.subscribedUser,)
    subscribees: Sub[];

    async setPassword(password: string): Promise<void> {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        this.password = hashedPassword;
    }

    async comparePassword(password: string): Promise<boolean> {
        return bcrypt.compare(password, this.password);
    }
}
