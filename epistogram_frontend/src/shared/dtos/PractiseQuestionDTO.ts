import { QuestionVersion } from '../../models/entity/question/QuestionVersion';
import { Id } from '../types/versionId';
import { AnswerDTO } from './AnswerDTO';

export type PractiseQuestionDTO = {
    questionVersionId: Id<'QuestionVersion'>;
    questionText: string;
    answers: AnswerDTO[];
    typeId: number;
}