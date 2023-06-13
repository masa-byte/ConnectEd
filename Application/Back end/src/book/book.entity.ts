import { BookApplication } from '../applications/book-application/book-application.entity';
import { FacultyMember } from '../faculty-member/faculty-member.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Book {
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

    @ManyToOne(() => FacultyMember, facultyMember => facultyMember.books, { onDelete: 'CASCADE' , eager: true})
    facultyMember: FacultyMember;

    @OneToMany(() => BookApplication, bookApplication => bookApplication.book, { onDelete: 'CASCADE'  })
    applications: BookApplication[];
}
