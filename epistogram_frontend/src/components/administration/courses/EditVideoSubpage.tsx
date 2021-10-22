import { Flex } from "@chakra-ui/layout";
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from "react-router";
import { applicationRoutes } from "../../../configuration/applicationRoutes";
import { showNotification, useShowErrorDialog } from "../../../services/notifications";
import { useSaveVideo, useUploadVideoFileAsync, useVideoEditData } from "../../../services/videoService";
import { LoadingFrame } from "../../HOC/LoadingFrame";
import { EpistoButton } from "../../universal/EpistoButton";
import { EpistoEntry } from "../../universal/EpistoEntry";
import { HiddenFileUploadInput } from "../../universal/HiddenFileUploadInput";
import { AdminSubpageHeader } from "../AdminSubpageHeader";
import { EditSection } from "./EditSection";

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

            <Flex direction="column" p="20px">

                <HiddenFileUploadInput
                    type="video"
                    ref={videoUploadInputRef}
                    onFileSelected={(file) => setVideoFile(file)} />

                <EditSection title="Video file" align="flex-start">
                    <EpistoButton
                        variant="outlined"
                        style={{ margin: "10px 0 10px 0" }}
                        onClick={() => videoUploadInputRef?.current?.click()}>
                        Video kivalasztasa
                    </EpistoButton>

                    {videoFile && <EpistoEntry
                        label="Video file"
                        disabled
                        value={videoFile?.name ?? ""} />}
                </EditSection>

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
            </Flex>
        </AdminSubpageHeader>
    </LoadingFrame>
}
