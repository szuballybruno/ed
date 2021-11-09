import { Answer } from "../models/entity/Answer";
import { AnswerGivenAnswerBridge } from "../models/entity/AnswerGivenAnswerBridge";
import { GivenAnswer } from "../models/entity/GivenAnswer";
import { Question } from "../models/entity/Question";
import { AnswerEditDTO } from "../models/shared_models/AnswerEditDTO";
import { QuestionDTO } from "../models/shared_models/QuestionDTO";
import { QuestionEditDataDTO } from "../models/shared_models/QuestionEditDataDTO";
import { QuestionTypeEnum } from "../models/shared_models/types/sharedTypes";
import { staticProvider } from "../staticProvider";
import { TypedError } from "../utilities/helpers";

export const saveAssociatedQuestionsAsync = async (
    questions: QuestionDTO[],
    videoId?: number,
    examId?: number) => {

    const questionRepo = staticProvider
        .ormConnection
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

    await deleteQuesitonsAsync(deletedQuesitonIds);

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

export const deleteQuesitonsAsync = async (quesitonIds: number[]) => {

    if (quesitonIds.length === 0)
        return;

    // delete given answers 
    const givenAnswers = await staticProvider
        .ormConnection
        .getRepository(GivenAnswer)
        .createQueryBuilder("ga")
        .where("ga.questionId IN (:...questionIds)", { quesitonIds })
        .getMany();

    await deleteGivenAnswers(givenAnswers.map(x => x.id));

    // delete answers 
    const answers = await staticProvider
        .ormConnection
        .getRepository(Answer)
        .createQueryBuilder()
        .where('"questionId" in (:...quesitonIds)', { quesitonIds })
        .getMany();

    await deleteAnswersAsync(answers.map(x => x.id));

    // delete questions
    await staticProvider
        .ormConnection
        .getRepository(Question)
        .delete(quesitonIds);
}

export const deleteGivenAnswers = async (givenAnswerIds: number[]) => {

    // delete given answer bridges
    const givenAnswerBridges = await staticProvider
        .ormConnection
        .getRepository(AnswerGivenAnswerBridge)
        .createQueryBuilder("agab")
        .where("agab.givenAnswerId IN (:...givenAnswerIds)", { givenAnswerIds })
        .getMany();

    await staticProvider
        .ormConnection
        .getRepository(AnswerGivenAnswerBridge)
        .delete(givenAnswerBridges.map(x => x.id));

    // delete given answers 
    await staticProvider
        .ormConnection
        .createQueryBuilder()
        .delete()
        .from(GivenAnswer)
        .where("id IN (:...givenAnswerIds)", { givenAnswerIds })
        .execute();
}

export const deleteAnswersAsync = async (answerIds: number[]) => {

    // delete answers 
    await staticProvider
        .ormConnection
        .getRepository(Answer)
        .delete(answerIds);
}

export const saveQuestionAsync = async (questionId: number, dto: QuestionEditDataDTO) => {

    const isMultiAnswer = dto.answers.filter(x => x.isCorrect).length > 1;

    // save quesiton data
    await staticProvider
        .ormConnection
        .getRepository(Question)
        .save({
            id: dto.questionId,
            questionText: dto.questionText,
            typeId: isMultiAnswer ? QuestionTypeEnum.multipleAnswers : QuestionTypeEnum.singleAnswer
        });

    // save answers
    await saveAssociatedAnswersAsync(questionId, dto.answers);
}

export const saveAssociatedAnswersAsync = async (questionId: number, answers: AnswerEditDTO[]) => {

    // delete answers 
    const questionAnswers = await staticProvider
        .ormConnection
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
        await staticProvider
            .ormConnection
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
        await staticProvider
            .ormConnection
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
        await staticProvider
            .ormConnection
            .getRepository(Answer)
            .insert(insertAnswers);
}