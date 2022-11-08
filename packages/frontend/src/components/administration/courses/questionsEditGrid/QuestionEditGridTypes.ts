import { AnswerEditDTO } from '@episto/communication';
import { Mutation } from '@episto/communication';
import { QuestionEditDataReadDTO } from '@episto/communication';
import { Id } from '@episto/commontypes';

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