import { Flex } from '@chakra-ui/react';
import { useEffect, useMemo } from 'react';
import { CourseItemApiService } from '../../../../services/api/CourseItemApiService';
import { useForceUpdate } from '../../../../static/frontendHelpers';
import { translatableTexts } from '../../../../static/translatableTexts';
import { EpistoButton } from '../../../controls/EpistoButton';
import { LoadingFrame } from '../../../system/LoadingFrame';
import { useQuestionEditGridLogic } from '../questionsEditGrid/QuestionEditGridLogic';
import { QuestionsEditGrid } from '../questionsEditGrid/QuestionsEditGrid';

export const ExamEditor = ({
    examVersionId,
    endabled
}: {
    examVersionId: number,
    endabled: boolean
}) => {

    // http
    const { courseItemEditData, courseItemEditDataState } = CourseItemApiService
        .useCourseItemEditData(null, examVersionId, endabled);

    const questions = useMemo(() => {

        console.log('------ sadadwwdw');
        return courseItemEditData?.questions ?? [];
    }, [courseItemEditData]);

    const logic = useQuestionEditGridLogic(questions);

    useEffect(() => {

        console.log('questions changed!');
    }, [questions]);

    return <LoadingFrame
        loadingState={'success'}
        flex='1'
        direction='column'
        className="roundBorders largeSoftShadow"
        justify='flex-start'
        overflowY='scroll'
        style={{
            padding: '10px',
            background: 'var(--transparentWhite90)'
        }}>

        <Flex
            flex='1'
            direction='column'>

            {/* questions list  */}
            <QuestionsEditGrid
                logic={logic} />

            {/* buttons */}
            <Flex
                width="100%"
                marginTop="10px"
                justify="flex-end">

                {/* reset */}
                <EpistoButton
                    isDisabled={!logic.isAnyMutated}
                    onClick={logic.resetMutations}
                    variant="outlined">

                    {translatableTexts.misc.reset}
                </EpistoButton>

                {/* ok */}
                <EpistoButton
                    margin={{ left: 'px10' }}
                    isDisabled={!logic.isAnyMutated}
                    onClick={() => 1}
                    variant="colored">

                    {translatableTexts.misc.ok}
                </EpistoButton>
            </Flex>
        </Flex>
    </LoadingFrame>;
};
