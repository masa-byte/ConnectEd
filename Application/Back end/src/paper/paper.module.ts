import { Module, forwardRef } from '@nestjs/common';
import { Paper } from './paper.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaperController } from './paper.controller';
import { PaperService } from './paper.service';
import { FacultyMemberModule } from 'src/faculty-member/faculty-member.module';
import { StudentModule } from 'src/student/student.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Paper]), 
        forwardRef(() => FacultyMemberModule), 
        forwardRef(() => StudentModule)
    ],
    controllers: [PaperController],
    providers: [PaperService],
    exports: [PaperService]
})
export class PaperModule {}
