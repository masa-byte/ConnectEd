import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { Paper } from './paper.entity';
import { PaperService } from './paper.service';
import { UpdatePaperDto } from './update-paper.dto';
import { PaperApplication } from 'src/applications/paper-application/paper-application.entity';

@Controller('paper')
export class PaperController {

  constructor(private readonly paperService: PaperService) { }

  @Post()
  create(@Body() paperDto: any, @Query('creatorId') creatorId: number, @Query('creatorType') creatorType: string): Promise<Paper> {
    return this.paperService.create(paperDto, creatorId, creatorType);
  }

  @Get()
  findAll(): Promise<Paper[]> {
    return this.paperService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Paper> {
    return this.paperService.findOne(id);
  }

  @Get('/creator/:id/:creatorType')
  findAllByCreator(@Param('id', ParseIntPipe) id: number,@Param('creatorType') creatorType: string): Promise<Paper[]> {
    return this.paperService.findAllByCreatorId(id, creatorType, null);
  }

  @Get('/applications/:id')
  findAllApplicationsByArticleId(@Param('id', ParseIntPipe) id: number): Promise<PaperApplication[]> {
    return this.paperService.findAllApplicationsByArticleId(id);
  }

  @Get('/applicants/:id')
  findAllApplicantsByPaperId(@Param('id', ParseIntPipe) id: number): Promise<any[]> {
    return this.paperService.findAllApplicantsByPaperId(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatePaperDto: any) {
    return this.paperService.update(parseInt(id), updatePaperDto);
  }

  @Put('/close/:id')
  close(@Param('id', ParseIntPipe) id: number) {
    return this.paperService.close(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.paperService.delete(parseInt(id));
  }
}
