import { Module, forwardRef } from '@nestjs/common';
import { Faculty } from './faculty.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FacultyService } from './faculty.service';
import { FacultyController } from './faculty.controller';
import { UserModule } from 'src/user/user.module';
import { ProjectModule } from 'src/project/project.module';
import { ProjectApplicationModule } from 'src/applications/project-application/project-application.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Faculty]), 
        forwardRef(() => UserModule), 
        forwardRef(() => ProjectModule), 
        ProjectApplicationModule
    ],
    providers: [FacultyService],
    controllers: [FacultyController],
    exports: [FacultyService]
})
export class FacultyModule {}
