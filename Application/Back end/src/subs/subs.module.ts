import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubscriptionController } from './subs.controller';
import { SubscriptionService } from './subs.service';
import { Sub } from './subs.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Sub])],
    controllers: [SubscriptionController],
    providers: [SubscriptionService],
    exports: [SubscriptionService]
})
export class SubModule {}
