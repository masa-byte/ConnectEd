import { Test } from './test.model';

export interface Question {
  id: number;
  text: string;
  points: number;
  test?: Test;
  correctAnswerIndex: number;
  answer1: string;
  answer2: string;
  answer3: string;
  answer4: string;
}
