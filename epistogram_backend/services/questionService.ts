import { Question } from "../models/entity/Question";
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
    const existingQuestions = await questionRepo
        .find({
            where: {
                videoId,
                examId
            }
        });

    const deletedQuesitonIds = existingQuestions
        .filter(x => !questions
            .some(question => question.questionId === x.id))
        .map(x => x.id);

    if (deletedQuesitonIds.length > 0)
        await staticProvider
            .ormConnection
            .getRepository(Question)
            .delete(deletedQuesitonIds);

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