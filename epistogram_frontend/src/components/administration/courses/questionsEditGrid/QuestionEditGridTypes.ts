import { AnswerEditDTO } from '../../../../shared/dtos/AnswerEditDTO';
import { Mutation } from '../../../../shared/dtos/mutations/Mutation';
import { QuestionEditDataDTO } from '../../../../shared/dtos/QuestionEditDataDTO';
import { Id } from '../../../../shared/types/versionId';

export type RowSchema = {

    // misc
    isQuestionHeader: boolean;
    rowKey: string;
    questionEditDTO: QuestionEditDataDTO;
    answerEditDTO: AnswerEditDTO;
    itemText: string;

    // question fileds
    questionVersionId: Id<'QuestionVersion'>;
    questionText: string;
    questionShowUpTimeSeconds?: number;

    // ans fileds 
    answerVersionId: Id<'AnswerVersion'>;
    text: string;
    isCorrect: boolean;
};

export type QuestionMutationsType = Mutation<QuestionEditDataDTO, 'questionVersionId'>[];
export type AnswerMutationsType = Mutation<AnswerEditDTO, 'answerVersionId'>[];