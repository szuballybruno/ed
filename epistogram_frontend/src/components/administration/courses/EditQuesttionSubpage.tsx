import { Flex } from "@chakra-ui/layout";
import { Delete } from "@mui/icons-material";
import { Checkbox, FormControlLabel, RadioGroup } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { applicationRoutes } from "../../../configuration/applicationRoutes";
import { useIsMatchingCurrentRoute } from "../../../static/frontendHelpers";
import { AnswerEditDTO } from "../../../shared/dtos/AnswerEditDTO";
import { getVirtualId } from "../../../services/core/idService";
import { showNotification, useShowErrorDialog } from "../../../services/core/notifications";
import { LoadingFrame } from "../../system/LoadingFrame";
import { EpistoEntry } from "../../controls/EpistoEntry";
import { FlexList } from "../../universal/FlexList";
import { FlexListItem } from "../../universal/FlexListItem";
import { AdminSubpageHeader } from "../AdminSubpageHeader";
import { useEditQuestionData, useSaveQuestion } from "../../../services/api/questionApiService";
import { EpistoButton } from "../../controls/EpistoButton";

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
    const correctAnswers = answers.filter(x => x.isCorrect);
    const correctAnswer = correctAnswers[0];

    const setAnswerValues = (answerId: number, isCorrect?: boolean, text?: string) => {

        const newAnswers = [...answers];

        const answer = newAnswers
            .filter(x => x.id === answerId)[0];

        // set text
        if (text)
            answer.text = text;

        // set isCorrect
        if (isCorrect !== undefined)
            answer.isCorrect = isCorrect;

        setAnswers(newAnswers);
    }

    const handleAddNewAnswer = () => {

        const newAnswer = {
            id: getVirtualId(),
            text: ""
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
                applicationRoutes.administrationRoute.coursesRoute.courseDetailsRoute,
                applicationRoutes.administrationRoute.coursesRoute.courseContentRoute,
                applicationRoutes.administrationRoute.coursesRoute.statisticsCourseRoute,
                ...(isVideoQuestion
                    ? [
                        applicationRoutes.administrationRoute.coursesRoute.editVideoRoute,
                        applicationRoutes.administrationRoute.coursesRoute.videoStatsRoute,
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
            onSave={handleSaveQuesitonAsync}>

            <Flex
                className="roundBorders"
                mt="5px"
                p="0 10px 10px 10px"
                background="var(--transparentWhite70)"
                direction="column">
                <EpistoEntry
                    label="Kérdés szövege"
                    labelVariant="top"
                    value={questionText}
                    setValue={setQuestionText}
                    isMultiline />
            </Flex>
            <Flex
                className="roundBorders"
                mt="5px"
                px="10px"
                background="var(--transparentWhite70)"
                direction="column">

                {/* correct answers display */}
                <FlexList>
                    {correctAnswers
                        .map(x => <FlexListItem midContent={x.text} />)}
                </FlexList>

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
                                .map(answer => <FlexListItem
                                    pr="20px"
                                    midContent={<EpistoEntry
                                        value={answer.text}
                                        setValue={value => setAnswerValues(answer.id, undefined, value)} />}
                                    endContent={<Flex>

                                        <FormControlLabel
                                            value={answer.id + ""}
                                            labelPlacement="start"
                                            control={<Checkbox
                                                checked={answer.isCorrect}
                                                onChange={y => setAnswerValues(answer.id, y.currentTarget.checked)} />}
                                            label="Helyes válasz" />

                                        <EpistoButton
                                            onClick={() => handleDeleteAnswer(answer.id)}>
                                            <Delete className="square30" />
                                        </EpistoButton>
                                    </Flex>} />)}
                        </FlexList>
                    </RadioGroup>
                </Flex>
            </Flex>
        </AdminSubpageHeader>
    </LoadingFrame >
}
