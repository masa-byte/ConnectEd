import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { Faculty } from './faculty.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateFacultyDto } from './update-faculty.dto';
import { UserService } from 'src/user/user.service';
import { Project } from 'src/project/project.entity';
import { ProjectService } from 'src/project/project.service';
import { ProjectApplication } from 'src/applications/project-application/project-application.entity';
import { ProjectApplicationService } from 'src/applications/project-application/project-application.service';

@Injectable()
export class FacultyService {
    constructor(
        @InjectRepository(Faculty) private facultyRepository: Repository<Faculty>,

        private projectApplicationService: ProjectApplicationService,

        @Inject(forwardRef(() => UserService))
        private userService: UserService,

        @Inject(forwardRef(() => ProjectService))
        private readonly projectService: ProjectService,
    ) { }

    async findAll(): Promise<Faculty[]> {
        return await this.facultyRepository.find({
            relations: ['projects', 'tags']
        });
    }

    async findOne(id: number): Promise<Faculty> {
        return await this.facultyRepository.findOne({
            where: { id }
        });
    }

    async findProjectApplications(id: number): Promise<Project[]> {

        const faculty = await this.facultyRepository.findOne({
            where: { id },
            relations: ['projectApplications']
        })

        const projectPromises = faculty.projectApplications.map(application =>
            this.projectApplicationService.findOne(application.id).then(app => app.project)
        );

        const projects = await Promise.all(projectPromises);

        return projects;
    }

    async create(facultyDto: any, userId: number): Promise<Faculty> {
        const fac: Faculty = new Faculty();
        fac.name = facultyDto.name;
        fac.address = facultyDto.address;
        fac.phoneNumber = facultyDto.phoneNumber;
        fac.university = facultyDto.university;
        fac.description = facultyDto.description;

        await this.userService.findOne(userId).then((user) => {
            fac.user = user;
        });

        const savedFaculty = await this.facultyRepository.save(fac);
        const id: number = savedFaculty.id;
        return this.facultyRepository.findOne({
            where: { id }
        })
    }

    async update(id: number, updateFacultyDto: any): Promise<Faculty> {
        const faculty = await this.facultyRepository.findOneBy({ id });
        if (!faculty) {
            throw new Error(`Faculty with id ${id} not found`);
        }
        faculty.address = updateFacultyDto.address;
        faculty.description = updateFacultyDto.description;
        faculty.name = updateFacultyDto.name;
        faculty.phoneNumber = updateFacultyDto.phoneNumber;
        faculty.university = updateFacultyDto.univeristy;

        return await this.facultyRepository.save(faculty);
    }

    async delete(id: number): Promise<void> {
        await this.facultyRepository.delete(id);
    }

    async applyForArticle(facultyId: number, articleId: number): Promise<void> {
        const faculty = await this.facultyRepository.findOne(
            { where: { id: facultyId }, 
            relations: ['projectApplications'] }
        )
        const project = await this.projectService.findOne(articleId);
        const checkApplication = await this.projectApplicationService.findOneBy(project.id, faculty.id, 'faculty');

        if (checkApplication) {
            throw new Error('You have already applied for this article');
        }

        const projectApplication = new ProjectApplication();
        projectApplication.faculty = faculty;
        projectApplication.project = project;

        await this.projectApplicationService.create(projectApplication);

        faculty.projectApplications.push(projectApplication);
        
        await this.facultyRepository.save(faculty);
    }
}
