import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FacultyMember } from './faculty-member.entity';
import { UpdateFacultyMemberDto } from './update-faculty-member.dto';
import { UserService } from '../user/user.service';
import { Project } from 'src/project/project.entity';
import { Paper } from 'src/paper/paper.entity';
import { Book } from 'src/book/book.entity';
import { ProjectService } from 'src/project/project.service';
import { PaperService } from 'src/paper/paper.service';
import { BookService } from 'src/book/book.service';
import { PaperApplication } from 'src/applications/paper-application/paper-application.entity';
import { ProjectApplication } from 'src/applications/project-application/project-application.entity';
import { BookApplication } from 'src/applications/book-application/book-application.entity';
import { BookApplicationService } from 'src/applications/book-application/book-application.service';
import { PaperApplicationService } from 'src/applications/paper-application/paper-application.service';
import { ProjectApplicationService } from 'src/applications/project-application/project-application.service';

@Injectable()
export class FacultyMemberService {

    constructor(
        @InjectRepository(FacultyMember) private facultyMemberRepository: Repository<FacultyMember>,
   
        private projectApplicationService: ProjectApplicationService,
        private paperApplicationService: PaperApplicationService,
        private bookApplicationService: BookApplicationService,
        
        @Inject(forwardRef(() => UserService))
        private userService: UserService,
        
        @Inject(forwardRef(() => ProjectService))
        private projectService: ProjectService,

        @Inject(forwardRef(() => PaperService))
        private paperService: PaperService,

        @Inject(forwardRef(() => BookService))
        private bookService: BookService
    ) { }

    async findAll(): Promise<FacultyMember[]> {
        return await this.facultyMemberRepository.find({
            relations: ['papers', 'projects', 'books', 'tags']
        });
    }

    async findOne(id: number): Promise<FacultyMember> {
        return await this.facultyMemberRepository.findOne({
            where: { id }
        })
    }

    async findProjectApplications(id: number): Promise<Project[]> {

        const facultyMember = await this.facultyMemberRepository.findOne({
            where: { id },
            relations: ['projectApplications']
        })

        const projectPromises = facultyMember.projectApplications.map(application =>
            this.projectApplicationService.findOne(application.id).then(app => app.project)
        );

        const projects = await Promise.all(projectPromises);

        return projects;
    }

    async findPaperApplications(id: number): Promise<Paper[]> {

        const facultyMember = await this.facultyMemberRepository.findOne({
            where: { id },
            relations: ['paperApplications']
        })

        const paperPromises = facultyMember.paperApplications.map(application =>
            this.paperApplicationService.findOne(application.id).then(app => app.paper)
        );

        const papers = await Promise.all(paperPromises);

        return papers;
    }

    async findBookApplications(id: number): Promise<Book[]> {

        const facultyMember = await this.facultyMemberRepository.findOne({
            where: { id },
            relations: ['bookApplications']
        })

        const bookPromises = facultyMember.bookApplications.map(application =>
            this.bookApplicationService.findOne(application.id).then(app => app.book)
        );

        const books = await Promise.all(bookPromises);

        return books;
    }

    async create(facultyMemberDto: any, userId: number): Promise<FacultyMember> {
        const fm: FacultyMember = new FacultyMember();
        fm.address = facultyMemberDto.address;
        fm.name = facultyMemberDto.name;
        fm.academicTitle = facultyMemberDto.academicTitle;
        fm.description = facultyMemberDto.description;
        fm.experience = facultyMemberDto.experience;
        fm.faculty = facultyMemberDto.faculty;
        fm.gradeCount = facultyMemberDto.gradeCount;
        fm.gradeSum = facultyMemberDto.gradeSum;
        fm.phoneNumber = facultyMemberDto.phoneNumber;
        fm.surname = facultyMemberDto.surname;
        fm.username = facultyMemberDto.username;

        await this.userService.findOne(userId).then((user) => {
            fm.user = user;
        });

        const createdFM = await this.facultyMemberRepository.save(fm);
        const id: number = createdFM.id;
        return this.facultyMemberRepository.findOne({
            where: { id }
        })
    }

    async update(id: number, updateFacultyMemberDto: any): Promise<FacultyMember> {
        const facultyMember = await this.facultyMemberRepository.findOneBy({ id });
        if (!facultyMember) {
            throw new Error(`FacultyMember with id ${id} not found`);
        }
        facultyMember.address = updateFacultyMemberDto.address;
        facultyMember.name = updateFacultyMemberDto.name;
        facultyMember.phoneNumber = updateFacultyMemberDto.phoneNumber;
        facultyMember.faculty = updateFacultyMemberDto.faculty;
        facultyMember.surname = updateFacultyMemberDto.surname;
        facultyMember.username = updateFacultyMemberDto.username;
        facultyMember.academicTitle = updateFacultyMemberDto.academicTitle;
        facultyMember.experience = updateFacultyMemberDto.experience;
        facultyMember.description = updateFacultyMemberDto.description;
        facultyMember.gradeCount = updateFacultyMemberDto.gradeCount;
        facultyMember.gradeSum = updateFacultyMemberDto.gradeSum;

        return await this.facultyMemberRepository.save(facultyMember);
    }

    async updateGrade(id: number, grade: number): Promise<FacultyMember> {
        const facultyMember = await this.facultyMemberRepository.findOneBy({ id });

        if (!facultyMember) {
            throw new Error(`FacultyMember with id ${id} not found`);
        }

        facultyMember.gradeCount++;
        facultyMember.gradeSum += grade;

        return await this.facultyMemberRepository.save(facultyMember);
    }

    async delete(id: number): Promise<void> {
        await this.facultyMemberRepository.delete(id);
    }

    async applyForArticle(facultyMemberId: number, articleId: number, articletype: string): Promise<void> {
        const facultyMember = await this.facultyMemberRepository.findOne(
            {
                where: { id: facultyMemberId },
                relations: ['paperApplications', 'projectApplications', 'bookApplications']
            }
        );

        if (articletype === 'paper') {
            const paper = await this.paperService.findOne(articleId);
            const checkApplication = await this.paperApplicationService.findOneBy(paper.id, facultyMember.id, 'facultyMember');

            if (checkApplication) {
                throw new Error('You have already applied for this article');
            }

            const paperApplication = new PaperApplication();
            paperApplication.facultyMember = facultyMember;
            paperApplication.paper = paper;

            await this.paperApplicationService.create(paperApplication);

            facultyMember.paperApplications.push(paperApplication);

        }
        else if (articletype === 'project') {
            const project = await this.projectService.findOne(articleId);
            const checkApplication = await this.projectApplicationService.findOneBy(project.id, facultyMember.id, 'facultyMember');

            if (checkApplication) {
                throw new Error('You have already applied for this article');
            }

            const projectApplication = new ProjectApplication();
            projectApplication.facultyMember = facultyMember;
            projectApplication.project = project;

            await this.projectApplicationService.create(projectApplication);

            facultyMember.projectApplications.push(projectApplication);
        }
        else if (articletype === 'book') {
            const book = await this.bookService.findOne(articleId);
            const checkApplication = await this.bookApplicationService.findOneBy(book.id, facultyMember.id);

            if (checkApplication) {
                throw new Error('You have already applied for this article');
            }

            const bookApplication = new BookApplication();
            bookApplication.facultyMember = facultyMember;
            bookApplication.book = book;

            await this.bookApplicationService.create(bookApplication);

            facultyMember.bookApplications.push(bookApplication);
        }
        await this.facultyMemberRepository.save(facultyMember);
    }
}
