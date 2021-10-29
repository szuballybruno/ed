import { Flex } from "@chakra-ui/layout";
import { Delete } from "@mui/icons-material";
import { Checkbox, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { applicationRoutes } from "../../../configuration/applicationRoutes";
import { useIsMatchingCurrentRoute } from "../../../frontendHelpers";
import { AnswerEditDTO } from "../../../models/shared_models/AnswerEditDTO";
import { QuestionTypeEnum } from "../../../models/shared_models/types/sharedTypes";
import { getVirtualId } from "../../../services/idService";
import { showNotification, useShowErrorDialog } from "../../../services/notifications";
import { useEditQuestionData, useSaveQuestion } from "../../../services/questionsService";
import { LoadingFrame } from "../../HOC/LoadingFrame";
import { EpistoButton } from "../../universal/EpistoButton";
import { EpistoEntry } from "../../universal/EpistoEntry";
import { EpistoSelect } from "../../universal/EpistoSelect";
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
    const [selectedQuestionType, setSelectedQuestionType] = useState<{ name: string, id: number } | null>(null);
    const [answers, setAnswers] = useState<AnswerEditDTO[]>([]);
    const correctAnswers = answers.filter(x => x.isCorrect);
    const correctAnswer = correctAnswers[0];
    const isSingleAnswerMode = selectedQuestionType?.id === QuestionTypeEnum.singleAnswer;
    const isMultiAnswerMode = selectedQuestionType?.id === QuestionTypeEnum.multipleAnswers;

    const questionTypes = [
        {
            name: "Egy valasz",
            id: QuestionTypeEnum.singleAnswer
        },
        {
            name: "Tobb valasz",
            id: QuestionTypeEnum.multipleAnswers
        }
    ]

    const setAnswerValues = (answerId: number, isCorrect?: boolean, text?: string) => {

        const newAnswers = [...answers];

        const answer = newAnswers
            .filter(x => x.id === answerId)[0];

        // set text
        if (text)
            answer.text = text;

        // set isCorrect
        if (isCorrect !== undefined) {

            if (isSingleAnswerMode) {

                newAnswers
                    .filter(x => x.id !== answerId)
                    .forEach(x => x.isCorrect = false);
            }

            answer.isCorrect = isCorrect;
        }

        setAnswers(newAnswers);
    }

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
                questionText: questionText,
                typeId: selectedQuestionType?.id!
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
        setSelectedQuestionType(questionTypes.filter(x => x.id === questionEditData.typeId)[0]);
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

            <EpistoSelect
                items={questionTypes}
                getDisplayValue={x => x?.name + ""}
                onSelected={setSelectedQuestionType}
                selectedValue={selectedQuestionType}
                getCompareKey={x => x?.id + ""} />

            {/* correct answer display */}
            {(correctAnswer && isSingleAnswerMode) && <EpistoEntry
                label="A válasz"
                value={correctAnswer.text}
                disabled />}

            {/* correct answers display */}
            {isMultiAnswerMode && <FlexList>
                {correctAnswers
                    .map(x => <FlexListItem midContent={x.text} />)}
            </FlexList>}

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
                                    {isSingleAnswerMode && <FormControlLabel
                                        value={answer.id + ""}
                                        labelPlacement="start"
                                        control={<Radio />}
                                        label="Helyes válasz" />}

                                    {isMultiAnswerMode && <FormControlLabel
                                        value={answer.id + ""}
                                        labelPlacement="start"
                                        control={<Checkbox
                                            checked={answer.isCorrect}
                                            onChange={y => setAnswerValues(answer.id, y.currentTarget.checked)} />}
                                        label="Helyes válasz" />}

                                    <EpistoButton
                                        onClick={() => handleDeleteAnswer(answer.id)}>
                                        <Delete className="square30" />
                                    </EpistoButton>
                                </Flex>} />)}
                    </FlexList>
                </RadioGroup>
            </Flex>
        </AdminSubpageHeader>
    </LoadingFrame>
}
