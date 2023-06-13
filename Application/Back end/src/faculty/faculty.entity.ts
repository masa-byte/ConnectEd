import { ProjectApplication } from '../applications/project-application/project-application.entity';
import { Project } from '../project/project.entity';
import { Tag } from '../tag/tag.entity';
import { User } from '../user/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Faculty {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    name: string;

    @Column()
    address: string;

    @Column()
    phoneNumber: string;

    @Column()
    university: string;

    @Column('varchar', {length: 500})
    description: string;

    @ManyToOne(() => User, user => user.faculties, { onDelete: 'CASCADE', eager: true})
    user: User;

    @OneToMany(() => Tag, tag => tag.faculty, {eager: true})
    tags: Tag[];

    @OneToMany(() => Project, project => project.faculty, )
    projects: Project[];

    @OneToMany(() => ProjectApplication, projectApplication => projectApplication.faculty, )
    projectApplications: ProjectApplication[];
}
