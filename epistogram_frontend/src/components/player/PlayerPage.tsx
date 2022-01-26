import { Switch } from "react-router";
import { applicationRoutes } from "../../configuration/applicationRoutes";
import { getRoute } from "../../MainRouting";
import { ContentPane } from "../ContentPane";
import { PageRootContainer } from "../PageRootContainer";
import { PrequizSubpage } from "../prequiz/PrequizSubpage";
import { PlayerSubpage } from "./PlayerSubpage";

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
                    {getRoute(applicationRoutes.playerRoute.startRoute, <PrequizSubpage />)}
                    {getRoute(applicationRoutes.playerRoute.watchRoute, <PlayerSubpage />)}
                    {getRoute(applicationRoutes.playerRoute.finishedRoute, <PrequizSubpage />)}
                </Switch>
            </ContentPane>
        </PageRootContainer >
    )
};
