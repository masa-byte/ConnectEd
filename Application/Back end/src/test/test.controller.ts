import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { Test } from './test.entity';
import { TestService } from './test.service';
import { UpdateTestDto } from './update-test.dto';

@Controller('test')
export class TestController {

  constructor(private readonly testService: TestService) { }

  @Post()
  create(@Body() test: any, @Query('projectId') projectId: number): Promise<Test> {
    return this.testService.create(test, projectId);
  }

  @Get()
  findAll(): Promise<Test[]> {
    return this.testService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Test> {
    return this.testService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTestDto: UpdateTestDto) {
    return this.testService.update(parseInt(id), updateTestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.testService.delete(parseInt(id));
  }
}
