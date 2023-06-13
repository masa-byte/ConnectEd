import { FacultyMember } from '../faculty-member/faculty-member.entity';
import { Faculty } from '../faculty/faculty.entity';
import { Student } from '../student/student.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Tag {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    text: string;

    @ManyToOne(() => Student, student => student.tags, { onDelete: 'CASCADE' })
    student: Student;

    @ManyToOne(() => FacultyMember, facultyMember => facultyMember.tags, { onDelete: 'CASCADE' })
    facultyMember: FacultyMember;

    @ManyToOne(() => Faculty, faculty => faculty.tags, { onDelete: 'CASCADE' })
    faculty: Faculty;
}
