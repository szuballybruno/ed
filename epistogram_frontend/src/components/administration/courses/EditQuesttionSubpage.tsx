import { Flex } from "@chakra-ui/layout";
import { Delete } from "@mui/icons-material";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { applicationRoutes } from "../../../configuration/applicationRoutes";
import { useIsMatchingCurrentRoute } from "../../../frontendHelpers";
import { AnswerEditDTO } from "../../../models/shared_models/AnswerEditDTO";
import { getVirtualId } from "../../../services/idService";
import { showNotification, useShowErrorDialog } from "../../../services/notifications";
import { useEditQuestionData, useSaveQuestion } from "../../../services/questionsService";
import { LoadingFrame } from "../../HOC/LoadingFrame";
import { EpistoButton } from "../../universal/EpistoButton";
import { EpistoEntry } from "../../universal/EpistoEntry";
import { FlexList } from "../../universal/FlexList";
import { FlexListItem } from "../../universal/FlexListItem";
import { AdminSubpageHeader } from "../AdminSubpageHeader";

export const EditQuestionSubpage = () => {

    const params = useParams<{ questionId: string }>();
    const questionId = parseInt(params.questionId);

    const { questionEditData, questionEditDataError, questionEditDataState, refetchQuestionEditData } = useEditQuestionData(questionId);
    const { saveQuesitonAsync, saveQuesitonState } = useSaveQuestion();

    const showError = useShowErrorDialog();

    const isMatchingCurrentRoute = useIsMatchingCurrentRoute();

    const isVideoQuestion = isMatchingCurrentRoute(applicationRoutes.administrationRoute.coursesRoute.editVideoQuestionRoute);
    const isExamQuestion = isMatchingCurrentRoute(applicationRoutes.administrationRoute.coursesRoute.editExamQuestionRoute);

    const [questionText, setQuestionText] = useState("");
    const [answers, setAnswers] = useState<AnswerEditDTO[]>([]);

    const setAnswerValues = (answerId: number, isCorrect?: boolean, text?: string) => {

        const newAnswers = [...answers];

        if (isCorrect)
            newAnswers
                .forEach(x => x.isCorrect = x.id === answerId);

        const answer = newAnswers
            .filter(x => x.id === answerId)[0];

        if (text)
            answer.text = text;

        setAnswers(newAnswers);
    }

    const correctAnswer = answers.filter(x => x.isCorrect)[0];

    const handleAddNewAnswer = () => {

        const newAnswer = {
            id: getVirtualId(),
            text: "Új válasz"
        } as AnswerEditDTO;

        setAnswers([...answers, newAnswer])
    }

    const handleSaveQuesitonAsync = async () => {

        try {

            await saveQuesitonAsync({
                questionId,
                answers: answers,
                questionText: questionText
            });

            showNotification("Kérdés sikeresen mentve!");

            refetchQuestionEditData();
        }
        catch (e) {

            showError(e);
        }
    }

    const handleDeleteAnswer = (answerId: number) => {

        setAnswers(answers.filter(x => x.id !== answerId));
    }

    useEffect(() => {

        if (!questionEditData)
            return;

        setQuestionText(questionEditData.questionText);
        setAnswers(questionEditData.answers);
    }, [questionEditData]);

    return <LoadingFrame
        className="whall"
        loadingState={[questionEditDataState, saveQuesitonState]}
        error={questionEditDataError}>

        <AdminSubpageHeader
            tabMenuItems={[
                applicationRoutes.administrationRoute.coursesRoute.editCourseRoute,
                applicationRoutes.administrationRoute.coursesRoute.statisticsCourseRoute,
                ...(isVideoQuestion
                    ? [
                        applicationRoutes.administrationRoute.coursesRoute.editVideoRoute,
                        applicationRoutes.administrationRoute.coursesRoute.editVideoQuestionRoute,
                    ]
                    : []),
                ...(isExamQuestion
                    ? [
                        applicationRoutes.administrationRoute.coursesRoute.editExamRoute,
                        applicationRoutes.administrationRoute.coursesRoute.editExamQuestionRoute,
                    ]
                    : [])
            ]}
            px="20px"
            onSave={handleSaveQuesitonAsync}>

            <EpistoEntry
                label="Kérdés szövege"
                value={questionText}
                setValue={setQuestionText}
                isMultiline />

            {correctAnswer && <EpistoEntry
                label="A válasz"
                value={correctAnswer.text}
                disabled />}

            <Flex direction="column" className="dividerBorderTop">

                <EpistoButton
                    variant="outlined"
                    onClick={handleAddNewAnswer}
                    style={{ margin: "10px", alignSelf: "flex-end" }}>
                    Új válasz hozzáadása
                </EpistoButton>

                <RadioGroup
                    value={correctAnswer?.id + ""}
                    onChange={x => {

                        const answerId = parseInt(x.currentTarget.value);
                        setAnswerValues(answerId, true);
                    }}>
                    <FlexList >
                        {answers
                            .map(x => <FlexListItem
                                pr="20px"
                                midContent={<EpistoEntry
                                    value={x.text}
                                    setValue={value => setAnswerValues(x.id, undefined, value)} />}
                                endContent={<Flex>
                                    <FormControlLabel
                                        value={x.id + ""}
                                        labelPlacement="start"
                                        control={<Radio />}
                                        label="Helyes válasz" />

                                    <EpistoButton
                                        onClick={() => handleDeleteAnswer(x.id)}>
                                        <Delete className="square30" />
                                    </EpistoButton>
                                </Flex>} />)}
                    </FlexList>
                </RadioGroup>
            </Flex>
        </AdminSubpageHeader>
    </LoadingFrame>
}
