import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from './tag.entity';
import { TagController } from './tag.controller';
import { TagService } from './tag.service';
import { FacultyMemberModule } from 'src/faculty-member/faculty-member.module';
import { FacultyModule } from 'src/faculty/faculty.module';
import { StudentModule } from 'src/student/student.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Tag]), 
        FacultyModule, 
        FacultyMemberModule, 
        StudentModule
    ],
    controllers: [TagController],
    providers: [TagService],
})
export class TagModule {}
