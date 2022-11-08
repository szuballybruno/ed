import { useCallback, useMemo, useState } from 'react';
import { CourseItemApiService } from '../../../../services/api/CourseItemApiService';
import { ModuleEditDTO } from '@episto/communication';
import { Id } from '@episto/commontypes';
import { useStateAndRef } from '../../../../static/frontendHelpers';
import { translatableTexts } from '../../../../static/translatableTexts';
import { EpistoButton } from '../../../controls/EpistoButton';
import { EpistoFlex, EpistoFlex2 } from '../../../controls/EpistoFlex';
import { EpistoReactPlayer } from '../../../controls/EpistoReactPlayer';
import { useQuestionEditGridLogic } from '../questionsEditGrid/QuestionEditGridLogic';
import { AnswerMutationsType, QuestionMutationsType } from '../questionsEditGrid/QuestionEditGridTypes';
import { QuestionsEditGrid } from '../questionsEditGrid/QuestionsEditGrid';

export const VideoEditor = ({
    videoVersionId,
    enabled,
    onClose,
    questionMutations,
    answerMutations,
    defaultModuleId,
    modules
}: {
    enabled: boolean,
    videoVersionId: Id<'VideoVersion'>,
    onClose: (questionMutations: QuestionMutationsType, answerMutations: AnswerMutationsType) => void,
    questionMutations: QuestionMutationsType,
    answerMutations: AnswerMutationsType,
    defaultModuleId: Id<'Module'> | null,
    modules: ModuleEditDTO[]
}) => {

    // http
    const { courseItemEditData, courseItemEditDataState } = CourseItemApiService
        .useCourseItemEditData(videoVersionId, null, enabled);

    const [playedSeconds, setPlayedSeconds] = useState(0);

    // TODO optimize this
    const getPlayedSeconds = useCallback(() => Math.floor(playedSeconds), [playedSeconds]);

    const videoUrl = courseItemEditData?.videoUrl ?? '';
    const questions = useMemo(() => courseItemEditData?.questions ?? [], [courseItemEditData]);

    const [questionGridHasFocusRef, questionGridHasFocus, setQuestionGridHasFocus] = useStateAndRef(false);

    const logic = useQuestionEditGridLogic({
        questions,
        questionMutations,
        answerMutations,
        videoVersionId,
        examVersionId: null,
        defaultModuleId,
        modules,
        showTiming: true,
        getPlayedSeconds,
        onFocusChanged: setQuestionGridHasFocus,
        showQuestionModuleSelector: false
    });

    const onCloseHandler = useCallback(() => {

        onClose(logic.questionMutations, logic.answerMutations);
    }, [onClose, logic]);

    return <EpistoFlex2
        direction="column"
        flex="1"
        padding="10px">

        {/* video preview */}
        <EpistoFlex2
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
        </EpistoFlex2>

        {/* questions list */}
        <EpistoFlex2 flex="1">

            <QuestionsEditGrid
                logic={logic} />
        </EpistoFlex2>

        {/* footer */}
        <EpistoFlex
            margin={{
                top: 'px5'
            }}
            width="stretch"
            justify="flex-end">

            <EpistoButton
                isDisabled={questionGridHasFocus}
                variant="colored"
                onClick={onCloseHandler}>
                {translatableTexts.misc.ok}
            </EpistoButton>
        </EpistoFlex>
    </EpistoFlex2>;
};
