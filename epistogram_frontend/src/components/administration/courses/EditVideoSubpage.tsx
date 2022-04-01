import { Flex } from "@chakra-ui/layout";
import { Delete } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import LiveHelpIcon from "@mui/icons-material/LiveHelp";
import TimerIcon from "@mui/icons-material/Timer";
import { Slider } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { useParams } from "react-router";
import { applicationRoutes } from "../../../configuration/applicationRoutes";
import { useSaveVideo, useUploadVideoFileAsync, useVideoEditData } from "../../../services/api/videoApiService";
import { getVirtualId } from "../../../services/core/idService";
import { useNavigation } from "../../../services/core/navigatior";
import { showNotification, useShowErrorDialog } from "../../../services/core/notifications";
import { QuestionDTO } from "../../../shared/dtos/QuestionDTO";
import { VideoEditDTO } from "../../../shared/dtos/VideoEditDTO";
import { roundNumber } from "../../../static/frontendHelpers";
import { EpistoButton } from "../../controls/EpistoButton";
import { EpistoEntry } from "../../controls/EpistoEntry";
import { LoadingFrame } from "../../system/LoadingFrame";
import { FlexList } from "../../universal/FlexList";
import { FlexListItem } from "../../universal/FlexListItem";
import { HiddenFileUploadInput } from "../../universal/HiddenFileUploadInput";
import { AdminBreadcrumbsHeader } from "../AdminBreadcrumbsHeader";
import { AdminSubpageHeader } from "../AdminSubpageHeader";
import { EditSection } from "./EditSection";

