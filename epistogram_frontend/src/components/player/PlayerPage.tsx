import { Switch } from "react-router";
import { applicationRoutes } from "../../configuration/applicationRoutes";
import { getRoute } from "../../MainRouting";
import { ContentPane } from "../ContentPane";
import { PageRootContainer } from "../PageRootContainer";
import { CourseOverviewSubpage } from "./courseOverview/CourseOverviewSubpage";
import { CourseRatingSubpage } from "./courseRating/CourseRatingSubpage";
import { PrequizSubpage } from "./prequiz/PrequizSubpage";
import { PretestResultsSubpage } from "./pretest/PretestResultsSubpage";
import { PretestSubpage } from "./pretest/PretestSubpage";
import { WatchSubpage } from "./watch/WatchSubpage";

export const PlayerPage = () => {

    return (
        <PageRootContainer
            style={{
                "--playerWidth": "min(min(100vw, 180vh), 1700px)",
                background: "var(--gradientBlueBackground)"
            } as any}>

            <ContentPane
                width="var(--playerWidth)"
                margin="auto"
                showLogo>

                <Switch>
                    {getRoute(applicationRoutes.playerRoute.prequizRoute, <PrequizSubpage />)}
                    {getRoute(applicationRoutes.playerRoute.pretestRoute, <PretestSubpage />)}
                    {getRoute(applicationRoutes.playerRoute.pretestResultsRoute, <PretestResultsSubpage />)}
                    {getRoute(applicationRoutes.playerRoute.watchRoute, <WatchSubpage />)}
                    {getRoute(applicationRoutes.playerRoute.courseRatingRoute, <CourseRatingSubpage />)}
                    {getRoute(applicationRoutes.playerRoute.courseOverviewRoute, <CourseOverviewSubpage />)}
                </Switch>
            </ContentPane>
        </PageRootContainer >
    )
};
