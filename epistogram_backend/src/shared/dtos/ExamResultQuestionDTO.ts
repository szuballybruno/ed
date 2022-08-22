import { GivenAnswerStateType } from '../types/sharedTypes';
import { ResultAnswerDTO } from './ResultAnswerDTO';

export type ExamResultQuestionDTO = {
    text: string;
    maxScore: number;
    score: number;
    state: GivenAnswerStateType;
    answers: ResultAnswerDTO[];
}