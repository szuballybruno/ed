import { AnswerEditDTO } from '../../../../shared/dtos/AnswerEditDTO';
import { QuestionEditDataDTO } from '../../../../shared/dtos/QuestionEditDataDTO';

type EditQuestionFnType = <TField extends keyof QuestionEditDataDTO, >(key: number, field: TField, value: QuestionEditDataDTO[TField]) => void;

export type RowSchema = {

    // misc
    isQuestionHeader: boolean;
    rowKey: string;
    questionEditDTO: QuestionEditDataDTO;
    answerEditDTO: AnswerEditDTO;
    itemText: string;

    // question fileds
    questionVersionId: number;
    questionText: string;
    questionShowUpTimeSeconds?: number;

    // ans fileds 
    answerVersionId: number;
    text: string;
    isCorrect: boolean;
};