import { GivenAnswerStateType } from '@episto/commontypes';
import { ResultAnswerDTO } from './ResultAnswerDTO';

export type ExamResultQuestionDTO = {
    text: string;
    maxScore: number;
    score: number;
    state: GivenAnswerStateType;
    answers: ResultAnswerDTO[];
}