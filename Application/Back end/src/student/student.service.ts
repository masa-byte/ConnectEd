import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './student.entity';
import { UpdateStudentDto } from './update-student.dto.';
import { UserService } from '../user/user.service';
import { Project } from 'src/project/project.entity';
import { Paper } from 'src/paper/paper.entity';
import { ProjectApplication } from 'src/applications/project-application/project-application.entity';
import { PaperApplication } from 'src/applications/paper-application/paper-application.entity';
import { PaperService } from 'src/paper/paper.service';
import { ProjectService } from 'src/project/project.service';
import { PaperApplicationService } from 'src/applications/paper-application/paper-application.service';
import { ProjectApplicationService } from 'src/applications/project-application/project-application.service';

@Injectable()
export class StudentService {

    constructor(
        @InjectRepository(Student) private studentRepository: Repository<Student>,

        private projectApplicationService: ProjectApplicationService,
        private paperApplicationService: PaperApplicationService,

        @Inject(forwardRef(() => UserService))
        private userService: UserService,

        @Inject(forwardRef(() => ProjectService))
        private projectService: ProjectService,

        @Inject(forwardRef(() => PaperService))
        private paperService: PaperService
    ) { }

    async findAll(): Promise<Student[]> {
        return await this.studentRepository.find({
            relations: ['papers', 'projects', 'tags']
        });
    }

    async findOne(id: number): Promise<Student> {
        return await this.studentRepository.findOne({
            where: { id }
        })
    }

    async findProjectApplications(id: number): Promise<Project[]> {
        const student = await this.studentRepository.findOne({
            where: { id },
            relations: ['projectApplications']
        })

        const projectPromises = student.projectApplications.map(application =>
            this.projectApplicationService.findOne(application.id).then(app => app.project)
        );

        const projects = await Promise.all(projectPromises);

        return projects;
    }

    async findPaperApplications(id: number): Promise<Paper[]> {
        const student = await this.studentRepository.findOne({
            where: { id },
            relations: ['paperApplications']
        })

        const paperPromises = student.paperApplications.map(application =>
            this.paperApplicationService.findOne(application.id).then(app => app.paper)
        );

        const papers = await Promise.all(paperPromises);

        return papers;
    }

    async create(studentDto: any, userId: number): Promise<Student> {
        const std: Student = new Student();
        std.address = studentDto.address;
        std.name = studentDto.name;
        std.phoneNumber = studentDto.phoneNumber;
        std.faculty = studentDto.faculty;
        std.surname = studentDto.surname;
        std.username = studentDto.username;
        std.degreeLevel = studentDto.degreeLevel;
        std.experience = studentDto.experience;
        std.description = studentDto.description;
        std.gradeCount = studentDto.gradeCount;
        std.gradeSum = studentDto.gradeSum;

        await this.userService.findOne(userId).then((user) => {
            std.user = user;
        });

        const createdStudent = await this.studentRepository.save(std);
        const id: number = createdStudent.id;
        return this.studentRepository.findOne({
            where: { id }
        })
    }

    async update(id: number, updateStudentDto: any): Promise<Student> {
        const student = await this.studentRepository.findOneBy({ id });
        if (!student) {
            throw new Error(`Student with id ${id} not found`);
        }
        student.address = updateStudentDto.address;
        student.name = updateStudentDto.name;
        student.phoneNumber = updateStudentDto.phoneNumber;
        student.faculty = updateStudentDto.faculty;
        student.surname = updateStudentDto.surname;
        student.username = updateStudentDto.username;
        student.degreeLevel = updateStudentDto.degreeLevel;
        student.experience = updateStudentDto.experience;
        student.description = updateStudentDto.description;

        return await this.studentRepository.save(student);
    }

    async updateGrade(id: number, grade: number): Promise<Student> {
        const student = await this.studentRepository.findOneBy({ id });

        if (!student) {
            throw new Error(`Student with id ${id} not found`);
        }

        student.gradeCount++;
        student.gradeSum += grade;

        return await this.studentRepository.save(student);
    }

    async delete(id: number): Promise<void> {
        await this.studentRepository.delete(id);
    }

    async applyForArticle(studentId: number, articleId: number, articletype: string): Promise<void> {

        const student = await this.studentRepository.findOne(
            {
                where: { id: studentId },
                relations: ['paperApplications', 'projectApplications']
            }
        );
        if (articletype === 'paper') {
            const paper = await this.paperService.findOne(articleId);
            const checkApplication = await this.paperApplicationService.findOneBy(paper.id, student.id, 'student');

            if (checkApplication) {
                throw new Error('You have already applied for this article');
            }

            const paperApplication = new PaperApplication();
            paperApplication.student = student;
            paperApplication.paper = paper;

            await this.paperApplicationService.create(paperApplication);

            student.paperApplications.push(paperApplication);

        }
        else if (articletype === 'project') {
            const project = await this.projectService.findOne(articleId);
            const checkApplication = await this.projectApplicationService.findOneBy(project.id, student.id, 'student');

            if (checkApplication) {
                throw new Error('You have already applied for this article');
            }

            const projectApplication = new ProjectApplication();
            projectApplication.student = student;
            projectApplication.project = project;

            await this.projectApplicationService.create(projectApplication);

            student.projectApplications.push(projectApplication);
        }
        await this.studentRepository.save(student);
    }
}
