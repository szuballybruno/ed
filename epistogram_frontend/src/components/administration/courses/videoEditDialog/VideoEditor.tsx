import { Flex } from '@chakra-ui/react';
import { useState } from 'react';
import { CourseItemApiService } from '../../../../services/api/CourseItemApiService';
import { EpistoReactPlayer } from '../../../controls/EpistoReactPlayer';
import { QuestionsEditGrid } from '../QuestionsEditGrid';

export const VideoEditor = ({
    videoVersionId,
    enabled
}: {
    enabled: boolean,
    videoVersionId: number
}) => {

    // http
    const { courseItemEditData, courseItemEditDataState } = CourseItemApiService
        .useCourseItemEditData(videoVersionId, null, enabled);

    const [playedSeconds, setPlayedSeconds] = useState(0);

    // TODO optimize this
    const getPlayedSeconds = () => Math.floor(playedSeconds);

    const videoUrl = courseItemEditData?.videoUrl ?? '';
    const questions = courseItemEditData?.questions ?? [];

    return <Flex
        direction="column"
        flex="1"
        padding="10px">

        {/* video preview */}
        <Flex
            className="mildShadow"
            height="300px">

            <EpistoReactPlayer
                width="100%"
                height="calc(56.25 / 100)"
                controls
                onProgress={x => setPlayedSeconds(x.playedSeconds)}
                progressInterval={100}
                style={{
                    borderRadius: 7,
                    overflow: 'hidden'
                }}
                url={videoUrl} />
        </Flex>

        {/* questions list */}
        <Flex flex="1">

            <QuestionsEditGrid
                getPlayedSeconds={getPlayedSeconds}
                showTiming
                questions={questions} />
        </Flex>
    </Flex>;
};
