import { BookApplication } from '../applications/book-application/book-application.entity';
import { PaperApplication } from '../applications/paper-application/paper-application.entity';
import { ProjectApplication } from '../applications/project-application/project-application.entity';
import { Book } from '../book/book.entity';
import { Paper } from '../paper/paper.entity';
import { Project } from '../project/project.entity';
import { Tag } from '../tag/tag.entity';
import { User } from '../user/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class FacultyMember {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    surname: string;

    @Column()
    address: string;

    @Column({ unique: true })
    username: string;

    @Column()
    phoneNumber: string;

    @Column()
    faculty: string;

    @Column()
    academicTitle: string;

    @Column()
    experience: string;

    @Column('varchar', { length: 500 })
    description: string;

    @Column()
    gradeCount: number;

    @Column()
    gradeSum: number;

    @ManyToOne(() => User, user => user.facultyMembers, { onDelete: 'CASCADE', eager: true})
    user: User;

    @OneToMany(() => Tag, tag => tag.facultyMember, { eager: true } )
    tags: Tag[];

    @OneToMany(() => Paper, paper => paper.facultyMember, )
    papers: Paper[];

    @OneToMany(() => Book, book => book.facultyMember, )
    books: Book[];

    @OneToMany(() => Project, project => project.facultyMember, )
    projects: Project[];

    @OneToMany(() => BookApplication, bookApplication => bookApplication.facultyMember, )
    bookApplications: BookApplication[];

    @OneToMany(() => PaperApplication, paperApplication => paperApplication.facultyMember, )
    paperApplications: PaperApplication[];

    @OneToMany(() => ProjectApplication, projectApplication => projectApplication.facultyMember, )
    projectApplications: ProjectApplication[];
}
