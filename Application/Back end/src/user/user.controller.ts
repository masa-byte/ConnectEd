import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { UpdateUserDto } from './update-user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';
import { Sub } from '../subs/subs.entity';
import { Book } from 'src/book/book.entity';
import { Paper } from 'src/paper/paper.entity';
import { Project } from 'src/project/project.entity';

@Controller('user')
export class UserController {

  constructor(private readonly userService: UserService) { }

  @Post()
  create(@Body() user: User): Promise<User> {
    return this.userService.create(user);
  }

  @Post('subscribe/:subscriberId/:subscribesToId')
  subscribe(@Param('subscriberId', ParseIntPipe) subscriberId: number,
    @Param('subscribesToId', ParseIntPipe) subscribesToId: number): Promise<Sub> {
    return this.userService.subscribe(subscriberId, subscribesToId);
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get('checkIfSubscribed/:subscriberId/:subscribeeId')
  checkIfSubscribed(@Param('subscriberId', ParseIntPipe) subscriberId: number,
    @Param('subscribeeId', ParseIntPipe) subscribeeId: number): Promise<boolean> {
    return this.userService.checkIfSubscribed(subscriberId, subscribeeId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.userService.findOne(id);
  }

  @Get('email/:email')
  findOneByEmail(@Param('email') email: string): Promise<User> {
    return this.userService.findOneByEmail(email);
  }

  @Get('subscribers/:id')
  findSubscribers(@Param('id', ParseIntPipe) id: number): Promise<User[]> {
    return this.userService.findAllSubscribers(id);
  }

  @Get('subscribees/:id/books')
  findSubscribeesBooks(@Param('id', ParseIntPipe) id: number): Promise<Book[]> {
    return this.userService.findSubscribeesBooks(id);
  }

  @Get('subscribees/:id/papers')
  findSubscribeesPapers(@Param('id', ParseIntPipe) id: number): Promise<Paper[]> {
    return this.userService.findSubscribeesPapers(id);
  }

  @Get('subscribees/:id/projects')
  findSubscribeesProjects(@Param('id', ParseIntPipe) id: number): Promise<Project[]> {
    return this.userService.findSubscribeesProjects(id);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<boolean> {
    return this.userService.delete(id);
  }

  @Delete('unsubscribe/:subscriberId/:subscribesToId')
  unsubscribe(@Param('subscriberId', ParseIntPipe) subscriberId: number,
    @Param('subscribesToId', ParseIntPipe) subscribesToId: number): Promise<boolean> {
    return this.userService.unsubscribe(subscriberId, subscribesToId);
  }
}
