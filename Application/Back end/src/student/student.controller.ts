import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { Student } from './student.entity';
import { StudentService } from './student.service';
import { UpdateStudentDto } from './update-student.dto.';
import { Project } from 'src/project/project.entity';
import { Paper } from 'src/paper/paper.entity';

@Controller('student')
export class StudentController {

  constructor(private readonly studentService: StudentService) { }

  @Post()
  create(@Body() studentDto: any, @Query('userId') userId: number) {
    return this.studentService.create(studentDto, userId);
  }

  @Get()
  findAll(): Promise<Student[]> {
    return this.studentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Student> {
    return this.studentService.findOne(id);
  }

  @Get(':id/projectApplications')
  findProjectApplications(@Param('id', ParseIntPipe) id: number): Promise<Project[]> {
    return this.studentService.findProjectApplications(id);
  }

  @Get(':id/paperApplications')
  findPaperApplications(@Param('id', ParseIntPipe) id: number): Promise<Paper[]> {
    return this.studentService.findPaperApplications(id);
  }

  @Post(':studentId/article/:articleId')
  async applyForArticle(@Param('studentId', ParseIntPipe) studentId: number, 
  @Param('articleId', ParseIntPipe) articleId: number, 
  @Query('articleType') articleType: string,): Promise<void> {
    try {
      await this.studentService.applyForArticle(studentId, articleId, articleType);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateStudentDto: any) {
    return this.studentService.update(id, updateStudentDto);
  }

  @Put(':id/:grade')
  updateGrade(@Param('id', ParseIntPipe) id: number, @Param('grade', ParseIntPipe) grade: number) {
    return this.studentService.updateGrade(id, grade);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.studentService.delete(parseInt(id));
  }
}
