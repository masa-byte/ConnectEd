import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Test } from "../test.entity";
import { Max, Min } from "class-validator";


@Entity()
export class Question {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    text: string;

    @Column()
    points: number;

    @Column()
    correctAnswerIndex: number;

    @Column()
    answer1: string;

    @Column()
    answer2: string;

    @Column()
    answer3: string;

    @Column()
    answer4: string;

    @ManyToOne(() => Test, test => test.questions, { onDelete: 'CASCADE' })
    test: Test;
}