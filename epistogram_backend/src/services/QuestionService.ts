import { AnswerData } from '../models/entity/answer/AnswerData';
import { AnswerGivenAnswerBridge } from '../models/entity/AnswerGivenAnswerBridge';
import { GivenAnswer } from '../models/entity/GivenAnswer';
import { QuestionData } from '../models/entity/question/QuestionData';
import { AnswerEditDTO } from '../shared/dtos/AnswerEditDTO';
import { Mutation } from '../shared/dtos/mutations/Mutation';
import { QuestionDTO } from '../shared/dtos/QuestionDTO';
import { QuestionEditDataDTO } from '../shared/dtos/QuestionEditDataDTO';
import { QuestionTypeEnum } from '../shared/types/sharedTypes';
import { throwNotImplemented } from '../utilities/helpers';
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

        throwNotImplemented();
        // const questionRepo = this._ormService
        //     .getRepository(QuestionData);

        // // delete quesitons 
        // const existingQuestions = videoId
        //     ? await questionRepo
        //         .find({
        //             where: {
        //                 videoId: videoId
        //             }
        //         })
        //     : await questionRepo
        //         .find({
        //             where: {
        //                 examId: examId
        //             }
        //         });

        // const deletedQuesitonIds = existingQuestions
        //     .filter(x => !questions
        //         .some(question => question.questionId === x.id))
        //     .map(x => x.id);

        // await this.softDeleteQuesitonsAsync(deletedQuesitonIds);

        // // update questions
        // const updateQuestions = questions
        //     .filter(x => x.questionId >= 0)
        //     .map(x => ({
        //         id: x.questionId,
        //         questionText: x.questionText,
        //         orderIndex: x.orderIndex,
        //         showUpTimeSeconds: x.showUpTimeSeconds
        //     } as QuestionData));

        // if (updateQuestions.length > 0)
        //     await questionRepo
        //         .save(updateQuestions);

        // // insert questions 
        // const insertQuestions = questions
        //     .filter(x => x.questionId < 0)
        //     .map(x => ({
        //         showUpTimeSeconds: x.showUpTimeSeconds,
        //         questionText: x.questionText,
        //         orderIndex: x.orderIndex,
        //         videoId,
        //         examId
        //     } as QuestionData));

        // if (insertQuestions.length > 0)
        //     await questionRepo
        //         .insert(insertQuestions);
    };

    softDeleteQuesitonsAsync = async (quesitonIds: number[]) => {

        throwNotImplemented();
        // // delete given answers 
        // const givenAnswers = await this._ormService
        //     .query(GivenAnswer, { quesitonIds })
        //     .where('questionId', '=', 'quesitonIds')
        //     .getMany();

        // await this.softDeleteGivenAnswers(givenAnswers.map(x => x.id));

        // // delete answers 
        // const answers = await this._ormService
        //     .query(AnswerData, { quesitonIds })
        //     .where('questionId', '=', 'quesitonIds')
        //     .getMany();

        // await this.softDeleteAnswersAsync(answers.map(x => x.id));

        // // delete questions
        // await this._ormService
        //     .getRepository(QuestionData)
        //     .softDelete(quesitonIds);
    };

    saveAssociatedAnswersAsync = async (questionId: number, answers: AnswerEditDTO[]) => {

        throwNotImplemented();
        // // delete answers 
        // const questionAnswers = await this._ormService
        //     .getRepository(AnswerData)
        //     .find({
        //         where: {
        //             questionId
        //         }
        //     });

        // const deletedAnswerIds = questionAnswers
        //     .filter(x => !answers.some(dtoAnswer => dtoAnswer.id === x.id))
        //     .map(x => x.id);

        // if (deletedAnswerIds.length > 0)
        //     await this._ormService
        //         .getRepository(AnswerData)
        //         .delete(deletedAnswerIds);

        // // update answers
        // const updateAnswers = answers
        //     .filter(x => x.id >= 0)
        //     .map(x => ({
        //         id: x.id,
        //         text: x.text,
        //         isCorrect: x.isCorrect,
        //     } as AnswerData));

        // if (updateAnswers.length > 0)
        //     await this._ormService
        //         .getRepository(AnswerData)
        //         .save(updateAnswers);

        // // insert questions 
        // const insertAnswers = answers
        //     .filter(x => x.id < 0)
        //     .map(x => ({
        //         id: x.id,
        //         text: x.text,
        //         isCorrect: x.isCorrect,
        //         questionId
        //     } as AnswerData));

        // if (insertAnswers.length > 0)
        //     await this._ormService
        //         .getRepository(AnswerData)
        //         .insert(insertAnswers);
    };

    async saveNewQuestionsAndAnswers(mutations: any) {

        throwNotImplemented();
        // const addMuts = mutations
        //     .filter(x => x.action === 'add');

        // const newQuestions = addMuts
        //     .filter(x => x.key < 0)
        //     .filter(x => mapMutationToPartialObject(x).questionText)
        //     .map(updateMut => {

        //         const updateDto = mapMutationToPartialObject(updateMut);

        //         const question: Partial<QuestionData> = {
        //             id: updateMut.key,
        //             videoId: updateDto.videoId || undefined,
        //             examId: updateDto.examId || undefined,
        //             questionText: updateDto.questionText,
        //             showUpTimeSeconds: updateDto.questionShowUpTimeSeconds || undefined
        //         };

        //         return { question, answers: updateDto.answers };
        //     });

        // // insert new questions
        // await this._ormService
        //     .getRepository(QuestionData)
        //     .insert(newQuestions.map(x => x.question));

        // // newly added questions new answers
        // const newAnswers = newQuestions
        //     .filter(x => x.question.id! > 0 && x.answers)
        //     .flatMap(savedQuestion => {

        //         return savedQuestion.answers
        //             ?.filter(x => x)
        //             .map(x => ({
        //                 ...x,
        //                 questionId: savedQuestion.question.id
        //             })) as Partial<AnswerData>[];
        //     });

        // // insert new answers where the question was new
        // await this._ormService
        //     .getRepository(AnswerData)
        //     .insert(newAnswers);
    }

    async saveUpdatedQuestions(mutations: any) {

        // const updateMuts = mutations
        //     .filter(x => x.action === 'update');

        // const questions = updateMuts
        //     .filter(x => x.key > 0)
        //     .map(updateMut => {

        //         const updateDto = mapMutationToPartialObject(updateMut);

        //         const question: Partial<QuestionData> = {
        //             id: updateMut.key,
        //             questionText: updateDto.questionText,
        //             showUpTimeSeconds: updateDto.questionShowUpTimeSeconds
        //         };

        //         return question;
        //     });

        // await this._ormService
        //     .save(QuestionData, questions);
    }

    async saveUpdatedAnswers(mutations: any) {

        // const updateMuts = mutations
        //     .filter(x => x.action === 'update');

        // // existing questions existing answers
        // const existingAnswers = updateMuts
        //     .filter(x => x.key > 0)
        //     .flatMap(y => y.fieldMutators
        //         .flat()
        //         .filter(x => x.field === 'answers')
        //         .flatMap(x => x.value as Partial<AnswerData>)
        //         .flatMap(x => {
        //             return {
        //                 ...x,
        //                 questionId: y.key
        //             };
        //         })
        //     )
        //     .filter(x => x.id! > 0) as Partial<AnswerData>[];

        // await this._ormService
        //     .save(AnswerData, existingAnswers);
    }

    async saveNewAnswers(mutations: any) {

        // const updateMuts = mutations
        //     .filter(x => x.action === 'update');

        // // existing questions new answers
        // const newAnswers = updateMuts
        //     .filter(x => x.key > 0)
        //     .flatMap(y => y.fieldMutators
        //         .flat()
        //         .filter(x => x.field === 'answers')
        //         .flatMap(x => x.value as Partial<AnswerData>)
        //         .filter(x => x.text)
        //         .flatMap(x => {
        //             return {
        //                 ...x,
        //                 questionId: y.key
        //             };
        //         })
        //     )
        //     .filter(x => x.id! < 0) as Partial<AnswerData>[];

        // await this._ormService
        //     .getRepository(AnswerData)
        //     .insert(newAnswers);
    }
}