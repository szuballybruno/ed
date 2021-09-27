import { PractiseQuestionView } from "../models/views/PractiseQuestionView";
import { staticProvider } from "../staticProvider";
import { toPractiseQuestionDTO } from "./mappings";

export const getPractiseQuestionAsync = async (userId: number) => {

    const questions = await staticProvider
        .ormConnection
        .getRepository(PractiseQuestionView)
        .find({
            where: {
                userId: userId
            }
        });

    const question = questions[0];

    return toPractiseQuestionDTO(question);
}