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
import { ProjectApplication } from './project-application.entity';
import { ProjectApplicationService } from './project-application.service';

@Controller('project-application')
export class ProjectApplicationController {
  constructor(
    private readonly projectApplicationService: ProjectApplicationService,
  ) {}

  @Post()
  create(
    @Body() projectApplication: ProjectApplication,
  ): Promise<ProjectApplication> {
    return this.projectApplicationService.create(projectApplication);
  }

  @Put('/:projectId/:applicantId/:applicantType')
  finishGrading(
    @Param('projectId') projectId: number,
    @Param('applicantId') applicantId: number,
    @Param('applicantType') applicantType: string,
  ): Promise<ProjectApplication> {
    return this.projectApplicationService.finishGrading(
      projectId,
      applicantId,
      applicantType,
    );
  }

  @Get()
  findAll(): Promise<ProjectApplication[]> {
    return this.projectApplicationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<ProjectApplication> {
    return this.projectApplicationService.findOne(id);
  }

  @Get('/checkIfApplicationExists/:projectId/:applicantId/:applicantType')
  checkIfApplicationExists(
    @Param('projectId', ParseIntPipe) projectId: number,
    @Param('applicantId', ParseIntPipe) applicantId: number,
    @Param('applicantType') applicantType: string,
  ): Promise<boolean> {
    return this.projectApplicationService.checkIfApplicationExists(
      projectId,
      applicantId,
      applicantType,
    );
  }

  @Get('/ungraded/:applicantId/:applicantType')
  findUngradedProjectsByApplicantId(
    @Param('applicantId', ParseIntPipe) applicantId: number,
    @Param('applicantType') applicantType: string,
  ): Promise<ProjectApplication[]> {
    return this.projectApplicationService.findUngradedProjectsByApplicantId(
      applicantId,
      applicantType,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.projectApplicationService.delete(parseInt(id));
  }

  @Delete(':projectId/:applicantId/:applicantType')
  removeByArticleAndApplicantId(
    @Param('projectId') projectId: string,
    @Param('applicantId') applicantId: string,
    @Param('applicantType') applicantType: string,
  ): Promise<void> {
    return this.projectApplicationService.deleteByArticleAndApplicantId(
      parseInt(projectId),
      parseInt(applicantId),
      applicantType,
    );
  }
}
