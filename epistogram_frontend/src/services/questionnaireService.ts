import { useState } from "react";
import { useReactQuery } from "../frontendHelpers";
import { AnswerQuestionDTO } from "../models/shared_models/AnswerQuestionDTO";
import { httpPostAsync } from "./httpClient";

export const useAnswerQuestion = () => {

    const [answerId, setAnswerId] = useState(-1);
    const [questionId, setQuestionId] = useState(-1);

    const queryRes = useReactQuery(
        ["answerQuestion"],
        () => httpPostAsync("questions/answer-question", {
            answerId,
            questionId
        } as AnswerQuestionDTO), false);

    const answerQuestion = (questionId: number, answerId: number) => {

        setAnswerId(answerId);
        setQuestionId(questionId);
        queryRes.refetch();
    }

    return {
        correctAnswerId: queryRes.data as number,
        answerQuestionError: queryRes.error,
        answerQuestionState: queryRes.status,
        answerQuestion
    }
}