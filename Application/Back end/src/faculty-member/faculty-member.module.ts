import { Module, forwardRef } from '@nestjs/common';
import { FacultyMember } from './faculty-member.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FacultyMemberService } from './faculty-member.service';
import { FacultyMemberController } from './faculty-member.controller';
import { UserModule } from 'src/user/user.module';
import { BookModule } from 'src/book/book.module';
import { PaperModule } from 'src/paper/paper.module';
import { ProjectModule } from 'src/project/project.module';
import { ProjectApplicationModule } from 'src/applications/project-application/project-application.module';
import { BookApplicationModule } from 'src/applications/book-application/book-application.module';
import { PaperApplicationModule } from 'src/applications/paper-application/paper-application.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([FacultyMember]), 
        forwardRef(() => UserModule), 
        forwardRef(() => ProjectModule), 
        forwardRef(() => PaperModule), 
        forwardRef(() => BookModule),
        ProjectApplicationModule,
        BookApplicationModule,
        PaperApplicationModule
    ],
    providers: [FacultyMemberService],
    controllers: [FacultyMemberController],
    exports: [FacultyMemberService]
})
export class FacultyMemberModule {}
