import { getegid } from "process";
import { AnswerSession } from "../models/entity/AnswerSession";
import { Exam } from "../models/entity/Exam";
import { QuestionAnswerDTO } from "../models/shared_models/QuestionAnswerDTO";
import { staticProvider } from "../staticProvider";
import { getCurrentCourseItemDescriptor } from "./courseService";
import { answerQuestionAsync } from "./questionAnswerService";
import { getUserById } from "./userService";

export const answerExamQuestionAsync = (userId: number, questionAnswerDTO: QuestionAnswerDTO) => {

    // validation comes here 

    return answerQuestionAsync(
        userId,
        questionAnswerDTO.answerSessionId,
        questionAnswerDTO.questionId,
        questionAnswerDTO.answerId);
}

export const getExamResultsAsync = async (userId: number, answerSessionId: number) => {

    const user = await getUserById(userId);
    const descriptor = await getCurrentCourseItemDescriptor(user);

    if (descriptor?.itemType != "exam")
        throw new Error("Current course item type is not 'exam'!");

    return Promise.resolve();
    // const ad = await staticProvider
    //     .ormConnection
    //     .getRepository(AnswerSession)
    //     .find({
    //         where: {
    //             examId: descriptor.itemId,
    //             userId: userId
    //         }
    //     })
}