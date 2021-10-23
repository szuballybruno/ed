import { Box, Flex } from "@chakra-ui/layout";
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import { Slider } from "@mui/material";
import React, { useEffect, useRef, useState } from 'react';
import ReactPlayer from "react-player";
import { useParams } from "react-router";
import { applicationRoutes } from "../../../configuration/applicationRoutes";
import { parseIntOrNull, roundNumber } from "../../../frontendHelpers";
import { QuestionDTO } from "../../../models/shared_models/QuestionDTO";
import { getVirtualId } from "../../../services/idService";
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
import TimerIcon from '@mui/icons-material/Timer';

const QuestionItem = (props: {
    currentSeconds: number,
    onChanged: (text: string, showUpSecs: number) => void,
    question: QuestionDTO
}) => {

    const { question, onChanged, currentSeconds } = props;
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
            onFocusLost={() => onChanged(text, parseInt(showUpSecs))}
            setValue={setText}
            value={text} />}

        endContent={<Flex>

            <EpistoButton onClick={() => {

                onChanged(text, roundNumber(currentSeconds));
            }}>
                <TimerIcon className="square40" />
            </EpistoButton>

            <EpistoEntry
                onFocusLost={() => onChanged(text, parseInt(showUpSecs))}
                setValue={setShowUpSecs}
                postfix="s"
                isNumeric
                value={showUpSecs} />
        </Flex>}
        pr="20px" />
}

export const EditVideoSubpage = () => {

    const [videoTitle, setVideoTitle] = useState("");
    const [videoSubtitle, setVideoSubtitle] = useState("");
    const [videoDescription, setVideoDescription] = useState("");
    const [videoFile, setVideoFile] = useState<File | null>(null);

    const videoUploadInputRef = useRef<HTMLInputElement>(null);
    const showError = useShowErrorDialog();

    const params = useParams<{ videoId: string }>();
    const videoId = parseInt(params.videoId);

    const { saveVideoAsync, saveVideoState } = useSaveVideo();
    const { videoEditData, videoEditDataError, videoEditDataState } = useVideoEditData(videoId);
    const { saveVideoFileAsync, saveVideoFileState } = useUploadVideoFileAsync();

    const [playedSeconds, setPlayedSeconds] = useState(0);
    const videoLength = videoEditData?.videoLengthSeconds ?? 0;

    useEffect(() => {

        if (!videoEditData)
            return;

        setVideoTitle(videoEditData.title);
        setVideoSubtitle(videoEditData.subtitle);
        setVideoDescription(videoEditData.description);
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
                subtitle: videoSubtitle
            });

            // cleanup
            setVideoFile(null);

            showNotification("Video sikeresen mentve!");
        }
        catch (e) {

            showError(e);
        }
    }

    const [questionsList, setQuestionList] = useState<QuestionDTO[]>([
        {
            questionText: "asdasdasd",
            showUpTimeSeconds: 12
        },

    ] as QuestionDTO[]);

    const marks = questionsList
        .map(x => ({
            value: x.showUpTimeSeconds ?? 0,
            label: x.showUpTimeSeconds + "s",
        }));

    const setQuestionListOrdered = (newList: QuestionDTO[]) => {

        setQuestionList(newList.orderBy(x => x.showUpTimeSeconds ?? 0));
    }

    const handleAddNewQuestion = () => {

        const playedSecondsRound = roundNumber(playedSeconds, 1);

        const newQuestion = {
            questionId: getVirtualId(),
            questionText: "Uj kerdes",
            showUpTimeSeconds: playedSecondsRound
        } as QuestionDTO;

        setQuestionListOrdered([...questionsList, newQuestion]);
    }

    const setQuestionValues = (questionId: number, text: string, showUpSeconds: number) => {

        const newList = [...questionsList];
        const question = newList.filter(x => x.questionId === questionId)[0];

        question.questionText = text;
        question.showUpTimeSeconds = showUpSeconds;

        setQuestionListOrdered(newList);
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
                        {questionsList
                            .map(question => <QuestionItem
                                currentSeconds={playedSeconds}
                                onChanged={(x, y) => setQuestionValues(question.questionId, x, y)}
                                question={question} />)}
                    </FlexList>
                </Box>
            </Flex>
        </AdminSubpageHeader>
    </LoadingFrame>
}
