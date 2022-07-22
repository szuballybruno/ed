import { Flex } from '@chakra-ui/react';
import { usePretestData } from '../../../services/api/pretestApiService';
import { useNavigation } from '../../../services/core/navigatior';
import { Id } from '../../../shared/types/versionId';
import { Environment } from '../../../static/Environemnt';
import { useIntParam } from '../../../static/locationHelpers';
import { translatableTexts } from '../../../static/translatableTexts';
import { EpistoFont } from '../../controls/EpistoFont';
import { ExamLayout } from '../../exam/ExamLayout';
import { ExamLayoutContent } from '../../exam/ExamLayoutContent';
import { ExamQuestions } from '../../exam/ExamQuestions';
import { LoadingFrame } from '../../system/LoadingFrame';

export const PretestGreetingSubpage = () => {

    const courseId = Id
        .create<'Course'>(useIntParam('courseId')!);

    const { navigateToWatchPretest } = useNavigation();

    const { pretestData, pretestDataError, pretestDataState } = usePretestData(courseId);

    const startPretestExam = () => {

        navigateToWatchPretest(courseId);
    };

    return (
        <ExamLayout
            headerCenterText='Szintfelmérő vizsga'
            handleNext={(): void => {
                startPretestExam();
            }} 
            nextButtonTitle={'Kezdés'}
            showNextButton>

<Flex
            direction="column"
            align="center"
            justify='center'
            background='var(--transparentWhite70)'
            flex="1"
            p='20px'
            className="whall roundBorders mildShadow">
            <img
                src={Environment.getAssetUrl('/images/examCover.png')}
                alt={''}
                style={{
                    objectFit: 'contain',
                    maxHeight: 200,
                    margin: '30px 0'
                }} />

            <EpistoFont
                fontSize="fontHuge">

                {'Szintfelmérő vizsga'}
            </EpistoFont>

            <EpistoFont
                style={{
                    padding: '30px',
                    maxWidth: '500px'
                }}>

                {translatableTexts.exam.greetText}
            </EpistoFont>

        </Flex>
        </ExamLayout>
    );
};