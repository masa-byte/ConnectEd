import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Project } from '../project/project.entity';
import { Question } from './question/question.entity';

@Entity()
export class Test {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  duration: number;

  @OneToOne(() => Project, (project) => project.test, { onDelete: 'CASCADE' })
  @JoinColumn()
  project: Project;

  @OneToMany(() => Question, (questions) => questions.test, { onDelete: 'CASCADE' , eager: true })
  questions: Question[];
}
