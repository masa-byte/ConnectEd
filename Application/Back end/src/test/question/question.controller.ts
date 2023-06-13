import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { Question } from './question.entity';
import { QuestionService } from './question.service';
import { UpdateQuestionDto } from './update-question.dto';

@Controller('question')
export class QuestionController {

  constructor(private readonly questionService: QuestionService) { }

  @Post()
  create(@Body() question: any, @Query('testId') testId: number): Promise<any> {
    return this.questionService.create(question, testId);
  }

  @Get()
  findAll(): Promise<Question[]> {
    return this.questionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Question> {
    return this.questionService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateQuestionDto: UpdateQuestionDto) {
    return this.questionService.update(parseInt(id), updateQuestionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.questionService.delete(parseInt(id));
  }
}
