import { SignupQuestionDTO } from "./SignupQuestionDTO";

export type SignupDataDTO = {
    questions: SignupQuestionDTO[];
    isCompleted: boolean;
}