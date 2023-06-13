import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { Project } from './project.entity';
import { UpdateProjectDto } from './update-project.dto';
import { StudentService } from 'src/student/student.service';
import { FacultyMemberService } from 'src/faculty-member/faculty-member.service';
import { FacultyService } from 'src/faculty/faculty.service';
import { ProjectApplication } from 'src/applications/project-application/project-application.entity';

@Injectable()
export class ProjectService {

    constructor(@InjectRepository(Project)
    private projectRepository: Repository<Project>,

        @Inject(forwardRef(() => FacultyMemberService))
        private facultyMemberService: FacultyMemberService,

        @Inject(forwardRef(() => FacultyService))
        private facultyService: FacultyService,

        @Inject(forwardRef(() => StudentService))
        private studentService: StudentService
    ) { }

    async findAll(): Promise<Project[]> {
        return await this.projectRepository.find({
            where: { closed: false },
            relations: ['student', 'facultyMember', 'faculty', 'applications'],
        });
    }

    async findOne(id: number): Promise<Project> {
        return await this.projectRepository.findOne({
            where: { id },
            relations: ['student', 'facultyMember', 'faculty'],
        });
    }

    async findAllByCreatorId(creatorId: number, creatorType: string, isClosed: boolean): Promise<Project[]> {

        let options: FindOptionsWhere<Project> = {};

        if (creatorType === 'student') {
            options = { student: { id: creatorId } };
        }
        else if (creatorType === 'facultyMember') {
            options = { facultyMember: { id: creatorId } };
        }
        else if (creatorType === 'faculty') {
            options = { faculty: { id: creatorId } };
        }

        if (isClosed != null)
            options.closed = isClosed;

        return await this.projectRepository.findBy(options);
    }

    async findAllApplicationsByArticleId(creatorId: number): Promise<ProjectApplication[]> {

        return await this.projectRepository.findOne({
            where: { id: creatorId },
            relations: ['applications', 'applications.student', 'applications.student.user', 'applications.facultyMember', 'applications.facultyMember.user', 'applications.faculty', 'applications.faculty.user'],
        }).then((project) => {
            return project.applications;
        });
    }

    async findAllApplicantsByProjectId(projectId: number): Promise<any[]> {
        return await this.projectRepository.findOne({

            where: { id: projectId },
            relations: ['applications',
                'applications.student', 'applications.facultyMember', 'applications.faculty',
                'applications.student.user', 'applications.facultyMember.user', 'applications.faculty.user'],

        }).then((project) => {
            return project.applications.map((application) => {
                return application.student == null ?
                    application.facultyMember.user == null ?
                        application.faculty.user : application.facultyMember.user
                    : application.student.user;
            });
        });
    }

    async create(projectDto: any, creatorId: number, creatorType: string): Promise<Project> {
        const project = new Project();
        project.name = projectDto.name;
        project.type = projectDto.type;
        project.description = projectDto.description;
        project.contributors = projectDto.contributors;
        project.durationInDays = projectDto.durationInDays;
        project.postDate = new Date();

        switch (creatorType) {
            case 'student':
                await this.studentService.findOne(creatorId).then((student) => {
                    project.student = student;
                }); break;
            case 'facultyMember':
                await this.facultyMemberService.findOne(creatorId).then((facultyMember) => {
                    project.facultyMember = facultyMember;
                }); break;
            case 'faculty':
                await this.facultyService.findOne(creatorId).then((faculty) => {
                    project.faculty = faculty;
                }); break;
        }

        return await this.projectRepository.save(project);
    }

    async update(id: number, updateProjectDto: UpdateProjectDto): Promise<Project> {
        const project = await this.projectRepository.findOneBy({ id });
        if (!project) {
            throw new Error(`Project with id ${id} not found`);
        }
        project.name = updateProjectDto.name;
        project.type = updateProjectDto.type;
        project.description = updateProjectDto.description;
        project.contributors = updateProjectDto.contributors;
        project.durationInDays = updateProjectDto.durationInDays;

        return await this.projectRepository.save(project);
    }

    async delete(id: number): Promise<void> {
        await this.projectRepository.delete(id);
    }

    async close(id: number): Promise<any> {
        const project = await this.projectRepository.findOneBy({ id });
        if (!project) {
            throw new Error(`Project with id ${id} not found`);
        }
        project.closed = true;
        return await this.projectRepository.save(project);
    }
}
