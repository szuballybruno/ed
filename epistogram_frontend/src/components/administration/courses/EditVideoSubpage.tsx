import { Box, Flex } from "@chakra-ui/layout";
import { Delete } from "@mui/icons-material";
import EditIcon from '@mui/icons-material/Edit';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import TimerIcon from '@mui/icons-material/Timer';
import { Slider } from "@mui/material";
import React, { useEffect, useRef, useState } from 'react';
import ReactPlayer from "react-player";
import { useParams } from "react-router";
import { applicationRoutes } from "../../../configuration/applicationRoutes";
import { roundNumber } from "../../../frontendHelpers";
import { QuestionDTO } from "../../../models/shared_models/QuestionDTO";
import { VideoEditDTO } from "../../../models/shared_models/VideoEditDTO";
import { getVirtualId } from "../../../services/idService";
import { useNavigation } from "../../../services/navigatior";
import { showNotification, useShowErrorDialog } from "../../../services/notifications";
import { useSaveVideo, useUploadVideoFileAsync, useVideoEditData } from "../../../services/videoService";
import { LoadingFrame } from "../../HOC/LoadingFrame";
import { EpistoButton } from "../../universal/EpistoButton";
import { EpistoEntry } from "../../universal/EpistoEntry";
import { FlexList } from "../../universal/FlexList";
import { FlexListItem } from "../../universal/FlexListItem";
import { HiddenFileUploadInput } from "../../universal/HiddenFileUploadInput";
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
                isNumeric
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
        pr="20px" />
}

export const EditVideoSubpage = () => {

    const [videoTitle, setVideoTitle] = useState("");
    const [videoSubtitle, setVideoSubtitle] = useState("");
    const [videoDescription, setVideoDescription] = useState("");
    const [videoFile, setVideoFile] = useState<File | null>(null);

    const videoUploadInputRef = useRef<HTMLInputElement>(null);
    const showError = useShowErrorDialog();

    const params = useParams<{ videoId: string, courseId: string }>();
    const videoId = parseInt(params.videoId);
    const courseId = parseInt(params.videoId);

    const { navigate } = useNavigation();

    const { saveVideoAsync, saveVideoState } = useSaveVideo();
    const { videoEditData, videoEditDataError, videoEditDataState, refetchVideoEditDataAsync } = useVideoEditData(videoId);
    const { saveVideoFileAsync, saveVideoFileState } = useUploadVideoFileAsync();

    const [playedSeconds, setPlayedSeconds] = useState(0);
    const videoLength = videoEditData?.videoLengthSeconds ?? 0;

    const [questions, setQuestions] = useState<QuestionDTO[]>([]);

    const setQuestionListOrdered = (newList: QuestionDTO[]) => {

        setQuestions(newList.orderBy(x => x.showUpTimeSeconds ?? 0));
    }

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
    }

    const marks = questions
        .map(x => ({
            value: x.showUpTimeSeconds ?? 0,
            label: x.showUpTimeSeconds + "s",
        }));

    const handleAddNewQuestion = () => {

        const playedSecondsRound = roundNumber(playedSeconds, 1);

        const newQuestion = {
            questionId: getVirtualId(),
            questionText: "Uj kerdes",
            showUpTimeSeconds: playedSecondsRound
        } as QuestionDTO;

        setQuestionListOrdered([...questions, newQuestion]);
    }

    const handleDeleteQuestion = (deletedId: number) => {

        setQuestionListOrdered(questions.filter(x => x.questionId !== deletedId));
    }

    const setQuestionValues = (questionId: number, text: string, showUpSeconds: number) => {

        const newList = [...questions];
        const question = newList.filter(x => x.questionId === questionId)[0];

        question.questionText = text;
        question.showUpTimeSeconds = showUpSeconds;

        setQuestionListOrdered(newList);
    }

    const navToEditQuestion = async (questionId: number) => {

        const isSuccessful = handleSaveAsync();
        if (!isSuccessful)
            return;

        navigate(applicationRoutes.administrationRoute.coursesRoute.editVideoQuestionRoute.route, { questionId, videoId, courseId })
    }

    return <LoadingFrame
        loadingState={[saveVideoState, videoEditDataState, saveVideoFileState]}
        error={[videoEditDataError]}
        className="whall">

        <AdminSubpageHeader
            onSave={handleSaveAsync}
            tabMenuItems={[
                applicationRoutes.administrationRoute.coursesRoute.editCourseRoute,
                applicationRoutes.administrationRoute.coursesRoute.statisticsCourseRoute,
                applicationRoutes.administrationRoute.coursesRoute.editVideoRoute,
            ]}>

            <Flex direction="column" px="20px" className="dividerBorderBottom">

                <HiddenFileUploadInput
                    type="video"
                    ref={videoUploadInputRef}
                    onFileSelected={(file) => setVideoFile(file)} />

                <EditSection title="Altalanos adatok">

                    <EpistoEntry
                        label="Cim"
                        setValue={setVideoTitle}
                        value={videoTitle} />

                    <EpistoEntry
                        label="Alcim"
                        setValue={setVideoSubtitle}
                        value={videoSubtitle} />

                    <EpistoEntry
                        label="Leiras"
                        setValue={setVideoDescription}
                        value={videoDescription}
                        isMultiline />

                </EditSection>

                <EditSection title="Video file" align="flex-start">
                    <EpistoButton
                        variant="outlined"
                        style={{ margin: "10px 0 10px 0" }}
                        onClick={() => videoUploadInputRef?.current?.click()}>
                        Video kivalasztasa
                    </EpistoButton>

                    {/* player */}
                    {(videoEditData?.videoFileUrl && !videoFile) && <ReactPlayer
                        width="100%"
                        controls
                        onProgress={x => setPlayedSeconds(x.playedSeconds)}
                        progressInterval={100}
                        url={videoEditData.videoFileUrl} />}

                    {videoFile && <EpistoEntry
                        label="Video file"
                        disabled
                        value={videoFile?.name ?? ""} />}
                </EditSection>
            </Flex>

            <Flex direction="column">

                <Box p="20px">
                    <Slider
                        defaultValue={80}
                        style={{ pointerEvents: "none" }}
                        max={videoLength}
                        value={playedSeconds}
                        marks={marks} />

                    <EpistoButton
                        onClick={handleAddNewQuestion}
                        variant="outlined">
                        Kerdes hozzaadasa
                    </EpistoButton>
                </Box>

                <Box minHeight="300px" mb="100px">
                    <FlexList>
                        {questions
                            .map(question => <QuestionItem
                                navToEditQuestion={navToEditQuestion}
                                currentSeconds={playedSeconds}
                                onChanged={(x, y) => setQuestionValues(question.questionId, x, y)}
                                onDeleted={() => handleDeleteQuestion(question.questionId)}
                                question={question} />)}
                    </FlexList>
                </Box>
            </Flex>
        </AdminSubpageHeader>
    </LoadingFrame>
}
