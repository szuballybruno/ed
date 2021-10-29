import { Answer } from "../models/entity/Answer";
import { Question } from "../models/entity/Question";
import { QuestionAnswer } from "../models/entity/QuestionAnswer";
import { AnswerDTO } from "../models/shared_models/AnswerDTO";
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

    // get answers 
    const answers = await staticProvider
        .ormConnection
        .getRepository(Answer)
        .createQueryBuilder()
        .where('"questionId" in (:...quesitonIds)', { quesitonIds })
        .getMany();

    const answerIds = answers.map(x => x.id);

    // delete questionanswers
    await staticProvider
        .ormConnection
        .createQueryBuilder()
        .delete()
        .from(QuestionAnswer)
        .where("answerId in (:...answerIds)", { answerIds })
        .execute();

    // delete answers 
    await staticProvider
        .ormConnection
        .getRepository(Answer)
        .delete(answerIds);

    // delete questions
    await staticProvider
        .ormConnection
        .getRepository(Question)
        .delete(quesitonIds);
}

export const saveQuestionAsync = async (questionId: number, dto: QuestionEditDataDTO) => {

    if (dto.typeId === QuestionTypeEnum.singleAnswer && dto.answers.filter(x => x.isCorrect).length > 1)
        throw new TypedError("Can't save multiple correct answers for an answer that allows only one correct answer!", "bad request");

    // save quesiton data
    await staticProvider
        .ormConnection
        .getRepository(Question)
        .save({
            id: dto.questionId,
            questionText: dto.questionText,
            typeId: dto.typeId
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