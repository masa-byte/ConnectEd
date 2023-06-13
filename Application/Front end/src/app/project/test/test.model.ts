import { Project } from '../project.model';
import { Question } from './question.model';

export interface Test {
  id: number;
  duration: number;
  project?: Project;
  questions: Question[];
}
