import { FacultyMember } from "../../faculty-member/faculty-member.entity";
import { Paper } from "../../paper/paper.entity";
import { Student } from "../../student/student.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PaperApplication {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('boolean', { default: false })
    gradingDone: boolean;

    @ManyToOne(() => FacultyMember, facultyMember => facultyMember.paperApplications, { onDelete: 'CASCADE' , eager: true})
    facultyMember: FacultyMember;

    @ManyToOne(() => Student, student => student.paperApplications, { onDelete: 'CASCADE' , eager: true})
    student: Student;

    @ManyToOne(() => Paper, paper => paper.applications, { onDelete: 'CASCADE' , eager: true})
    paper: Paper;
}