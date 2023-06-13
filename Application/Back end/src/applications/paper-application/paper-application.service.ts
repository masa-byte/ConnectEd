import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  DeleteOptions,
  FindOneOptions,
  RemoveOptions,
  Repository,
} from 'typeorm';
import { PaperApplication } from './paper-application.entity';

@Injectable()
export class PaperApplicationService {
  constructor(
    @InjectRepository(PaperApplication)
    private paperApplicationRepository: Repository<PaperApplication>,
  ) {}

  async findAll(): Promise<PaperApplication[]> {
    return await this.paperApplicationRepository.find();
  }

  async findOne(id: number): Promise<PaperApplication> {
    return await this.paperApplicationRepository.findOneBy({ id });
  }

  async findOneBy(
    paperId: number,
    creatorId: number,
    creatorType: string,
  ): Promise<PaperApplication> {
    let options: FindOneOptions<PaperApplication> = {};
    if (creatorType == 'student') {
      options = {
        where: {
          paper: { id: paperId },
          student: { id: creatorId },
        },
      };
    } else if (creatorType == 'facultyMember') {
      options = {
        where: {
          paper: { id: paperId },
          facultyMember: { id: creatorId },
        },
      };
    }

    return await this.paperApplicationRepository.findOne(options);
  }

  async findUngradedPapersByApplicantId(
    applicantId: number,
    applicantType: string,
  ): Promise<PaperApplication[]> {
    let options: FindOneOptions<PaperApplication> = {};
    if (applicantType == 'student') {
      options = {
        where: {
          student: { id: applicantId },
          gradingDone: false,
          paper: {
            closed: true,
          },
        },
        relations: ['paper'],
      };
    } else if (applicantType == 'facultyMember') {
      options = {
        where: {
          facultyMember: { id: applicantId },
          gradingDone: false,
          paper: {
            closed: true,
          },
        },
        relations: ['paper'],
      };
    } else throw new Error(`Invalid applicant type: ${applicantType}`);
    return await this.paperApplicationRepository.find(options);
  }

  async finishGrading(
    paperId: number,
    applicantId: number,
    applicantType: string,
  ): Promise<PaperApplication> {
    let options: FindOneOptions<PaperApplication> = {};
    if (applicantType == 'student') {
      options = {
        where: {
          student: { id: applicantId },
          paper: {
            id: paperId,
          },
        },
        relations: ['paper'],
      };
    } else if (applicantType == 'facultyMember') {
      options = {
        where: {
          facultyMember: { id: applicantId },
          paper: {
            id: paperId,
          },
        },
        relations: ['paper'],
      };
    } else throw new Error(`Invalid applicant type: ${applicantType}`);
    const paperApplicationToUpdate =
      await this.paperApplicationRepository.findOne(options);
    if (paperApplicationToUpdate) paperApplicationToUpdate.gradingDone = true;
    else throw new Error('Paper application not found');
    return await this.paperApplicationRepository.save(paperApplicationToUpdate);
  }

  async create(paperApplication: PaperApplication): Promise<PaperApplication> {
    return await this.paperApplicationRepository.save(paperApplication);
  }

  async delete(id: number): Promise<void> {
    await this.paperApplicationRepository.delete(id);
  }

  async deleteByArticleAndApplicantId(
    paperId: number,
    applicantId: number,
    applicantType: string,
  ): Promise<void> {
    if (applicantType == 'student') {
      await this.paperApplicationRepository.delete({
        paper: { id: paperId },
        student: { id: applicantId },
      });
    } else if (applicantType == 'facultyMember') {
      await this.paperApplicationRepository.delete({
        paper: { id: paperId },
        facultyMember: { id: applicantId },
      });
    } else throw new Error(`Invalid applicant type: ${applicantType}`);
  }
}
