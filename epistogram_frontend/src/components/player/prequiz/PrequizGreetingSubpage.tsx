import { useEffect } from 'react';
import { applicationRoutes } from '../../../configuration/applicationRoutes';
import { useNavigation } from '../../../services/core/navigatior';
import { Environment } from '../../../static/Environemnt';
import { useRouteParams } from '../../../static/locationHelpers';
import { EpistoFlex2 } from '../../controls/EpistoFlex';
import { EpistoFont } from '../../controls/EpistoFont';
import { ExamLayout } from '../../exam/ExamLayout';
import { useVideoPlayerFullscreenContext } from '../watch/videoPlayer/VideoPlayerFullscreenFrame';

export const PrequizGreetingSubpage = () => {

    const { navigate2 } = useNavigation();
    const [isFullscreen, setIsFullscreen] = useVideoPlayerFullscreenContext();

    const courseId = useRouteParams(applicationRoutes.playerRoute.prequizGreetingRoute)
        .getValue(x => x.courseId, 'int');

    useEffect(() => {
        setIsFullscreen(true);
    }, []);

    const gotToPrequiz = () => {

        navigate2(applicationRoutes.playerRoute.prequizRoute, { courseId });
    };

    return (
        <ExamLayout
            headerCenterText='Tanfolyami kérdőív'
            footerButtons={[{
                title: 'Kezdés',
                action: gotToPrequiz
            }]}>

            <EpistoFlex2
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

                    {'Tanfolyami kérdőív'}
                </EpistoFont>

                <EpistoFont
                    style={{
                        padding: '30px',
                        maxWidth: '600px',
                        textAlign: 'center'
                    }}>

                    {'A tanfolyam előtt feltennénk neked pár kérdést, így pontosan tudni fogjuk, mennyi időt tudsz rászánni a tanulásra!'}
                </EpistoFont>
            </EpistoFlex2>
        </ExamLayout>
    );
};