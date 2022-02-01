import { AnswerSession } from "../models/entity/AnswerSession";
import { Exam } from "../models/entity/Exam";
import { MapperService } from "./MapperService";
import { ORMConnectionService } from "./sqlServices/ORMConnectionService";

export class PretestService {

    private _mapperSerice: MapperService;
    private _ormService: ORMConnectionService;

    constructor(ormService: ORMConnectionService, mapperSerice: MapperService) {

        this._ormService = ormService;
        this._mapperSerice = mapperSerice;
    }

    async getPretestDataAsync(userId: number, courseId: number) {

        const pretestExam = await this._ormService
            .getRepository(Exam)
            .findOneOrFail({
                where: {
                    courseId,
                    type: "pretest"
                }
            });

        // const examDTO =

        let answerSession = await this._ormService
            .getRepository(AnswerSession)
            .findOne({
                where: {
                    userId,
                    examId: pretestExam.id,
                    type: "pretest"
                }
            });

        if (!answerSession) {

            answerSession = {
                userId,
                examId: pretestExam.id,
                type: "pretest"
            } as AnswerSession;

            await this._ormService
                .getRepository(AnswerSession)
                .insert(answerSession);
        }

        return {
            answerSessionId: answerSession.id,
            exam: pretestExam,

        }
    }
}