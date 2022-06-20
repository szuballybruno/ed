import { Flex } from '@chakra-ui/react';
import { Add } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { CourseItemApiService } from '../../../../services/api/CourseItemApiService';
import { getVirtualId } from '../../../../services/core/idService';
import { AnswerEditDTO } from '../../../../shared/dtos/AnswerEditDTO';
import { QuestionEditDataDTO } from '../../../../shared/dtos/QuestionEditDataDTO';
import { iterate } from '../../../../static/frontendHelpers';
import { translatableTexts } from '../../../../static/translatableTexts';
import { EpistoButton } from '../../../controls/EpistoButton';
import { EpistoReactPlayer } from '../../../controls/EpistoReactPlayer';
import { useXListMutator } from '../../../lib/XMutator/XMutator';
import { EpistoDialogLogicType } from '../../../universal/epistoDialog/EpistoDialogTypes';
import { QuestionsEditGrid } from '../QuestionsEditGrid';
import { QuestionEditItem } from './QuestionEditItem';
import { EditQuestionFnType } from './VideoEditDialog';
import { VideoEditDialogParams } from './VideoEditDialogTypes';

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

    // const videoTitle = videoQuestionEditData?.title || '';
    // const courseName = videoQuestionEditData?.courseName || '';

    const videoUrl = courseItemEditData?.videoUrl ?? '';
    const questions = courseItemEditData?.questions ?? [];

    const {
        mutatedData,
        add: addQuestion,
        mutate: mutateQuestion,
        remove: removeQuestion,
        isMutated: isQuestionModified,
        isAnyMutated: isAnyQuestionsMutated,
        mutations,
        resetMutations,
        addOnMutationHandlers
    } = useXListMutator<QuestionEditDataDTO, 'questionVersionId', number>(questions, 'questionVersionId', () => console.log(''));

    // mutation handlers
    const handleMutateQuestion: EditQuestionFnType = (key, field, value) => {

        mutateQuestion({ key, field: field as any, newValue: value });
    };

    const handleAddQuestion = () => {

        const newId = getVirtualId();

        const dto: QuestionEditDataDTO = {
            questionVersionId: newId,
            questionText: '',
            questionShowUpTimeSeconds: 0,
            answers: iterate(4, (index) => ({
                answerVersionId: 0 - index,
                text: '',
                isCorrect: false
            } as AnswerEditDTO))
        };

        addQuestion(newId, dto);
    };

    // const handleSaveQuestionsAsync = async () => {

    //     try {

    //         await saveVideoQuestionEditData(mutations as any);
    //         resetMutations();
    //         logic.closeDialog();
    //     }
    //     catch (e) {

    //         showError(e);
    //     }
    // };


    const [playedSeconds, setPlayedSeconds] = useState(0);

    const handleQuestionShowUpTime = (key: number) => {

        handleMutateQuestion(key, 'questionShowUpTimeSeconds', playedSeconds);
        return playedSeconds;
    };

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
                questions={questions} />
        </Flex>
    </Flex>;
};
