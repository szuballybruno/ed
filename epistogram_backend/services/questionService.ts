import { Answer } from "../models/entity/Answer";
import { Question } from "../models/entity/Question";
import { QuestionAnswer } from "../models/entity/QuestionAnswer";
import { QuestionDTO } from "../models/shared_models/QuestionDTO";
import { staticProvider } from "../staticProvider";

export const saveQuestionsAsync = async (
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