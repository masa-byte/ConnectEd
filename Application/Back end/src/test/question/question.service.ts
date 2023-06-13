import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from './question.entity';
import { UpdateQuestionDto } from './update-question.dto';
import { TestService } from '../test.service';

@Injectable()
export class QuestionService {

    constructor(@InjectRepository(Question) private questionRepository: Repository<Question>,
        private testService: TestService) { }

    async findAll(): Promise<Question[]> {
        return await this.questionRepository.find();
    }

    async findOne(id: number): Promise<Question> {
        return await this.questionRepository.findOneBy({ id });
    }

    async create(questionDto: any, testId: number): Promise<any> {
        const question = new Question();

        question.text = questionDto.text;
        question.points = questionDto.points;
        question.correctAnswerIndex = questionDto.correctAnswerIndex;
        question.answer1 = questionDto.answer1;
        question.answer2 = questionDto.answer2;
        question.answer3 = questionDto.answer3;
        question.answer4 = questionDto.answer4;

        await this.testService.findOne(testId).then(test => {
            question.test = test;
        });

        return await this.questionRepository.save(question);
    }

    async update(id: number, updateQuestionDto: UpdateQuestionDto): Promise<Question> {
        const question = await this.questionRepository.findOneBy({ id });
        if (!question) {
            throw new Error(`Question with id ${id} not found`);
        }
        question.text = updateQuestionDto.text;
        question.points = updateQuestionDto.points;
        question.correctAnswerIndex = updateQuestionDto.correctAnswerIndex;
        question.answer1 = updateQuestionDto.answer1;
        question.answer2 = updateQuestionDto.answer2;
        question.answer3 = updateQuestionDto.answer3;
        question.answer4 = updateQuestionDto.answer4;

        return await this.questionRepository.save(question);
    }

    async delete(id: number): Promise<void> {
        await this.questionRepository.delete(id);
    }
}
