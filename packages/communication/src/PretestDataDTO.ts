import { Id } from '@episto/commontypes';
import { ExamPlayerDataDTO } from './ExamPlayerDataDTO';

export class PretestDataDTO {
    answerSessionId: Id<'AnswerSession'>;
    exam: ExamPlayerDataDTO;
}