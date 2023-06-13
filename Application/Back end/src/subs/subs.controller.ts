import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { Sub } from './subs.entity';
import { SubscriptionService } from './subs.service';

@Controller('subscription')
export class SubscriptionController {

    constructor(private readonly subscriptionService: SubscriptionService) { }

    @Post()
    create(@Body() subscription: Sub): Promise<Sub> {
        return this.subscriptionService.create(subscription);
    }

    @Get()
    findAll() : Promise<Sub[]> {
      return this.subscriptionService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number): Promise<Sub> {
      return this.subscriptionService.findOne(id);
    }

    @Delete(':id')
    remove(@Param('id') id: string) : Promise<void> {
      return this.subscriptionService.delete(parseInt(id));
    }
}
