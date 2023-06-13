import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './update-user.dto';
import { User } from './user.entity';
import { Sub } from '../subs/subs.entity';
import { SubscriptionService } from '../subs/subs.service';
import { Book } from 'src/book/book.entity';
import { Paper } from 'src/paper/paper.entity';
import { Project } from 'src/project/project.entity';
import { BookService } from 'src/book/book.service';
import { PaperService } from 'src/paper/paper.service';
import { ProjectService } from 'src/project/project.service';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        private subService: SubscriptionService,
        private bookService: BookService,
        private paperService: PaperService,
        private projectService: ProjectService
    ) { }

    async findAll(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async findOne(id: number): Promise<User> {
        return await this.userRepository.findOne({
            where: { id },
            relations: ['students', 'faculties', 'facultyMembers', 'subscribers', 'subscribees'],
        });
    }

    async findOneByEmail(email: string): Promise<User | null> {
        return await this.userRepository.findOneBy({ email });
    }

    async create(user: User): Promise<User> {
        return await this.userRepository.save(user);
    }

    async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
        const user = await this.userRepository.findOneBy({ id });
        if (!user) {
            throw new Error(`User with id ${id} not found`);
        }
        user.email = updateUserDto.email;
        user.password = updateUserDto.password;

        return await this.userRepository.save(user);
    }

    async delete(id: number): Promise<boolean> {
        await this.userRepository.delete(id);
        return true;
    }

    async checkIfSubscribed(subscriberId: number, subscribeeId: number): Promise<boolean> {
        const subscription = await this.subService.findOneBySubscriberAndSubscribee(subscriberId, subscribeeId);
        return subscription ? true : false;
    }

    async subscribe(subscriberId: number, subscribesToId: number): Promise<Sub> {

        let subscriber = await this.userRepository.findOne(
            { where: { id: subscriberId } }
        );
        let subscribee = await this.userRepository.findOne(
            { where: { id: subscribesToId } }
        );

        const subscription = new Sub();
        subscription.subscribedUser = subscriber;
        subscription.subscribeeUser = subscribee;

        const promise = await this.subService.create(subscription);

        return promise;
    }

    async unsubscribe(subscriberId: number, subscribesToId: number): Promise<boolean> {

        const subscription = await this.subService.findOneBySubscriberAndSubscribee(subscriberId, subscribesToId);

        await this.subService.delete(subscription.id);
        return true;
    }

    async findSubscribeesBooks(id: number): Promise<Book[]> {

        const user = await this.userRepository.findOne({
            where: { id },
            relations: ['subscribees', 'subscribees.subscribeeUser', 'subscribees.subscribeeUser.facultyMembers'],
        });

        const requests = user.subscribees.map((sub) => {
            if (sub.subscribeeUser.type === 'facultyMember') {
                const facultyMemberId = sub.subscribeeUser.facultyMembers[0].id;
                return this.bookService.findAllByFacultyMemberId(facultyMemberId, false);
            }
        });

        if (requests.length === 0) return [];

        const books = await Promise.all(requests);

        return books.flat();
    }

    async findSubscribeesPapers(id: number): Promise<Paper[]> {

        const user = await this.userRepository.findOne({
            where: { id },
            relations: ['subscribees', 'subscribees.subscribeeUser',
                'subscribees.subscribeeUser.facultyMembers', 'subscribees.subscribeeUser.students'],
        });

        const requests = user.subscribees.map((sub) => {
            if (sub.subscribeeUser.type === 'facultyMember') {
                const facultyMemberId = sub.subscribeeUser.facultyMembers[0].id;
                return this.paperService.findAllByCreatorId(facultyMemberId, 'facultyMember', false);
            }
            else if (sub.subscribeeUser.type === 'student') {
                const studentId = sub.subscribeeUser.students[0].id;
                return this.paperService.findAllByCreatorId(studentId, 'student', false);
            }
        });

        if (requests.length === 0) return [];

        const papers = await Promise.all(requests);

        return papers.flat();
    }

    async findSubscribeesProjects(id: number): Promise<Project[]> {
        const user = await this.userRepository.findOne({
            where: { id },
            relations: ['subscribees', 'subscribees.subscribeeUser',
                'subscribees.subscribeeUser.facultyMembers', 'subscribees.subscribeeUser.students', 'subscribees.subscribeeUser.faculties'],
        });

        const requests = user.subscribees.map((sub) => {
            if (sub.subscribeeUser.type === 'facultyMember') {
                const facultyMemberId = sub.subscribeeUser.facultyMembers[0].id;
                return this.projectService.findAllByCreatorId(facultyMemberId, 'facultyMember', false);
            }
            else if (sub.subscribeeUser.type === 'student') {
                const studentId = sub.subscribeeUser.students[0].id;
                return this.projectService.findAllByCreatorId(studentId, 'student', false);
            }
            else if (sub.subscribeeUser.type === 'faculty') {
                const facultyId = sub.subscribeeUser.faculties[0].id;
                return this.projectService.findAllByCreatorId(facultyId, 'faculty', false);
            }
        });

        if (requests.length === 0) return [];

        const projects = await Promise.all(requests);
        return projects.flat();
    }

    async findAllSubscribers(id: number): Promise<User[]> {
        const user = await this.userRepository.findOne({
            where: { id },
            relations: ['subscribers', 'subscribers.subscribedUser'],
        });

        const subscribers = user.subscribers.map((sub) => {
            return sub.subscribedUser;
        });

        return subscribers;
    }
}
