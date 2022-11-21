import { useEffect } from 'react';
import { applicationRoutes } from '../../../configuration/applicationRoutes';
import { CourseApiService } from '../../../services/api/courseApiService';
import { useNavigation } from '../../../services/core/navigatior';
import { Environment } from '../../../static/Environemnt';
import { useRouteParams } from '../../../static/locationHelpers';
import { EpistoFlex2 } from '../../controls/EpistoFlex';
import { EpistoFont } from '../../controls/EpistoFont';
import { ExamLayout } from '../../exam/ExamLayout';
import { useVideoPlayerFullscreenContext } from '../watch/videoPlayer/VideoPlayerFullscreenFrame';

export const GreetingSubpage = () => {

    const { navigate2 } = useNavigation();
    const [, setIsFullscreen] = useVideoPlayerFullscreenContext();

    const courseId = useRouteParams(applicationRoutes.playerRoute.greetingRoute)
        .getValue(x => x.courseId, 'int');

    const { greetingsData } = CourseApiService
        .useGreetingData(courseId);

    const { startCourse, startCourseState } = CourseApiService
        .useStartCourse();

    const { isPrequizRequired, isPretestRequired } = greetingsData ?? {
        isPrequizRequired: true,
        isPretestRequired: true
    };

    useEffect(() => {
        setIsFullscreen(true);
    }, []);

    const { nextTitle, navigate } = (() => {

        if (isPrequizRequired)
            return {
                nextTitle: 'Tanfolyami kérdőív',
                navigate: async () => {

                    await startCourse({
                        courseId,
                        currentItemCode: null,
                        stageName: 'prequiz'
                    });
                    navigate2(applicationRoutes.playerRoute.prequizRoute, { courseId });
                }
            };

        if (isPretestRequired)
            return {
                nextTitle: 'Tudasfelmero kerdoiv',
                navigate: async () => {

                    await startCourse({
                        courseId,
                        currentItemCode: null,
                        stageName: 'pretest'
                    });
                    navigate2(applicationRoutes.playerRoute.pretestRoute, { courseId });
                }
            };

        return {
            nextTitle: 'Kurzus elso videoja',
            navigate: async () => {

                const code = greetingsData?.firstItemPlaylistCode!;

                await startCourse({
                    courseId,
                    currentItemCode: code,
                    stageName: 'watch'
                });
                navigate2(applicationRoutes.playerRoute.watchRoute, { descriptorCode: code });
            }
        };
    })();

    return (
        <ExamLayout
            headerCenterText={nextTitle}
            footerButtons={[{
                title: 'Kezdés',
                action: navigate
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
                    {nextTitle}
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