import { Id } from '@episto/commontypes';
import { AnswerDTO } from './AnswerDTO';

export type PractiseQuestionDTO = {
    questionVersionId: Id<'QuestionVersion'>;
    questionText: string;
    answers: AnswerDTO[];
    typeId: number;
}