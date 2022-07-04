import { Flex } from '@chakra-ui/react';
import { useCallback, useMemo, useState } from 'react';
import { CourseItemApiService } from '../../../../services/api/CourseItemApiService';
import { translatableTexts } from '../../../../static/translatableTexts';
import { EpistoButton } from '../../../controls/EpistoButton';
import { EpistoFlex } from '../../../controls/EpistoFlex';
import { EpistoReactPlayer } from '../../../controls/EpistoReactPlayer';
import { useQuestionEditGridLogic } from '../questionsEditGrid/QuestionEditGridLogic';
import { AnswerMutationsType, QuestionMutationsType } from '../questionsEditGrid/QuestionEditGridTypes';
import { QuestionsEditGrid } from '../questionsEditGrid/QuestionsEditGrid';

export const VideoEditor = ({
    videoVersionId,
    enabled,
    onClose,
    questionMutations,
    answerMutations
}: {
    enabled: boolean,
    videoVersionId: number,
    onClose: (questionMutations: QuestionMutationsType, answerMutations: AnswerMutationsType) => void,
    questionMutations: QuestionMutationsType,
    answerMutations: AnswerMutationsType
}) => {

    // http
    const { courseItemEditData, courseItemEditDataState } = CourseItemApiService
        .useCourseItemEditData(videoVersionId, null, enabled);

    const [playedSeconds, setPlayedSeconds] = useState(0);

    // TODO optimize this
    const getPlayedSeconds = () => Math.floor(playedSeconds);

    const videoUrl = courseItemEditData?.videoUrl ?? '';
    const questions = useMemo(() => courseItemEditData?.questions ?? [], [courseItemEditData]);

    const logic = useQuestionEditGridLogic(questions, questionMutations, answerMutations, videoVersionId, null, true, getPlayedSeconds);

    const onCloseHandler = useCallback(() => {

        onClose(logic.questionMutations, logic.answerMutations);
    }, [onClose, logic.questionMutations]);

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
                logic={logic} />
        </Flex>

        {/* footer */}
        <EpistoFlex
            margin={{
                top: 'px5'
            }}
            width="stretch"
            justify="flex-end">

            <EpistoButton
                variant="colored"
                onClick={onCloseHandler}>
                {translatableTexts.misc.ok}
            </EpistoButton>
        </EpistoFlex>
    </Flex>;
};
