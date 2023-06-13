import { FacultyMember } from "../../faculty-member/faculty-member.entity";
import { Faculty } from "../../faculty/faculty.entity";
import { Project } from "../../project/project.entity";
import { Student } from "../../student/student.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ProjectApplication {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('boolean', { default: false })
    gradingDone: boolean;

    @ManyToOne(() => FacultyMember, facultyMember => facultyMember.projectApplications, { onDelete: 'CASCADE' , eager: true})
    facultyMember: FacultyMember;

    @ManyToOne(() => Student, student => student.projectApplications, { onDelete: 'CASCADE' , eager: true})
    student: Student;

    @ManyToOne(() => Faculty, faculty => faculty.projectApplications, { onDelete: 'CASCADE' , eager: true})
    faculty: Faculty;

    @ManyToOne(() => Project, project => project.applications, { onDelete: 'CASCADE' , eager: true})
    project: Project;
}