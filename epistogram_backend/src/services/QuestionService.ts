import { Answer } from '../models/entity/Answer';
import { AnswerGivenAnswerBridge } from '../models/entity/AnswerGivenAnswerBridge';
import { GivenAnswer } from '../models/entity/GivenAnswer';
import { Question } from '../models/entity/Question';
import { AnswerEditDTO } from '../shared/dtos/AnswerEditDTO';
import { Mutation } from '../shared/dtos/mutations/Mutation';
import { QuestionDTO } from '../shared/dtos/QuestionDTO';
import { QuestionEditDataDTO } from '../shared/dtos/QuestionEditDataDTO';
import { QuestionTypeEnum } from '../shared/types/sharedTypes';
import { mapMutationToPartialObject } from './misc/xmutatorHelpers';
import { ORMConnectionService } from './ORMConnectionService/ORMConnectionService';

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

        await this.softDeleteQuesitonsAsync(deletedQuesitonIds);

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
    };

    softDeleteQuesitonsAsync = async (quesitonIds: number[]) => {

        // delete given answers 
        const givenAnswers = await this._ormService
            .getMany(GivenAnswer,
                [
                    ['SELECT', 'id'],
                    ['WHERE', 'questionId', '=', 'quesitonIds']
                ],
                { quesitonIds });

        await this.softDeleteGivenAnswers(givenAnswers.map(x => x.id));

        // delete answers 
        const answers = await this._ormService
            .getMany(Answer,
                [
                    ['SELECT', 'id'],
                    ['WHERE', 'questionId', '=', 'quesitonIds']
                ],
                { quesitonIds });

        await this.softDeleteAnswersAsync(answers.map(x => x.id));

        // delete questions
        await this._ormService
            .getRepository(Question)
            .softDelete(quesitonIds);
    };

    softDeleteGivenAnswers = async (givenAnswerIds: number[]) => {

        // delete given answer bridges
        const givenAnswerBridges = await this._ormService
            .getMany(AnswerGivenAnswerBridge,
                [
                    ['SELECT', 'id'],
                    ['WHERE', 'givenAnswerId', '=', 'givenAnswerIds']
                ],
                { givenAnswerIds });

        await this._ormService
            .softDelete(AnswerGivenAnswerBridge, givenAnswerBridges.map(x => x.id));

        // delete given answers 
        await this._ormService
            .softDelete(GivenAnswer, givenAnswerIds);
    };

    softDeleteAnswersAsync = async (answerIds: number[]) => {

        // delete answers 
        await this._ormService
            .softDelete(Answer, answerIds);
    };

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
    };

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
    };

    async saveNewQuestionsAndAnswers(mutations: Mutation<QuestionEditDataDTO, 'questionId'>[]) {

        const addMuts = mutations
            .filter(x => x.action === 'add');

        const newQuestions = addMuts
            .filter(x => x.key < 0)
            .filter(x => mapMutationToPartialObject(x).questionText)
            .map(updateMut => {

                const updateDto = mapMutationToPartialObject(updateMut);

                const question: Partial<Question> = {
                    id: updateMut.key,
                    videoId: updateDto.videoId || undefined,
                    examId: updateDto.examId || undefined,
                    questionText: updateDto.questionText,
                    showUpTimeSeconds: updateDto.questionShowUpTimeSeconds || undefined
                };

                return { question, answers: updateDto.answers };
            });

        // insert new questions
        await this._ormService
            .getRepository(Question)
            .insert(newQuestions.map(x => x.question));

        // newly added questions new answers
        const newAnswers = newQuestions
            .filter(x => x.question.id! > 0 && x.answers)
            .flatMap(savedQuestion => {

                return savedQuestion.answers
                    ?.filter(x => x)
                    .map(x => ({
                        ...x,
                        questionId: savedQuestion.question.id
                    })) as Partial<Answer>[];
            });

        // insert new answers where the question was new
        await this._ormService
            .getRepository(Answer)
            .insert(newAnswers);
    }

    async saveUpdatedQuestions(mutations: Mutation<QuestionEditDataDTO, 'questionId'>[]) {

        const updateMuts = mutations
            .filter(x => x.action === 'update');

        const questions = updateMuts
            .filter(x => x.key > 0)
            .map(updateMut => {

                const updateDto = mapMutationToPartialObject(updateMut);

                const question: Partial<Question> = {
                    id: updateMut.key,
                    questionText: updateDto.questionText,
                    showUpTimeSeconds: updateDto.questionShowUpTimeSeconds
                };

                return question;
            });

        await this._ormService
            .save(Question, questions);
    }

    async saveUpdatedAnswers(mutations: Mutation<QuestionEditDataDTO, 'questionId'>[]) {

        const updateMuts = mutations
            .filter(x => x.action === 'update');

        // existing questions existing answers
        const existingAnswers = updateMuts
            .filter(x => x.key > 0)
            .flatMap(y => y.fieldMutators
                .flat()
                .filter(x => x.field === 'answers')
                .flatMap(x => x.value as Partial<Answer>)
                .flatMap(x => {
                    return {
                        ...x,
                        questionId: y.key
                    };
                })
            )
            .filter(x => x.id! > 0) as Partial<Answer>[];

        await this._ormService
            .save(Answer, existingAnswers);
    }

    async saveNewAnswers(mutations: Mutation<QuestionEditDataDTO, 'questionId'>[]) {

        const updateMuts = mutations
            .filter(x => x.action === 'update');

        // existing questions new answers
        const newAnswers = updateMuts
            .filter(x => x.key > 0)
            .flatMap(y => y.fieldMutators
                .flat()
                .filter(x => x.field === 'answers')
                .flatMap(x => x.value as Partial<Answer>)
                .filter(x => x.text)
                .flatMap(x => {
                    return {
                        ...x,
                        questionId: y.key
                    };
                })
            )
            .filter(x => x.id! < 0) as Partial<Answer>[];

        await this._ormService
            .getRepository(Answer)
            .insert(newAnswers);
    }
}