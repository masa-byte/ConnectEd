import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { BookApplication } from './book-application.entity';
import { BookApplicationService } from './book-application.service';

@Controller('bookApplication')
export class BookApplicationController {
  constructor(
    private readonly bookApplicationService: BookApplicationService,
  ) {}

  @Post()
  create(@Body() bookApplication: BookApplication): Promise<BookApplication> {
    return this.bookApplicationService.create(bookApplication);
  }

  @Put('/:bookId/:applicantId')
  finishGrading(
    @Param('bookId') bookId: number,
    @Param('applicantId') applicantId: number,
  ): Promise<BookApplication> {
    return this.bookApplicationService.finishGrading(bookId, applicantId);
  }

  @Get()
  findAll(): Promise<BookApplication[]> {
    return this.bookApplicationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<BookApplication> {
    return this.bookApplicationService.findOne(id);
  }

  @Get('ungraded/:applicantId')
  findUngradedBooksByApplicantId(
    @Param('applicantId', ParseIntPipe) applicantId: number,
  ): Promise<BookApplication[]> {
    return this.bookApplicationService.findUngradedBooksByApplicantId(
      applicantId,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.bookApplicationService.delete(parseInt(id));
  }

  @Delete(':bookId/:applicantId')
  removeByApplicantAndArticleId(
    @Param('bookId') bookId: string,
    @Param('applicantId') applicantId: string,
  ): Promise<void> {
    return this.bookApplicationService.deleteByApplicantAndArticleId(
      parseInt(bookId),
      parseInt(applicantId),
    );
  }
}
