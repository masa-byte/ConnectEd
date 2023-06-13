import { PaperApplication } from '../applications/paper-application/paper-application.entity';
import { ProjectApplication } from '../applications/project-application/project-application.entity';
import { Paper } from '../paper/paper.entity';
import { Project } from '../project/project.entity';
import { Tag } from '../tag/tag.entity';
import { User } from '../user/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Student {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    surname: string;

    @Column()
    address: string;

    @Column({unique: true})
    username: string;

    @Column()
    phoneNumber: string;

    @Column()
    faculty: string;

    @Column()
    degreeLevel: string;

    @Column()
    experience: string;

    @Column('varchar', {length: 500})
    description: string;

    @Column()
    gradeCount: number;

    @Column()
    gradeSum: number;

    @ManyToOne(() => User, user => user.students, { onDelete: 'CASCADE', eager: true})
    user: User;

    @OneToMany(() => Tag, tag => tag.student, {eager: true})
    tags: Tag[];

    @OneToMany(() => Paper, paper => paper.student, )
    papers: Paper[];

    @OneToMany(() => Project, project => project.student, )
    projects: Project[];

    @OneToMany(() => PaperApplication, paperApplication => paperApplication.student, )
    paperApplications: PaperApplication[];

    @OneToMany(() => ProjectApplication, projectApplication => projectApplication.student, )
    projectApplications: ProjectApplication[];
}
