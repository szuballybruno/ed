import { Id } from '../types/versionId';
import { ExamPlayerDataDTO } from './ExamPlayerDataDTO';

export class PretestDataDTO {
    answerSessionId: Id<'AnswerSession'>;
    exam: ExamPlayerDataDTO;
}