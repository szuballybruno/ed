import { useIntParam } from "../../static/frontendHelpers";
import { ContentPane } from "../ContentPane";
import { PageRootContainer } from "../PageRootContainer";
import { PreplayerSubpage } from "../preplayer/PreplayerSubpage2";
import { PlayerSubpage } from "./PlayerSubpage";

export const PlayerPage = () => {

    const isCourse = !!useIntParam("courseId");
    
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

                {isCourse
                    ? <PreplayerSubpage></PreplayerSubpage>
                    : <PlayerSubpage></PlayerSubpage>}
                
            </ContentPane>
        </PageRootContainer >
    )
};
