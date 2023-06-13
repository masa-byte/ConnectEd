import { Module, forwardRef } from '@nestjs/common';
import { Book } from './book.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { FacultyMemberModule } from 'src/faculty-member/faculty-member.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Book]), 
        forwardRef(() => FacultyMemberModule)
    ],
    providers: [BookService],
    controllers: [BookController],
    exports: [BookService]
})
export class BookModule {}
