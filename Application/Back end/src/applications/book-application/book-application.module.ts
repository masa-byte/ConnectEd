import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookApplication } from './book-application.entity';
import { BookApplicationService } from './book-application.service';
import { BookApplicationController } from './book-application.controller';

@Module({
    imports: [TypeOrmModule.forFeature([BookApplication])],
    providers: [BookApplicationService],
    controllers: [BookApplicationController],
    exports: [BookApplicationService]
})
export class BookApplicationModule {}
