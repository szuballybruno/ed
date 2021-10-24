import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { applicationRoutes } from "../../../configuration/applicationRoutes"
import { useEditExamData, useSaveExam } from "../../../services/examService";
import { LoadingFrame } from "../../HOC/LoadingFrame"
import { EpistoEntry } from "../../universal/EpistoEntry";
import { FlexList } from "../../universal/FlexList";
import { FlexListItem } from "../../universal/FlexListItem";
import { AdminSubpageHeader } from "../AdminSubpageHeader"
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import { EpistoButton } from "../../universal/EpistoButton";
import { Delete } from "@mui/icons-material";
import EditIcon from '@mui/icons-material/Edit';
import { Flex } from "@chakra-ui/layout";
import { QuestionDTO } from "../../../models/shared_models/QuestionDTO";
import { useNavigation } from "../../../services/navigatior";
import { getVirtualId } from "../../../services/idService";
import { ExamEditDataDTO } from "../../../models/shared_models/ExamEditDataDTO";
import { showNotification, useShowErrorDialog } from "../../../services/notifications";
import { DragAndDropList } from "../../universal/DragAndDropList";

export const EditExamSubpage = () => {

    const params = useParams<{ examId: string, courseId: string }>();
    const examId = parseInt(params.examId);
    const courseId = parseInt(params.courseId);
    const { navigate } = useNavigation();
    const showError = useShowErrorDialog();

    const { examEditData, examEditDataError, examEditDataState, refetchEditDataAsync } = useEditExamData(examId);
    const { saveExamAsync, saveExamState } = useSaveExam();

    const [questions, setQuestions] = useState<QuestionDTO[]>([]);
    const [title, setTitle] = useState("");
    const [subtitle, setSubtitle] = useState("");

    useEffect(() => {

        if (!examEditData)
            return;

        setTitle(examEditData.title);
        setSubtitle(examEditData.subTitle);
        setQuestions(examEditData.questions.orderBy(x => x.orderIndex + ""));
    }, [examEditData]);

    const handleSaveAsync = async () => {

        const orderedQuestions = [...questions];

        orderedQuestions
            .forEach((x, index) => x.orderIndex = index);

        const dto = {
            title,
            subTitle: subtitle,
            id: examEditData?.id!,
            questions: questions
        } as ExamEditDataDTO;

        try {

            await saveExamAsync(dto);

            showNotification("Vizsga sikeresen mentve!");
            refetchEditDataAsync();
        }
        catch (e) {

            showError(e);
        }
    }

    const navToEditQuestion = async (questionId: number) => {

        const isSuccessful = handleSaveAsync();
        if (!isSuccessful)
            return;

        navigate(applicationRoutes.administrationRoute.coursesRoute.editExamQuestionRoute.route, { questionId, examId, courseId })
    }

    const handleDelete = (questionId: number) => {

        setQuestions(questions.filter(x => x.questionId !== questionId));
    }

    const setQuesitonText = (questionId: number, text: string) => {

        const newQuestions = [...questions];

        newQuestions
            .filter(x => x.questionId === questionId)
            .forEach(x => x.questionText = text);

        setQuestions(newQuestions);
    }

    const handleAddNewQuesiton = () => {

        const newQuestion = {
            questionText: "Uj kerdes",
            questionId: getVirtualId()
        } as QuestionDTO;

        setQuestions([...questions, newQuestion]);
    }

    return <LoadingFrame
        loadingState={[examEditDataState, saveExamState]}
        error={examEditDataError}
        className="whall">

        <AdminSubpageHeader
            tabMenuItems={[
                applicationRoutes.administrationRoute.coursesRoute.editCourseRoute,
                applicationRoutes.administrationRoute.coursesRoute.statisticsCourseRoute,
                applicationRoutes.administrationRoute.coursesRoute.editExamRoute,
            ]}
            onSave={handleSaveAsync}>

            <EpistoEntry
                label="Cim"
                value={title}
                setValue={setTitle} />

            <EpistoEntry
                label="Alcim"
                value={subtitle}
                setValue={setSubtitle} />

            <EpistoButton
                variant="outlined"
                style={{ margin: "10px", alignSelf: "flex-end" }}
                onClick={handleAddNewQuesiton}>
                Uj kerdes hozzaadasa
            </EpistoButton>

            <DragAndDropList
                width="100%"
                list={questions}
                setList={setQuestions}
                getKey={x => x.questionId + ""}
                renderListItem={(question) => <FlexListItem
                    width="100%"
                    thumbnailContent={<LiveHelpIcon className="square40" />}
                    midContent={<EpistoEntry
                        setValue={x => setQuesitonText(question.questionId, x)}
                        value={question.questionText} />}
                    endContent={<Flex>

                        <EpistoButton
                            onClick={() => navToEditQuestion(question.questionId)}
                            isDisabled={question.questionId >= 0 ? false : true}>

                            <EditIcon className="square30" />
                        </EpistoButton>

                        <EpistoButton onClick={() => handleDelete(question.questionId)}>
                            <Delete className="square30" />
                        </EpistoButton>
                    </Flex >} />} />
        </AdminSubpageHeader>
    </LoadingFrame>
}