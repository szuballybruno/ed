import { Flex } from "@chakra-ui/layout";
import { Delete } from "@mui/icons-material";
import EditIcon from '@mui/icons-material/Edit';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import { Checkbox, Slider } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { applicationRoutes } from "../../../configuration/applicationRoutes";
import { ExamEditDataDTO } from "../../../shared/dtos/ExamEditDataDTO";
import { QuestionDTO } from "../../../shared/dtos/QuestionDTO";
import { useEditExamData, useSaveExam } from "../../../services/api/examApiService";
import { getVirtualId } from "../../../services/core/idService";
import { useNavigation } from "../../../services/core/navigatior";
import { showNotification, useShowErrorDialog } from "../../../services/core/notifications";
import { LoadingFrame } from "../../system/LoadingFrame";
import { DragAndDropList } from "../../universal/DragAndDropList";
import { EpistoEntry } from "../../controls/EpistoEntry";
import { FlexListItem } from "../../universal/FlexListItem";
import { AdminSubpageHeader } from "../AdminSubpageHeader";
import { EpistoButton } from "../../controls/EpistoButton";
import { EpistoLabel } from "../../controls/EpistoLabel";
import { ApplicationRoute } from "../../../models/types";
import { AdminCourseItemList } from "./AdminCourseItemList";
import { AdminBreadcrumbsHeader } from "../AdminBreadcrumbsHeader";

// deprecated because DataGrid
export const EditExamSubpage = (props: {
    examId?: number,
    activeRoute?: ApplicationRoute
}) => {

    const params = useParams<{ examId: string, courseId: string }>();
    const examId = props.examId
        ? props.examId
        : parseInt(params.examId);
    const courseId = parseInt(params.courseId);
    const { navigate } = useNavigation();
    const showError = useShowErrorDialog();

    const { examEditData, examEditDataError, examEditDataState, refetchEditDataAsync } = useEditExamData(examId);
    const { saveExamAsync, saveExamState } = useSaveExam();

    const [questions, setQuestions] = useState<QuestionDTO[]>([]);
    const [title, setTitle] = useState("");
    const [subtitle, setSubtitle] = useState("");
    const [isFinalExam, setIsFinalExam] = useState(false);
    const [isRetakeLimited, setIsRetakeLimited] = useState(false);
    const [reateLimit, setRetakeLimit] = useState("0");

    useEffect(() => {

        if (!examEditData)
            return;

        setTitle(examEditData.title);
        setSubtitle(examEditData.subTitle);
        setQuestions(examEditData.questions.orderBy(x => x.orderIndex + ""));
        setIsFinalExam(examEditData.isFinalExam);
        setRetakeLimit(examEditData.reatakeLimit + "" ?? "0");
        setIsRetakeLimited(!!examEditData.reatakeLimit);
    }, [examEditData]);

    const handleSaveAsync = async () => {

        const orderedQuestions = [...questions];

        orderedQuestions
            .forEach((x, index) => x.orderIndex = index);

        try {

            const dto = {
                title,
                subTitle: subtitle,
                id: examEditData?.id!,
                questions: questions,
                isFinalExam: isFinalExam,
                reatakeLimit: isRetakeLimited
                    ? parseInt(reateLimit)
                    : null,
                courseId
            } as ExamEditDataDTO;

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

        <AdminBreadcrumbsHeader>

            {/* <AdminCourseItemList /> */}

            <AdminSubpageHeader
                tabMenuItems={[
                    props.activeRoute
                        ? props.activeRoute
                        : applicationRoutes.administrationRoute.coursesRoute.editExamRoute,
                ]}
                onSave={handleSaveAsync}>

                <Flex
                    direction="column"
                    className="roundBorders"
                    mt="5px"
                    p="0 10px 10px 10px"
                    background="var(--transparentWhite70)">

                    <EpistoEntry
                        label="Cím"
                        labelVariant="top"
                        value={title}
                        setValue={setTitle} />

                    <EpistoEntry
                        label="Alcím"
                        labelVariant="top"
                        value={subtitle}
                        setValue={setSubtitle} />

                    <EpistoLabel
                        text="Újrakezdési limit">

                        <Flex align="center">

                            <Checkbox
                                checked={isRetakeLimited}
                                style={{
                                    alignSelf: "flex-start"
                                }}
                                onChange={(_, value) => setIsRetakeLimited(value)} />

                            <EpistoEntry
                                marginTop="0"
                                value={reateLimit}
                                disabled={!isRetakeLimited}
                                type="number"
                                setValue={setRetakeLimit} />
                        </Flex>
                    </EpistoLabel>

                    <EpistoLabel text="Záróvizsga?">
                        <Checkbox
                            checked={isFinalExam}
                            style={{
                                alignSelf: "flex-start"
                            }}
                            onChange={(_, value) => setIsFinalExam(value)} />
                    </EpistoLabel>
                </Flex>
                <Flex
                    direction="column"
                    className="roundBorders"
                    mt="5px"
                    mb="100px"
                    p="0 10px 10px 10px"
                    background="var(--transparentWhite70)">


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
                </Flex>
            </AdminSubpageHeader>
        </AdminBreadcrumbsHeader>

    </LoadingFrame>
}
