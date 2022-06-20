import { Flex } from '@chakra-ui/react';
import { Add } from '@mui/icons-material';
import { CourseItemApiService } from '../../../../services/api/CourseItemApiService';
import { QuestionEditDataDTO } from '../../../../shared/dtos/QuestionEditDataDTO';
import { translatableTexts } from '../../../../static/translatableTexts';
import { EpistoButton } from '../../../controls/EpistoButton';
import { LoadingFrame } from '../../../system/LoadingFrame';
import { QuestionsEditGrid } from '../QuestionsEditGrid';

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

    const questions = courseItemEditData?.questions ?? [];

    const getColumnCountFromAnswers = (questions: QuestionEditDataDTO[]): number => {
        const questionWithMostAnswer = questions
            .find(x => {
                let maxLength;

                if (x.answers.length > maxLength)
                    maxLength = x.answers.length;

                return maxLength;
            });

        return questionWithMostAnswer?.answers.length || 4;
    };

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
                questions={questions} />

            {/* buttons */}
            <Flex
                width="100%"
                marginTop="10px"
                justify="flex-end">

                {/* add */}
                <EpistoButton
                    onClick={() => 1}
                    variant='outlined'>

                    <Add />
                </EpistoButton>

                {/* save */}
                <EpistoButton
                    isDisabled={false}
                    onClick={() => 1}
                    variant="colored">

                    {translatableTexts.misc.save}
                </EpistoButton>
            </Flex>
        </Flex>
    </LoadingFrame>;
};
