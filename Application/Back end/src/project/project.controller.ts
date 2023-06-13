import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { Project } from './project.entity';
import { ProjectService } from './project.service';
import { UpdateProjectDto } from './update-project.dto';
import { ProjectApplication } from 'src/applications/project-application/project-application.entity';

@Controller('project')
export class ProjectController {

  constructor(private readonly projectService: ProjectService) { }

  @Post()
  create(@Body() project: any, @Query('creatorId') creatorId, @Query('creatorType') creatorType): Promise<Project> {
    return this.projectService.create(project, creatorId, creatorType);
  }

  @Get()
  findAll(): Promise<Project[]> {
    return this.projectService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Project> {
    return this.projectService.findOne(id);
  }

  @Get('/creator/:id/:creatorType')
  findAllByCreator(@Param('id', ParseIntPipe) id: number, @Param('creatorType') creatorType: string): Promise<Project[]> {
    return this.projectService.findAllByCreatorId(id, creatorType, null);
  }

  @Get('/applications/:id')
  findAllApplicationsbyArticleId(@Param('id', ParseIntPipe) id: number): Promise<ProjectApplication[]> {
    return this.projectService.findAllApplicationsByArticleId(id);
  }

  @Get('/applicants/:id')
  findAllApplicantsByProjectId(@Param('id', ParseIntPipe) id: number): Promise<any[]> {
    return this.projectService.findAllApplicantsByProjectId(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateProjectDto: any) {
    return this.projectService.update(parseInt(id), updateProjectDto);
  }

  @Put('/close/:id')
  close(@Param('id', ParseIntPipe) id: number) {
    return this.projectService.close(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<any> {
    return this.projectService.delete(parseInt(id));
  }
}
