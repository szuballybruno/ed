import { Flex } from "@chakra-ui/react";
import { LinearProgress } from "@mui/material";
import { getAssetUrl } from "../../static/frontendHelpers";
import { EpistoFont } from "../controls/EpistoFont";

export const RecommendedItemQuota = (props: {
    label: string,
    maxItemCount: number,
    recommendedItemCount: number
}) => {

    const { label, maxItemCount, recommendedItemCount } = props;

    return (
        <Flex
            width="80%"
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

                    {recommendedItemCount}/{maxItemCount}
                </EpistoFont>

                <EpistoFont
                    fontSize="fontSmall">
                    videó
                </EpistoFont>
            </Flex>

            <LinearProgress
                value={recommendedItemCount / maxItemCount * 100}
                variant="determinate"
                style={{
                    width: "80%",
                    height: "5px"
                }} />
        </Flex>
    )
}