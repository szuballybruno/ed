import {Id} from '@episto/commontypes';
import {SignupAnswerDTO} from './SignupAnswerDTO';

export type SignupQuestionDTO = {
    questionVersionId: Id<'QuestionVersion'>;
    questionText: string;
    imageUrl: string;
    typeId: number;
    answers: SignupAnswerDTO[];
}
