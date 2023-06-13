import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { ProjectApplication } from './project-application.entity';

@Injectable()
export class ProjectApplicationService {
  constructor(
    @InjectRepository(ProjectApplication)
    private projectApplicationRepository: Repository<ProjectApplication>,
  ) {}

  async findAll(): Promise<ProjectApplication[]> {
    return await this.projectApplicationRepository.find();
  }

  async findOne(id: number): Promise<ProjectApplication> {
    return await this.projectApplicationRepository.findOneBy({ id });
  }

  async findOneBy(
    projectId: number,
    creatorId: number,
    creatorType: string,
  ): Promise<ProjectApplication> {
    let options: FindOneOptions<ProjectApplication> = {};
    if (creatorType == 'student') {
      options = {
        where: {
          project: { id: projectId },
          student: { id: creatorId },
        },
      };
    } else if (creatorType == 'facultyMember') {
      options = {
        where: {
          project: { id: projectId },
          facultyMember: { id: creatorId },
        },
      };
    } else if (creatorType == 'faculty') {
      options = {
        where: {
          project: { id: projectId },
          faculty: { id: creatorId },
        },
      };
    }

    return await this.projectApplicationRepository.findOne(options);
  }

  async findUngradedProjectsByApplicantId(
    applicantId: number,
    applicantType: string,
  ): Promise<ProjectApplication[]> {
    let options: FindOneOptions<ProjectApplication> = {};
    if (applicantType == 'student') {
      options = {
        where: {
          student: { id: applicantId },
          gradingDone: false,
          project: {
            closed: true,
          },
        },
        relations: ['project'],
      };
    } else if (applicantType == 'facultyMember') {
      options = {
        where: {
          facultyMember: { id: applicantId },
          gradingDone: false,
          project: {
            closed: true,
          },
        },
        relations: ['project'],
      };
    } else if (applicantType == 'faculty') {
      options = {
        where: {
          faculty: { id: applicantId },
          gradingDone: false,
          project: {
            closed: true,
          },
        },
        relations: ['project'],
      };
    }
    return await this.projectApplicationRepository.find(options);
  }

  async finishGrading(
    projectId: number,
    applicantId: number,
    applicantType: string,
  ): Promise<ProjectApplication> {
    let options: FindOneOptions<ProjectApplication> = {};
    if (applicantType == 'student') {
      options = {
        where: {
          student: { id: applicantId },
          project: {
            id: projectId,
          },
        },
      };
    } else if (applicantType == 'facultyMember') {
      options = {
        where: {
          facultyMember: { id: applicantId },
          project: {
            id: projectId,
          },
        },
      };
    } else if (applicantType == 'faculty') {
      options = {
        where: {
          faculty: { id: applicantId },
          project: {
            id: projectId,
          },
        },
      };
    }
    let projectApplication = await this.projectApplicationRepository.findOne(
      options,
    );
    if (projectApplication)
        projectApplication.gradingDone = true;
    else
        throw new Error('Application not found');
    return await this.projectApplicationRepository.save(projectApplication);
  }

  async create(
    projectApplication: ProjectApplication,
  ): Promise<ProjectApplication> {
    return await this.projectApplicationRepository.save(projectApplication);
  }

  async delete(id: number): Promise<void> {
    await this.projectApplicationRepository.delete(id);
  }

  async deleteByArticleAndApplicantId(
    projectId: number,
    applicantId: number,
    applicantType: string,
  ): Promise<void> {
    if (applicantType == 'student') {
      await this.projectApplicationRepository.delete({
        project: { id: projectId },
        student: { id: applicantId },
      });
    } else if (applicantType == 'facultyMember') {
      await this.projectApplicationRepository.delete({
        project: { id: projectId },
        facultyMember: { id: applicantId },
      });
    } else if (applicantType == 'faculty') {
      await this.projectApplicationRepository.delete({
        project: { id: projectId },
        faculty: { id: applicantId },
      });
    } else throw new Error(`Invalid applicant type: ${applicantType}`);
  }

  async checkIfApplicationExists(
    projectId: number,
    applicantId: number,
    applicantType: string,
  ): Promise<boolean> {
    let application = null;
    if (applicantType == 'student') {
      application = await this.projectApplicationRepository.findOneBy({
        project: { id: projectId },
        student: { id: applicantId },
      });
    } else if (applicantType == 'facultyMember') {
      application = await this.projectApplicationRepository.findOneBy({
        project: { id: projectId },
        facultyMember: { id: applicantId },
      });
    } else if (applicantType == 'faculty') {
      application = await this.projectApplicationRepository.findOneBy({
        project: { id: projectId },
        faculty: { id: applicantId },
      });
    }
    return application != null;
  }
}
