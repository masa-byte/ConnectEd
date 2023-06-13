import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Test } from './test.entity';
import { Question } from './question/question.entity';
import { TestController } from './test.controller';
import { QuestionController } from './question/question.controller';
import { QuestionService } from './question/question.service';
import { TestService } from './test.service';
import { ProjectModule } from '../project/project.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Test, Question]), 
        ProjectModule
    ],
    controllers: [TestController, QuestionController],
    providers: [QuestionService, TestService],
})
export class TestModule { }
