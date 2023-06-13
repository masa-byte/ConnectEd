import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, FindOptions, FindOptionsRelations, FindOptionsWhere, Repository } from 'typeorm';
import { UpdateBookDto } from './update-book.dto';
import { Book } from './book.entity';
import { FacultyMemberService } from 'src/faculty-member/faculty-member.service';
import { BookApplication } from 'src/applications/book-application/book-application.entity';

@Injectable()
export class BookService {

    constructor(
        @InjectRepository(Book) private bookRepository: Repository<Book>,

        @Inject(forwardRef(() => FacultyMemberService))
        private readonly facultyMemberService: FacultyMemberService,
    ) { }

    async findAll(): Promise<Book[]> {
        return await this.bookRepository.find({
            where: { closed: false },
            relations: ['facultyMember', 'applications'],
        });
    }

    async findOne(id: number): Promise<Book> {
        return await this.bookRepository.findOne({
            where: { id },
            relations: ['facultyMember'],
        });
    }

    async findAllByFacultyMemberId(facultyMemberId: number, isClosed: boolean): Promise<Book[]> {
        let options: FindOptionsWhere<Book> = {
            facultyMember: { id: facultyMemberId },
        };

        if (isClosed != null)
            options.closed = isClosed;

        return await this.bookRepository.findBy(options);
    }

    async findAllApplicationsById(id: number): Promise<BookApplication[]> {
        return await this.bookRepository.findOne({
            where: { id },
            relations: ['applications', 'applications.facultyMember', 'applications.facultyMember.user']
        }).then((book) => {
            return book.applications;
        });
    }

    async findAllApplicantsByBookId(bookId: number): Promise<any[]> {
        return await this.bookRepository.findOne({

            where: { id: bookId },
            relations: ['applications', 'applications.facultyMember', 'applications.facultyMember.user'],

        }).then((book) => {
            return book.applications.map((application) => {
                return application.facultyMember.user;
            });
        });
    }

    async create(bookDto: any, creatorId: number): Promise<Book> {
        const book = new Book();
        book.title = bookDto.title;
        book.topic = bookDto.topic;
        book.description = bookDto.description;
        book.contributors = bookDto.contributors;
        book.postDate = new Date();

        await this.facultyMemberService.findOne(creatorId).then((facultyMember) => {
            book.facultyMember = facultyMember;
        });
        return await this.bookRepository.save(book);
    }

    async update(id: number, updateBookDto: UpdateBookDto): Promise<Book> {
        const book = await this.bookRepository.findOneBy({ id });
        if (!book) {
            throw new Error(`Book with id ${id} not found`);
        }
        book.title = updateBookDto.title;
        book.topic = updateBookDto.topic;
        book.description = updateBookDto.description;
        book.contributors = updateBookDto.contributors;
        return await this.bookRepository.save(book);
    }

    async delete(id: number): Promise<void> {
        await this.bookRepository.delete(id);
    }

    async close(id: number): Promise<any> {
        const book = await this.bookRepository.findOneBy({ id });
        if (!book) {
            throw new Error(`Book with id ${id} not found`);
        }
        book.closed = true;
        return await this.bookRepository.save(book);
    }
}
