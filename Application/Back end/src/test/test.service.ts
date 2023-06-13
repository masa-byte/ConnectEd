import { Injectable } from '@nestjs/common';
import { Test } from './test.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateTestDto } from './update-test.dto';
import { ProjectService } from '../project/project.service';

@Injectable()
export class TestService {

    constructor(@InjectRepository(Test) private testRepository: Repository<Test>,
        private projectService: ProjectService) { }

    async findAll(): Promise<Test[]> {
        return await this.testRepository.find();
    }

    async findOne(id: number): Promise<Test> {
        return await this.testRepository.findOneBy({ id });
    }

    async create(testDto: any, projectId: number): Promise<Test> {
        const test = new Test();

        test.duration = testDto.duration;

        await this.projectService.findOne(projectId).then(project => {
            test.project = project;
        });

        return await this.testRepository.save(test);
    }

    async update(id: number, updateTestDto: UpdateTestDto): Promise<Test> {
        const test = await this.testRepository.findOneBy({ id });
        if (!test) {
            throw new Error(`Test with id ${id} not found`);
        }
        test.duration = updateTestDto.duration;

        return await this.testRepository.save(test);
    }

    async delete(id: number): Promise<void> {
        await this.testRepository.delete(id);
    }
}
