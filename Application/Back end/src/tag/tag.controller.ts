import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { Tag } from './tag.entity';
import { TagService } from './tag.service';

@Controller('tag')
export class TagController {

  constructor(private readonly tagService: TagService) { }

  @Post()
  create(@Body() tag: any, @Query('creatorId') creatorId, @Query('creatorType') creatorType): Promise<Tag> {
    return this.tagService.create(tag, creatorId, creatorType);
  }

  @Get()
  findAll(): Promise<Tag[]> {
    return this.tagService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Tag> {
    return this.tagService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.tagService.delete(id);
  }
}
