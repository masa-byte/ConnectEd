import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { FacultyMember } from './faculty-member.entity';
import { FacultyMemberService } from './faculty-member.service';
import { UpdateFacultyMemberDto } from './update-faculty-member.dto';
import { Project } from 'src/project/project.entity';
import { Paper } from 'src/paper/paper.entity';
import { Book } from 'src/book/book.entity';

@Controller('faculty-member')
export class FacultyMemberController {

  constructor(private readonly facultyMemberService: FacultyMemberService) { }

  @Post()
  create(@Body() facultyMemberDto: any, @Query('userId') userId: number) {
    return this.facultyMemberService.create(facultyMemberDto, userId);
  }

  @Get()
  findAll(): Promise<FacultyMember[]> {
    return this.facultyMemberService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<FacultyMember> {
    return this.facultyMemberService.findOne(id);
  }

  @Get(':id/projectApplications')
  findProjectApplications(@Param('id', ParseIntPipe) id: number): Promise<Project[]> {
    return this.facultyMemberService.findProjectApplications(id);
  }

  @Get(':id/paperApplications')
  findPaperApplications(@Param('id', ParseIntPipe) id: number): Promise<Paper[]> {
    return this.facultyMemberService.findPaperApplications(id);
  }

  @Get(':id/bookApplications')
  findBookApplications(@Param('id', ParseIntPipe) id: number): Promise<Book[]> {
    return this.facultyMemberService.findBookApplications(id);
  }

  @Post(':facultyMemberId/article/:articleId')
  async applyForArticle(@Param('facultyMemberId', ParseIntPipe) facultyMemberId: number,
    @Param('articleId', ParseIntPipe) articleId: number,
    @Query('articleType') articleType: string,): Promise<void> {
    try {
      await this.facultyMemberService.applyForArticle(facultyMemberId, articleId, articleType);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateFacultyMemberDto: any) {
    return this.facultyMemberService.update(parseInt(id), updateFacultyMemberDto);
  }

  @Put(':id/:grade')
  updateGrade(@Param('id', ParseIntPipe) id: number, @Param('grade', ParseIntPipe) grade: number) {
    return this.facultyMemberService.updateGrade(id, grade);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.facultyMemberService.delete(parseInt(id));
  }
}
