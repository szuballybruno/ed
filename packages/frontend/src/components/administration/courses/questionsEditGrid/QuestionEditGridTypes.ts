import { AnswerEditDTO } from '../../../../shared/dtos/AnswerEditDTO';
import { Mutation } from '../../../../shared/dtos/mutations/Mutation';
import { QuestionEditDataReadDTO } from '../../../../shared/dtos/QuestionEditDataReadDTO';
import { Id } from '../../../../shared/types/versionId';

export type RowSchema = {

    // misc
    isQuestionHeader: boolean;
    rowKey: string;
    questionEditDTO: QuestionEditDataReadDTO;
    answerEditDTO?: AnswerEditDTO;
    itemText: string;

    // question fileds
    questionVersionId: Id<'QuestionVersion'>;
    questionText: string;
    questionShowUpTimeSeconds?: number;
    moduleId: Id<'Module'>;

    // ans fileds 
    answerVersionId?: Id<'AnswerVersion'>;
    text?: string;
    isCorrect?: boolean;
};

export type QuestionMutationsType = Mutation<QuestionEditDataReadDTO, 'questionVersionId'>[];
export type AnswerMutationsType = Mutation<AnswerEditDTO, 'answerVersionId'>[];