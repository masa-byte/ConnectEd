import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { BookApplication } from './book-application.entity';
import { Book } from 'src/book/book.entity';

@Injectable()
export class BookApplicationService {
  constructor(
    @InjectRepository(BookApplication)
    private bookApplicationRepository: Repository<BookApplication>,
  ) {}

  async findAll(): Promise<BookApplication[]> {
    return await this.bookApplicationRepository.find();
  }

  async findOne(id: number): Promise<BookApplication> {
    return await this.bookApplicationRepository.findOneBy({ id });
  }

  async findOneBy(
    bookId: number,
    facultyMemberId: number,
  ): Promise<BookApplication> {
    const options: FindOneOptions<BookApplication> = {
      where: {
        book: { id: bookId },
        facultyMember: { id: facultyMemberId },
      },
    };
    return await this.bookApplicationRepository.findOne(options);
  }

  async findUngradedBooksByApplicantId(
    applicantId: number,
  ): Promise<BookApplication[]> {
    const options: FindOneOptions<BookApplication> = {
      where: {
        facultyMember: { id: applicantId },
        gradingDone: false,
        book: {
          closed: true,
        },
      },
      relations: ['book'],
    };
    return await this.bookApplicationRepository.find(options);
  }

  async finishGrading(
    bookId: number,
    applicantId: number,
  ): Promise<BookApplication> {
    const options: FindOneOptions<BookApplication> = {
      where: {
        facultyMember: { id: applicantId },
        book: {
          id: bookId,
        },
      },
      relations: ['book'],
    };
    const bookApplicationToUpdate =
      await this.bookApplicationRepository.findOne(options);
    if (bookApplicationToUpdate) bookApplicationToUpdate.gradingDone = true;
    else throw new Error('Book application not found');
    return await this.bookApplicationRepository.save(bookApplicationToUpdate);
  }

  async create(bookApplication: BookApplication): Promise<BookApplication> {
    return await this.bookApplicationRepository.save(bookApplication);
  }

  async delete(id: number): Promise<void> {
    await this.bookApplicationRepository.delete(id);
  }

  async deleteByApplicantAndArticleId(
    bookId: number,
    applicantId: number,
  ): Promise<void> {
    await this.bookApplicationRepository.delete({
      book: { id: bookId },
      facultyMember: { id: applicantId },
    });
  }
}
