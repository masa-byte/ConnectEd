import { Body, Controller, Get, Param, Post, Delete, Put, ParseIntPipe, Query } from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './book.entity';
import { UpdateBookDto } from './update-book.dto';
import { BookApplication } from 'src/applications/book-application/book-application.entity';

@Controller('book')
export class BookController {

    constructor(private readonly bookService: BookService) { }

    @Post()
    create(@Body() bookDto: any, @Query('creatorId') creatorId: number): Promise<Book> {
        return this.bookService.create(bookDto, creatorId);
    }

    @Get()
    findAll() : Promise<Book[]> {
      return this.bookService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number): Promise<Book> {
      return this.bookService.findOne(id);
    }
   
    @Get('/creator/:id')
    findAllByFacultyMember(@Param('id', ParseIntPipe) id: number): Promise<Book[]> {
      return this.bookService.findAllByFacultyMemberId(id, null);
    }

    @Get('/applications/:id')
    findAllApplications(@Param('id', ParseIntPipe) id: number): Promise<BookApplication[]> {
      return this.bookService.findAllApplicationsById(id);
    }

    @Get('/applicants/:id')
    findAllApplicantsByBookId(@Param('id', ParseIntPipe) id: number): Promise<any[]> {
      return this.bookService.findAllApplicantsByBookId(id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateBookDto: any) {
      return this.bookService.update(parseInt(id), updateBookDto);
    }

    @Put('/close/:id')
    close(@Param('id', ParseIntPipe) id: number) {
      return this.bookService.close(id);
    }

    @Delete(':id')
    remove(@Param('id') id: string) : Promise<void> {
      return this.bookService.delete(parseInt(id));
    }
}
