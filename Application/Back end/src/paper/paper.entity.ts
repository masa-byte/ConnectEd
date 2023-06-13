
import { PaperApplication } from '../applications/paper-application/paper-application.entity';
import { FacultyMember } from '../faculty-member/faculty-member.entity';
import { Student } from '../student/student.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany} from 'typeorm';

@Entity()
export class Paper {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    topic: string;

    @Column('varchar', {length: 500})
    description: string; 

    @Column()
    contributors: number;

    @Column()
    postDate: Date;

    @Column('boolean', {default: false})
    closed: boolean;

    @ManyToOne(() => Student, student => student.papers, { onDelete: 'CASCADE' , eager: true})
    student: Student;

    @ManyToOne(() => FacultyMember, facultyMember => facultyMember.papers, { onDelete: 'CASCADE' , eager: true})
    facultyMember: FacultyMember;

    @OneToMany(() => PaperApplication, paperApplication => paperApplication.paper, { onDelete: 'CASCADE' })
    applications: PaperApplication[];
}
