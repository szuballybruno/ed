import { SignupQuestionDTO } from './SignupQuestionDTO';

export class SurveyDataDTO {
    questions: SignupQuestionDTO[];
    isCompleted: boolean;
}