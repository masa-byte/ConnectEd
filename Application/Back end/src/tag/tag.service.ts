import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from './tag.entity';
import { FacultyMemberService } from 'src/faculty-member/faculty-member.service';
import { FacultyService } from 'src/faculty/faculty.service';
import { StudentService } from 'src/student/student.service';

@Injectable()
export class TagService {

    constructor(@InjectRepository(Tag) 
    private tagRepository : Repository<Tag>,
    private facultyMemberService: FacultyMemberService, 
    private studentService: StudentService, 
    private facultyService: FacultyService) {}

    async findAll(): Promise<Tag[]> {
        return await this.tagRepository.find();
    }

    async findOne(id: number): Promise<Tag> {
        return await this.tagRepository.findOneBy({id});
    }

    async create(tagDto: any, creatorId: number, creatorType: string): Promise<Tag> {
        const tag = new Tag();
        tag.text = tagDto.text;

        switch (creatorType) {
            case 'student':
                await this.studentService.findOne(creatorId).then((student) => {
                    tag.student = student;
                }); break;
            case 'facultyMember':
                await this.facultyMemberService.findOne(creatorId).then((facultyMember) => {
                    tag.facultyMember = facultyMember;
                }); break;
            case 'faculty':
                await this.facultyService.findOne(creatorId).then((faculty) => {
                    tag.faculty = faculty;
                }); break;
        }

        return await this.tagRepository.save(tag);
    }

    async delete(id: number): Promise<void> {
        await this.tagRepository.delete({id});
    }
}
