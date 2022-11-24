import { Box } from '@chakra-ui/layout';
import { useEffect, useState } from 'react';
import { EpistoEntry } from '../../../controls/EpistoEntry';
import { EpistoLabel } from '../../../controls/EpistoLabel';

export const useVideoAudioTextEditorLogic = ({
    defaultText
}: {
    defaultText: string
}) => {

    const [audioText, setAudioText] = useState(defaultText);

    useEffect(() => setAudioText(defaultText), [defaultText]);

    return {
        audioText,
        setAudioText
    };
};

export type VideoAudioTextEditorLogicType = ReturnType<typeof useVideoAudioTextEditorLogic>;

export const VideoAudioTextEditor = ({
    logic
}: {
    logic: VideoAudioTextEditorLogicType
}) => {

    const { audioText, setAudioText } = logic;

    return (
        <>
            {/* audio text */}
            <Box
                padding="10px"
                bg="white"
                borderRadius="5px"
                width="100%"
                mt="10px">

                <EpistoLabel
                    isOverline
                    text="Video audio text">

                    <EpistoEntry
                        style={{
                            width: '100%'
                        }}
                        height="100%"
                        isMultiline
                        value={audioText}
                        setValue={setAudioText} />
                </EpistoLabel>
            </Box>
        </>
    );
};