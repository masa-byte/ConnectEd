import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { Paper } from './paper.entity';
import { UpdatePaperDto } from './update-paper.dto';
import { StudentService } from 'src/student/student.service';
import { FacultyMemberService } from 'src/faculty-member/faculty-member.service';
import { PaperApplication } from 'src/applications/paper-application/paper-application.entity';

@Injectable()
export class PaperService {

    constructor(
        @InjectRepository(Paper) private paperRepository: Repository<Paper>,

        @Inject(forwardRef(() => StudentService))
        private studentService: StudentService,

        @Inject(forwardRef(() => FacultyMemberService))
        private facultyMemberService: FacultyMemberService,
    ) { }

    async findAll(): Promise<Paper[]> {
        return await this.paperRepository.find({
            where: { closed: false },
            relations: ['student', 'facultyMember', 'applications'],
        });
    }

    async findOne(id: number): Promise<Paper> {
        return await this.paperRepository.findOne({
            where: { id },
            relations: ['student', 'facultyMember'],
        });
    }

    async findAllByCreatorId(creatorId: number, creatorType: string, isClosed: boolean): Promise<Paper[]> {
        let options: FindOptionsWhere<Paper> = {};

        if (creatorType === 'student') {
            options = { student: { id: creatorId } };
        }
        else if (creatorType === 'facultyMember') {
            options = { facultyMember: { id: creatorId } };
        }

        if (isClosed != null)
            options.closed = isClosed;

        return await this.paperRepository.findBy(options);
    }

    async findAllApplicationsByArticleId(creatorId: number): Promise<PaperApplication[]> {
        return await this.paperRepository.findOne({
            where: { id: creatorId },
            relations: ['applications', 'applications.student', 'applications.student.user', 'applications.facultyMember', 'applications.facultyMember.user'],
        }).then((paper) => {
            return paper.applications;
        });
    }

    async findAllApplicantsByPaperId(paperId: number): Promise<any[]> {
        return await this.paperRepository.findOne({

            where: { id: paperId },
            relations: ['applications',
                'applications.student', 'applications.facultyMember',
                'applications.student.user', 'applications.facultyMember.user'],

        }).then((paper) => {
            return paper.applications.map((application) => {
                return application.student == null ? application.facultyMember.user : application.student.user;
            });
        });
    }


    async create(paperDto: any, creatorId: number, creatorType: string): Promise<Paper> {
        const paper = new Paper();
        paper.title = paperDto.title;
        paper.topic = paperDto.topic;
        paper.description = paperDto.description;
        paper.contributors = paperDto.contributors;
        paper.postDate = new Date();

        if (creatorType === 'student') {
            await this.studentService.findOne(creatorId).then((student) => {
                paper.student = student;
            });
        }
        else if (creatorType === 'facultyMember') {
            await this.facultyMemberService.findOne(creatorId).then((facultyMember) => {
                paper.facultyMember = facultyMember;
            });
        }
        return await this.paperRepository.save(paper);
    }

    async update(id: number, updatePaperDto: UpdatePaperDto): Promise<Paper> {
        const paper = await this.paperRepository.findOneBy({ id });
        if (!paper) {
            throw new Error(`Paper with id ${id} not found`);
        }
        paper.title = updatePaperDto.title;
        paper.topic = updatePaperDto.topic;
        paper.description = updatePaperDto.description;
        paper.contributors = updatePaperDto.contributors;
        return await this.paperRepository.save(paper);
    }

    async delete(id: number): Promise<void> {
        await this.paperRepository.delete(id);
    }

    async close(id: number): Promise<any> {
        const paper = await this.paperRepository.findOneBy({ id });
        if (!paper) {
            throw new Error(`Paper with id ${id} not found`);
        }
        paper.closed = true;
        return await this.paperRepository.save(paper);
    }
}
