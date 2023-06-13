import { Module, forwardRef } from '@nestjs/common';
import { Project } from './project.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { FacultyModule } from '../faculty/faculty.module';
import { FacultyMemberModule } from '../faculty-member/faculty-member.module';
import { StudentModule } from '../student/student.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Project]), 
        forwardRef(() => FacultyModule), 
        forwardRef(() => FacultyMemberModule), 
        forwardRef(() => StudentModule)
    ],
    providers: [ProjectService],
    controllers: [ProjectController],
    exports: [ProjectService]
})
export class ProjectModule { }