const QuestionItem = (props: {
    currentSeconds: number,
    onChanged: (text: string, showUpSecs: number) => void,
    question: QuestionDTO,
    onDeleted: () => void,
    navToEditQuestion: (questionId: number) => void
}) => {

    const { question, onChanged, currentSeconds, onDeleted, navToEditQuestion } = props;
    const [text, setText] = useState("");
    const [showUpSecs, setShowUpSecs] = useState("");

    useEffect(() => {

        if (!question)
            return;

        setText(question.questionText);
        setShowUpSecs(question.showUpTimeSeconds + "");

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [question.questionText, question.questionId, question.showUpTimeSeconds]);

    return <FlexListItem
        thumbnailContent={<LiveHelpIcon className="square40" />}

        midContent={<EpistoEntry
            onFocusLost={() => onChanged(text, parseFloat(showUpSecs))}
            setValue={setText}
            value={text} />}

        endContent={<Flex>

            <EpistoButton onClick={() => {

                onChanged(text, roundNumber(currentSeconds));
            }}>
                <TimerIcon className="square30" />
            </EpistoButton>

            <EpistoEntry
                onFocusLost={() => onChanged(text, parseFloat(showUpSecs))}
                setValue={setShowUpSecs}
                postfix="s"
                type="number"
                value={showUpSecs} />

            <EpistoButton
                onClick={() => navToEditQuestion(question.questionId)}
                isDisabled={question.questionId >= 0 ? false : true}>

                <EditIcon className="square30" />
            </EpistoButton>

            <EpistoButton onClick={() => onDeleted()}>
                <Delete className="square30" />
            </EpistoButton>
        </Flex >}
        pr="20px" />;
};

// deprecated because DataGrid
export const EditVideoSubpage = () => {

    const [videoTitle, setVideoTitle] = useState("");
    const [videoSubtitle, setVideoSubtitle] = useState("");
    const [videoDescription, setVideoDescription] = useState("");
    const [videoFile, setVideoFile] = useState<File | null>(null);

    const videoUploadInputRef = useRef<HTMLInputElement>(null);
    const showError = useShowErrorDialog();

    const params = useParams<{ videoId: string, courseId: string }>();
    const videoId = parseInt(params.videoId);
    const courseId = parseInt(params.courseId);

    const { navigate } = useNavigation();

    const { saveVideoAsync, saveVideoState } = useSaveVideo();
    const { videoEditData, videoEditDataError, videoEditDataState, refetchVideoEditDataAsync } = useVideoEditData(videoId);
    const { saveVideoFileAsync, saveVideoFileState } = useUploadVideoFileAsync();

    const [playedSeconds, setPlayedSeconds] = useState(0);
    const videoLength = videoEditData?.videoLengthSeconds ?? 0;

    const [questions, setQuestions] = useState<QuestionDTO[]>([]);

    const setQuestionListOrdered = (newList: QuestionDTO[]) => {

        setQuestions(newList.orderBy(x => x.showUpTimeSeconds ?? 0));
    };

    useEffect(() => {

        if (!videoEditData)
            return;

        setVideoTitle(videoEditData.title);
        setVideoSubtitle(videoEditData.subtitle);
        setVideoDescription(videoEditData.description);
        setQuestionListOrdered(videoEditData.questions);
    }, [videoEditData]);

    const handleSaveAsync = async () => {

        try {

            // only save video file if selected
            if (videoFile) {

                await saveVideoFileAsync(videoId, videoFile);
            }

            await saveVideoAsync({
                id: videoId,
                title: videoTitle,
                description: videoDescription,
                subtitle: videoSubtitle,
                questions: questions
            } as VideoEditDTO);

            // cleanup
            setVideoFile(null);

            showNotification("Video sikeresen mentve!");

            // reload
            refetchVideoEditDataAsync();

            return true;
        }
        catch (e) {

            showError(e);
            return false;
        }
    };

    const marks = questions
        .map(x => ({
            value: x.showUpTimeSeconds ?? 0,
            label: x.showUpTimeSeconds + "s",
        }));

    const handleAddNewQuestion = () => {

        const playedSecondsRound = roundNumber(playedSeconds, 1);

        const newQuestion = {
            questionId: getVirtualId(),
            questionText: "",
            showUpTimeSeconds: playedSecondsRound
        } as QuestionDTO;

        setQuestionListOrdered([...questions, newQuestion]);
    };

    const handleDeleteQuestion = (deletedId: number) => {

        setQuestionListOrdered(questions.filter(x => x.questionId !== deletedId));
    };

    const setQuestionValues = (questionId: number, text: string, showUpSeconds: number) => {

        const newList = [...questions];
        const question = newList.filter(x => x.questionId === questionId)[0];

        question.questionText = text;
        question.showUpTimeSeconds = showUpSeconds;

        setQuestionListOrdered(newList);
    };

    const navToEditQuestion = async (questionId: number) => {

        const isSuccessful = handleSaveAsync();
        if (!isSuccessful)
            return;

        navigate(applicationRoutes.administrationRoute.coursesRoute.editVideoQuestionRoute.route, { questionId, videoId, courseId });
    };

    return <LoadingFrame
        loadingState={[saveVideoState, videoEditDataState, saveVideoFileState]}
        error={[videoEditDataError]}
        className="whall">

        <AdminBreadcrumbsHeader>
            {/* <AdminCourseItemList /> */}

            <AdminSubpageHeader
                onSave={handleSaveAsync}
                direction="column"
                tabMenuItems={[
                    applicationRoutes.administrationRoute.coursesRoute.editVideoRoute,
                    applicationRoutes.administrationRoute.coursesRoute.videoStatsRoute,
                ]}>

                <Flex direction="column">

                    <HiddenFileUploadInput
                        type="video"
                        ref={videoUploadInputRef}
                        onFileSelected={(file) => setVideoFile(file)} />

                    <EditSection
                        className="roundBorders"
                        background="var(--transparentWhite70)"
                        title="Általános adatok">

                        <EpistoEntry
                            label="Cím"
                            labelVariant="top"
                            setValue={setVideoTitle}
                            value={videoTitle} />

                        <EpistoEntry
                            label="Alcím"
                            labelVariant="top"
                            setValue={setVideoSubtitle}
                            value={videoSubtitle} />

                        <EpistoEntry
                            label="Leírás"
                            labelVariant="top"
                            setValue={setVideoDescription}
                            value={videoDescription}
                            isMultiline />

                    </EditSection>


                </Flex>

                <Flex direction="row">
                    <EditSection
                        flex="1"
                        mr="5px"
                        className="roundBorders"
                        background="var(--transparentWhite70)"
                        title="Videó fájl">

                        <EpistoButton
                            variant="outlined"
                            style={{ margin: "10px 0 10px 0" }}
                            onClick={() => videoUploadInputRef?.current?.click()}>
                            Videó kiválasztása
                        </EpistoButton>

                        {/* player */}
                        {(videoEditData?.videoFileUrl && !videoFile) && <ReactPlayer
                            width="100%"
                            controls
                            onProgress={x => setPlayedSeconds(x.playedSeconds)}
                            progressInterval={100}
                            url={videoEditData.videoFileUrl} />}

                        {videoFile && <EpistoEntry
                            label="Videó fájl"
                            disabled
                            value={videoFile?.name ?? ""} />}
                        <Slider
                            defaultValue={80}
                            style={{ pointerEvents: "none" }}
                            max={videoLength}
                            value={playedSeconds}
                            marks={marks} />
                    </EditSection>
                    <EditSection
                        title="Kérdések"
                        className="roundBorders"
                        background="var(--transparentWhite70)"
                        flex="1"
                        ml="5px"
                        direction="column">

                        <EpistoButton
                            onClick={handleAddNewQuestion}
                            variant="outlined">
                            Kérdés hozzáadása
                        </EpistoButton>
                        <FlexList>
                            {questions
                                .map(question => <QuestionItem
                                    navToEditQuestion={navToEditQuestion}
                                    currentSeconds={playedSeconds}
                                    onChanged={(x, y) => setQuestionValues(question.questionId, x, y)}
                                    onDeleted={() => handleDeleteQuestion(question.questionId)}
                                    question={question} />)}
                        </FlexList>

                    </EditSection>
                </Flex>
            </AdminSubpageHeader>
        </AdminBreadcrumbsHeader>


    </LoadingFrame >;
};
