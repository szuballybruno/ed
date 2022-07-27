import { Flex } from '@chakra-ui/react';
import { applicationRoutes } from '../../../configuration/applicationRoutes';
import { useNavigation } from '../../../services/core/navigatior';
import { Environment } from '../../../static/Environemnt';
import { useRouteParams } from '../../../static/locationHelpers';
import { translatableTexts } from '../../../static/translatableTexts';
import { EpistoFont } from '../../controls/EpistoFont';
import { ExamLayout } from '../../exam/ExamLayout';

export const PretestGreetingSubpage = () => {

    const { navigate2 } = useNavigation();
    
    const courseId = useRouteParams(applicationRoutes.playerRoute.pretestGreetingRoute)
        .getValue(x => x.courseId, 'int');

    const gotToPretest = () => {

        navigate2(applicationRoutes.playerRoute.pretestRoute, { courseId });
    };

    return (
        <ExamLayout
            headerCenterText='Szintfelmérő vizsga'
            footerButtons={[{
                title: 'Kezdés',
                action: gotToPretest
            }]}>

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