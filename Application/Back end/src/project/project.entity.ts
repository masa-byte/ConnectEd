import { ProjectApplication } from '../applications/project-application/project-application.entity';
import { Test } from '../test/test.entity';
import { FacultyMember } from '../faculty-member/faculty-member.entity';
import { Faculty } from '../faculty/faculty.entity';
import { Student } from '../student/student.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne, OneToMany } from 'typeorm';

@Entity()
export class Project {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    type: string;

    @Column('varchar', {length: 500})
    description: string;

    @Column()
    contributors: number;

    @Column()
    durationInDays: number;

    @Column()
    postDate: Date;

    @Column('boolean', {default: false})
    closed: boolean;

    @OneToOne(() => Test, test => test.project, { cascade: true, onDelete: 'CASCADE' , eager: true })
    test: Test;

    @ManyToOne(() => FacultyMember, facultyMember => facultyMember.projects, { onDelete: 'CASCADE' , eager: true })
    facultyMember: FacultyMember;

    @ManyToOne(() => Student, student => student.projects, { onDelete: 'CASCADE' , eager: true })
    student: Student;

    @ManyToOne(() => Faculty, faculty => faculty.projects, { onDelete: 'CASCADE' , eager: true })
    faculty: Faculty;

    @OneToMany(() => ProjectApplication, projectApplication => projectApplication.project, { onDelete: 'CASCADE' })
    applications: ProjectApplication[];
}
