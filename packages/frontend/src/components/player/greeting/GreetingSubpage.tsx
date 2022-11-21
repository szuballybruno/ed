import { useEffect } from 'react';
import { applicationRoutes } from '../../../configuration/applicationRoutes';
import { Responsivity } from '../../../helpers/responsivity';
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

    const { isMobile } = Responsivity.useIsMobileView();
    const { isIPhone } = Responsivity.useIsIPhone();

    const { greetingsData } = CourseApiService
        .useGreetingData(courseId);

    const { startCourse, startCourseState } = CourseApiService
        .useStartCourse();

    useEffect(() => {
        setIsFullscreen(true);
    }, []);

    const {
        nextTitle,
        description,
        navigate
    } = (() => {

        if (greetingsData?.isPrequizRequired || greetingsData?.isPretestRequired)
            return {
                nextTitle: 'Tanfolyami kérdőív',
                description: 'A tanfolyam előtt feltennénk neked pár kérdést, így pontosan tudni fogjuk, mennyi időt tudsz rászánni a tanulásra!',
                navigate: async () => {

                    await startCourse({
                        courseId,
                        currentItemCode: null,
                        stageName: 'prequiz'
                    });
                    navigate2(applicationRoutes.playerRoute.prequizRoute, { courseId });
                }
            };

        /*         if (greetingsData?.isPretestRequired)
                    return {
                        nextTitle: 'Tudásfelmérő kérdőív',
                        description: 'A tanfolyam előtt feltennénk neked pár kérdést, így pontosan tudni fogjuk, mennyi időt tudsz rászánni a tanulásra!',
                        navigate: async () => {
        
                            await startCourse({
                                courseId,
                                currentItemCode: null,
                                stageName: 'pretest'
                            });
                            navigate2(applicationRoutes.playerRoute.pretestRoute, { courseId });
                        }
                    }; */

        return {
            nextTitle: greetingsData?.courseName || '',
            description: 'A Kezdés gombra kattintva azonnal elindul a tanfolyam, és bele is vághatsz a tanulásba!',
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
            maxH={(() => {

                if (isIPhone) {
                    return 'calc(100vh - 160px)';
                }

                if (isMobile) {
                    return 'calc(100vh - 120px)';
                }
            })()}
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

                    {description}
                </EpistoFont>
            </EpistoFlex2>
        </ExamLayout>
    );
};