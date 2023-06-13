import { Module, forwardRef } from '@nestjs/common';
import { Student } from './student.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { UserModule } from 'src/user/user.module';
import { ProjectModule } from 'src/project/project.module';
import { PaperModule } from 'src/paper/paper.module';
import { ProjectApplicationModule } from 'src/applications/project-application/project-application.module';
import { PaperApplicationModule } from 'src/applications/paper-application/paper-application.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Student]), 
        forwardRef(() => UserModule), 
        forwardRef(() => ProjectModule), 
        forwardRef(() => PaperModule),
        ProjectApplicationModule,
        PaperApplicationModule
    ],
    providers: [StudentService],
    controllers: [StudentController],
    exports: [StudentService]
})
export class StudentModule {}
