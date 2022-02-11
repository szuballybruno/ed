import { ExamPlayerDataDTO } from "./ExamPlayerDataDTO";

export class PretestDataDTO {
    answerSessionId: number;
    exam: ExamPlayerDataDTO;
    firstItemCode: string;
}