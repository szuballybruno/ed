import { Flex } from "@chakra-ui/layout";
import { Delete } from "@mui/icons-material";
import EditIcon from '@mui/icons-material/Edit';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { applicationRoutes } from "../../../configuration/applicationRoutes";
import { ExamEditDataDTO } from "../../../models/shared_models/ExamEditDataDTO";
import { QuestionDTO } from "../../../models/shared_models/QuestionDTO";
import { useEditExamData, useSaveExam } from "../../../services/api/examApiService";
import { getVirtualId } from "../../../services/core/idService";
import { useNavigation } from "../../../services/core/navigatior";
import { showNotification, useShowErrorDialog } from "../../../services/core/notifications";
import { LoadingFrame } from "../../system/LoadingFrame";
import { DragAndDropList } from "../../universal/DragAndDropList";
import { EpistoButton } from "../../universal/EpistoButton";
import { EpistoEntry } from "../../universal/EpistoEntry";
import { FlexListItem } from "../../universal/FlexListItem";
import { AdminSubpageHeader } from "../AdminSubpageHeader";

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
            questionText: "",
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
                applicationRoutes.administrationRoute.coursesRoute.courseDetailsRoute,
                applicationRoutes.administrationRoute.coursesRoute.courseContentRoute,
                applicationRoutes.administrationRoute.coursesRoute.statisticsCourseRoute,
                applicationRoutes.administrationRoute.coursesRoute.editExamRoute,
            ]}
            onSave={handleSaveAsync}>

            <EpistoEntry
                label="Cím"
                value={title}
                setValue={setTitle} />

            <EpistoEntry
                label="Alcím"
                value={subtitle}
                setValue={setSubtitle} />

            <EpistoButton
                variant="outlined"
                style={{ margin: "10px", alignSelf: "flex-end" }}
                onClick={handleAddNewQuesiton}>
                Új kérdés hozzáadása
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
