import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { FacultyService } from './faculty.service';
import { Faculty } from './faculty.entity';
import { UpdateFacultyDto } from './update-faculty.dto';
import { Project } from 'src/project/project.entity';

@Controller('faculty')
export class FacultyController {
  constructor(private readonly facultyService: FacultyService) { }

  @Post()
  create(@Body() facultyDto: any, @Query('userId') userId: number): Promise<Faculty> {
    return this.facultyService.create(facultyDto, userId);
  }

  @Get()
  findAll(): Promise<Faculty[]> {
    return this.facultyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Faculty> {
    return this.facultyService.findOne(id);
  }

  @Get(':id/projectApplications')
  findProjectApplications(@Param('id', ParseIntPipe) id: number): Promise<Project[]> {
    return this.facultyService.findProjectApplications(id);
  }

  @Post(':facultyId/article/:articleId')
  async applyForArticle(@Param('facultyId', ParseIntPipe) facultyId: number, @Param('articleId', ParseIntPipe) articleId: number): Promise<void> {
    try {
      await this.facultyService.applyForArticle(facultyId, articleId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateFacultyDto: any) {
    return this.facultyService.update(parseInt(id), updateFacultyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.facultyService.delete(parseInt(id));
  }
}
