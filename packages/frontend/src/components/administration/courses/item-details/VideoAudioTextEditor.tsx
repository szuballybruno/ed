import { Box } from '@chakra-ui/layout';
import { useEffect, useMemo, useState } from 'react';
import { translatableTexts } from '../../../../static/translatableTexts';
import { EpistoEntry } from '../../../controls/EpistoEntry';
import { EpistoLabel } from '../../../controls/EpistoLabel';

export const useVideoTextsEditorLogic = ({
    initialAudioText,
    initialDescription
}: {
    initialAudioText: string,
    initialDescription: string
}) => {

    const [audioText, setAudioText] = useState(initialAudioText);
    const [description, setDescription] = useState(initialDescription);

    useEffect(() => setAudioText(initialAudioText), [initialAudioText]);
    useEffect(() => setDescription(initialDescription), [initialDescription]);

    const isChanged = useMemo(() => {

        if (audioText !== initialAudioText)
            return true;

        if (description !== initialDescription)
            return true;

        return false;
    }, [audioText, description, initialAudioText, initialDescription]);

    return {
        audioText,
        setAudioText,
        description,
        setDescription,
        isChanged
    };
};

type VideoTextsEditorLogicType = ReturnType<typeof useVideoTextsEditorLogic>;

export const VideoAudioTextEditor = ({
    logic: {
        audioText,
        setAudioText,
        description,
        setDescription
    }
}: {
    logic: VideoTextsEditorLogicType
}) => {

    return (
        <>
            {/* audio text */}
            <Box
                padding="10px"
                bg="white"
                borderRadius="5px"
                width="100%"
                mt="10px">

                {/* video audio text */}
                <EpistoLabel
                    isOverline
                    text={translatableTexts.administration.courseContentSubpage.video.videoAudioTextTitle}>

                    <EpistoEntry
                        style={{
                            width: '100%'
                        }}
                        height="100%"
                        isMultiline
                        value={audioText}
                        setValue={setAudioText} />
                </EpistoLabel>

                {/* vidoe description */}
                <EpistoLabel
                    isOverline
                    text={translatableTexts.administration.courseContentSubpage.video.videoDescriptionTitle}>

                    <EpistoEntry
                        style={{
                            width: '100%'
                        }}
                        height="100%"
                        isMultiline
                        value={description}
                        setValue={setDescription} />
                </EpistoLabel>
            </Box>
        </>
    );
};