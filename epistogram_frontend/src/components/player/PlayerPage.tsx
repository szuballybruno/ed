import { applicationRoutes } from '../../configuration/applicationRoutes';
import { ContentPane } from '../ContentPane';
import { PageRootContainer } from '../PageRootContainer';
import { EpistoRoutes } from '../universal/EpistoRoutes';
import { CourseOverviewSubpage } from './courseOverview/CourseOverviewSubpage';
import { CourseRatingSubpage } from './courseRating/CourseRatingSubpage';
import { PrequizSubpage } from './prequiz/PrequizSubpage';
import { PretestResultsSubpage } from './pretest/PretestResultsSubpage';
import { PretestSubpage } from './pretest/PretestSubpage';
import { WatchSubpage } from './watch/WatchSubpage';

export const PlayerPage = () => {

    return (
        <PageRootContainer
            style={{
                '--playerWidth': 'min(min(100vw, 180vh), 1700px)',
                background: 'var(--gradientBlueBackground)'
            } as any}>

            <ContentPane
                width="var(--playerWidth)"
                margin="auto"
                maxHeight='100vh'
                overflowY='hidden'
                isMinimalMode
                showLogo>

                <EpistoRoutes
                    renderRoutes={[
                        {
                            route: applicationRoutes.playerRoute.prequizRoute,
                            element: <PrequizSubpage />
                        },
                        {
                            route: applicationRoutes.playerRoute.pretestRoute,
                            element: <PretestSubpage />
                        },
                        {
                            route: applicationRoutes.playerRoute.pretestResultsRoute,
                            element: <PretestResultsSubpage />
                        },
                        {
                            route: applicationRoutes.playerRoute.watchRoute,
                            element: <WatchSubpage />
                        },
                        {
                            route: applicationRoutes.playerRoute.courseRatingRoute,
                            element: <CourseRatingSubpage />
                        },
                        {
                            route: applicationRoutes.playerRoute.courseOverviewRoute,
                            element: <CourseOverviewSubpage />
                        }
                    ]} />
            </ContentPane>
        </PageRootContainer >
    );
};
