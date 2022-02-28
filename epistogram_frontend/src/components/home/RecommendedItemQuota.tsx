import { Flex } from "@chakra-ui/react";
import { LinearProgress } from "@mui/material";
import { getAssetUrl } from "../../static/frontendHelpers";
import { EpistoFont } from "../controls/EpistoFont";

export const RecommendedItemQuota = (props: {
    completedCount: number,
    recommendedItemCount: number,
    isDaily?: boolean
}) => {

    const { isDaily, completedCount, recommendedItemCount } = props;

    const label = isDaily
        ? "Napi ajánlott videók"
        : "Heti ajánlott videók";

    return (
        <Flex
            direction="column">

            <EpistoFont fontSize="fontSmall">
                {label}
            </EpistoFont>

            <Flex
                align="center">

                <img
                    src={getAssetUrl("/images/videos3D.png")}
                    alt=""
                    className="square25"
                    style={{
                        marginRight: 5
                    }} />

                <EpistoFont
                    fontSize={"fontLargePlus"}
                    style={{
                        fontWeight: 500,
                        marginRight: 2
                    }}>

                    {completedCount}/{recommendedItemCount}
                </EpistoFont>

                <EpistoFont
                    fontSize="fontSmall">
                    videó
                </EpistoFont>
            </Flex>

            <LinearProgress
                value={Math.min(100, completedCount / recommendedItemCount * 100)}
                variant="determinate"
                style={{
                    width: "80%",
                    height: "5px"
                }} />
        </Flex>
    )
}