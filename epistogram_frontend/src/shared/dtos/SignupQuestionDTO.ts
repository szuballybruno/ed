import { Question } from '../../models/entity/question/Question';
import { Id } from '../types/versionId';
import { SignupAnswerDTO } from './SignupAnswerDTO';

export type SignupQuestionDTO = {
    questionId: Id<'Question'>;
    questionText: string;
    imageUrl: string;
    typeId: number;
    answers: SignupAnswerDTO[];
}