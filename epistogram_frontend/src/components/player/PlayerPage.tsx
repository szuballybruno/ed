import { Switch } from "react-router";
import { applicationRoutes } from "../../configuration/applicationRoutes";
import { getRoute } from "../../MainRouting";
import { ContentPane } from "../ContentPane";
import { PageRootContainer } from "../PageRootContainer";
import { PreplayerSubpage } from "../preplayer/PreplayerSubpage2";
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
                    {getRoute(applicationRoutes.playerRoute.watchRoute, <PlayerSubpage />)}
                    {getRoute(applicationRoutes.playerRoute.gettingReadyRoute, <PreplayerSubpage />)}
                    {getRoute(applicationRoutes.playerRoute.finishedRoute, <PreplayerSubpage />)}
                </Switch>
            </ContentPane>
        </PageRootContainer >
    )
};
