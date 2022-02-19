import { Answer } from "../models/entity/Answer";
import { AnswerGivenAnswerBridge } from "../models/entity/AnswerGivenAnswerBridge";
import { GivenAnswer } from "../models/entity/GivenAnswer";
import { Question } from "../models/entity/Question";
import { AnswerEditDTO } from "../sharedd/dtos/AnswerEditDTO";
import { QuestionDTO } from "../sharedd/dtos/QuestionDTO";
import { QuestionEditDataDTO } from "../sharedd/dtos/QuestionEditDataDTO";
import { QuestionTypeEnum } from "../sharedd/types/sharedTypes";
import { ORMConnectionService } from "./sqlServices/ORMConnectionService";

export class QuestionService {

    private _ormService: ORMConnectionService;

    constructor(ormService: ORMConnectionService) {

        this._ormService = ormService;
    }

    saveAssociatedQuestionsAsync = async (
        questions: QuestionDTO[],
        videoId?: number,
        examId?: number) => {

        const questionRepo = this._ormService
            .getRepository(Question);

        // delete quesitons 
        const existingQuestions = videoId
            ? await questionRepo
                .find({
                    where: {
                        videoId: videoId
                    }
                })
            : await questionRepo
                .find({
                    where: {
                        examId: examId
                    }
                });

        const deletedQuesitonIds = existingQuestions
            .filter(x => !questions
                .some(question => question.questionId === x.id))
            .map(x => x.id);

        await this.deleteQuesitonsAsync(deletedQuesitonIds);

        // update questions
        const updateQuestions = questions
            .filter(x => x.questionId >= 0)
            .map(x => ({
                id: x.questionId,
                questionText: x.questionText,
                orderIndex: x.orderIndex,
                showUpTimeSeconds: x.showUpTimeSeconds
            } as Question));

        if (updateQuestions.length > 0)
            await questionRepo
                .save(updateQuestions);

        // insert questions 
        const insertQuestions = questions
            .filter(x => x.questionId < 0)
            .map(x => ({
                showUpTimeSeconds: x.showUpTimeSeconds,
                questionText: x.questionText,
                orderIndex: x.orderIndex,
                videoId,
                examId
            } as Question));

        if (insertQuestions.length > 0)
            await questionRepo
                .insert(insertQuestions);
    }

    deleteQuesitonsAsync = async (quesitonIds: number[]) => {

        if (quesitonIds.length === 0)
            return;

        // delete given answers 
        const givenAnswers = await this._ormService
            .getRepository(GivenAnswer)
            .createQueryBuilder("ga")
            .where('"question_id" IN (:...quesitonIds)', { quesitonIds })
            .getMany();

        await this.deleteGivenAnswers(givenAnswers.map(x => x.id));

        // delete answers 
        const answers = await this._ormService
            .getRepository(Answer)
            .createQueryBuilder()
            .where('"question_id" IN (:...quesitonIds)', { quesitonIds })
            .getMany();

        await this.deleteAnswersAsync(answers.map(x => x.id));

        // delete questions
        await this._ormService
            .getRepository(Question)
            .delete(quesitonIds);
    }

    deleteGivenAnswers = async (givenAnswerIds: number[]) => {

        // delete given answer bridges
        if (givenAnswerIds.length === 0)
            return;

        const givenAnswerBridges = await this._ormService
            .getRepository(AnswerGivenAnswerBridge)
            .createQueryBuilder("agab")
            .where('"givenAnswer_id" IN (:...givenAnswerIds)', { givenAnswerIds })
            .getMany();

        await this._ormService
            .getRepository(AnswerGivenAnswerBridge)
            .delete(givenAnswerBridges.map(x => x.id));

        // delete given answers 
        await this._ormService
            .getOrmConnection()
            .createQueryBuilder()
            .delete()
            .from(GivenAnswer)
            .where("id IN (:...givenAnswerIds)", { givenAnswerIds })
            .execute();
    }

    deleteAnswersAsync = async (answerIds: number[]) => {

        if (answerIds.length === 0)
            return;

        // delete answers 
        await this._ormService
            .getRepository(Answer)
            .delete(answerIds);
    }

    saveQuestionAsync = async (questionId: number, dto: QuestionEditDataDTO) => {

        const isMultiAnswer = dto.answers.filter(x => x.isCorrect).length > 1;

        // save quesiton data
        await this._ormService
            .getRepository(Question)
            .save({
                id: dto.questionId,
                questionText: dto.questionText,
                typeId: isMultiAnswer ? QuestionTypeEnum.multipleAnswers : QuestionTypeEnum.singleAnswer
            });

        // save answers
        await this.saveAssociatedAnswersAsync(questionId, dto.answers);
    }

    saveAssociatedAnswersAsync = async (questionId: number, answers: AnswerEditDTO[]) => {

        // delete answers 
        const questionAnswers = await this._ormService
            .getRepository(Answer)
            .find({
                where: {
                    questionId
                }
            });

        const deletedAnswerIds = questionAnswers
            .filter(x => !answers.some(dtoAnswer => dtoAnswer.id === x.id))
            .map(x => x.id);

        if (deletedAnswerIds.length > 0)
            await this._ormService
                .getRepository(Answer)
                .delete(deletedAnswerIds);

        // update answers
        const updateAnswers = answers
            .filter(x => x.id >= 0)
            .map(x => ({
                id: x.id,
                text: x.text,
                isCorrect: x.isCorrect,
            } as Answer));

        if (updateAnswers.length > 0)
            await this._ormService
                .getRepository(Answer)
                .save(updateAnswers);

        // insert questions 
        const insertAnswers = answers
            .filter(x => x.id < 0)
            .map(x => ({
                id: x.id,
                text: x.text,
                isCorrect: x.isCorrect,
                questionId
            } as Answer));

        if (insertAnswers.length > 0)
            await this._ormService
                .getRepository(Answer)
                .insert(insertAnswers);
    }
}