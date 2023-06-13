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
import { PaperApplication } from './paper-application.entity';
import { PaperApplicationService } from './paper-application.service';

@Controller('paper-application')
export class PaperApplicationController {
  constructor(
    private readonly paperApplicationService: PaperApplicationService,
  ) {}

  @Post()
  create(
    @Body() paperApplication: PaperApplication,
  ): Promise<PaperApplication> {
    return this.paperApplicationService.create(paperApplication);
  }

  @Put('/:paperId/:applicantId/:applicantType')
  finishGrading(
    @Param('paperId') paperId: number,
    @Param('applicantId') applicantId: number,
    @Param('applicantType') applicantType: string,
  ): Promise<PaperApplication> {
    return this.paperApplicationService.finishGrading(
      paperId,
      applicantId,
      applicantType,
    );
  }

  @Get()
  findAll(): Promise<PaperApplication[]> {
    return this.paperApplicationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<PaperApplication> {
    return this.paperApplicationService.findOne(id);
  }

  @Get('/ungraded/:applicantId/:applicantType')
  findUngradedPapersByApplicantId(
    @Param('applicantId', ParseIntPipe) applicantId: number,
    @Param('applicantType') applicantType: string,
  ): Promise<PaperApplication[]> {
    return this.paperApplicationService.findUngradedPapersByApplicantId(
      applicantId,
      applicantType,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.paperApplicationService.delete(parseInt(id));
  }

  @Delete(':paperId/:applicantId/:applicantType')
  removeByArticleAndApplicantId(
    @Param('paperId') paperId: string,
    @Param('applicantId') applicantId: string,
    @Param('applicantType') applicantType: string,
  ): Promise<void> {
    return this.paperApplicationService.deleteByArticleAndApplicantId(
      parseInt(paperId),
      parseInt(applicantId),
      applicantType,
    );
  }
}
