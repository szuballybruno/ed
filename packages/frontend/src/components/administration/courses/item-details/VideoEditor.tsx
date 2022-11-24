import { Id } from '@episto/commontypes';
import { CourseItemEditDTO, ModuleEditDTO } from '@episto/communication';
import { useCallback, useMemo, useState } from 'react';
import { EpistoFlex2 } from '../../../controls/EpistoFlex';
import { EpistoReactPlayer } from '../../../controls/EpistoReactPlayer';
import { useQuestionEditGridLogic } from '../questionsEditGrid/QuestionEditGridLogic';
import { AnswerMutationsType, QuestionMutationsType } from '../questionsEditGrid/QuestionEditGridTypes';
import { QuestionsEditGrid } from '../questionsEditGrid/QuestionsEditGrid';

export const useVideoEditorLogic = ({
    videoVersionId,
    questionMutations,
    answerMutations,
    defaultModuleId,
    modules,
    editData
}: {
    videoVersionId: Id<'VideoVersion'>,
    questionMutations: QuestionMutationsType,
    answerMutations: AnswerMutationsType,
    defaultModuleId: Id<'Module'> | null,
    modules: ModuleEditDTO[],
    editData: CourseItemEditDTO | null
}) => {

    const {
        videoUrl
    } = editData ?? {
        videoUrl: ''
    };
    const questions = useMemo(() => editData?.questions ?? [], [editData]);

    const [playedSeconds, setPlayedSeconds] = useState(0);

    // TODO optimize this
    const getPlayedSeconds = useCallback(() => Math.floor(playedSeconds), [playedSeconds]);

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
        showQuestionModuleSelector: false
    });

    return {
        videoUrl,
        logic,
        setPlayedSeconds,
        questionMutations: logic.questionMutations,
        answerMutations: logic.answerMutations
    };
};

export type VideoEditorLogicType = ReturnType<typeof useVideoEditorLogic>;

export const VideoEditor = ({
    logic: {
        videoUrl,
        logic,
        setPlayedSeconds
    }
}: {
    logic: VideoEditorLogicType
}) => {

    return (
        <>
            <EpistoFlex2
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
                        url={videoUrl ?? ''} />
                </EpistoFlex2>

                {/* questions list */}
                <EpistoFlex2 flex="1">

                    <QuestionsEditGrid
                        logic={logic} />
                </EpistoFlex2>
            </EpistoFlex2>
        </>
    );
};
