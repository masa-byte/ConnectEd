import { Book } from "../../book/book.entity";
import { FacultyMember } from "../../faculty-member/faculty-member.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class BookApplication {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('boolean', { default: false })
    gradingDone: boolean;

    @ManyToOne(() => FacultyMember, facultyMember => facultyMember.bookApplications, { onDelete: 'CASCADE' , eager: true})
    facultyMember: FacultyMember;

    @ManyToOne(() => Book, book => book.applications, { onDelete: 'CASCADE' , eager: true})
    book: Book;
}