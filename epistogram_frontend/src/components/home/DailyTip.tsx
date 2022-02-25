import { Flex, FlexProps } from "@chakra-ui/layout"
import { ArrowBack, ArrowForward, FiberManualRecord } from "@mui/icons-material"
import { LinearProgress } from "@mui/material"
import { useDailyTip } from "../../services/api/dailyTipApiService"
import { useRecommendedItemQuota } from "../../services/api/userProgressApiService"
import { getAssetUrl } from "../../static/frontendHelpers"
import { EpistoFont } from "../controls/EpistoFont"

const RecommendedItemQuota = (props: {
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

export const DailyTip = (props: {} & FlexProps) => {

    const { ...css } = props;
    const { dailyTipData } = useDailyTip();

    const activeCourseIds = [4, 4, 4];

    const currentCourse = {
        thumbnailUrl: getAssetUrl("/courseCoverImages/4.png"),
        id: 4
    }

    const { recommendedItemQuota } = useRecommendedItemQuota();

    return <Flex
        direction="column"
        height="100%"
        justify="center"
        {...css}>

        {/* recommended item quota */}
        <Flex align="center" flexWrap="wrap">

            {/* quota */}
            <Flex
                flex="1"
                align="center"
                direction="column"
                minWidth="250px"
                justify="space-evenly">

                {/* daily recommended videos count */}
                <RecommendedItemQuota
                    label="Napi ajánlott videók"
                    maxItemCount={recommendedItemQuota?.allItemsCount ?? 0}
                    recommendedItemCount={recommendedItemQuota?.recommendedItemsPerDay ?? 0} />

                {/* weekly recommended videos count */}
                <RecommendedItemQuota
                    label="Heti ajánlott videók"
                    maxItemCount={recommendedItemQuota?.allItemsCount ?? 0}
                    recommendedItemCount={recommendedItemQuota?.recommendedItemsPerWeek ?? 0} />
            </Flex>

            {/* active course thumbnail */}
            <Flex
                minWidth="250px"
                flex="1"
                padding="20px">
                <img
                    src={currentCourse.thumbnailUrl}
                    alt=""
                    className="roundBorders" />
            </Flex>
        </Flex>

        {/* navigation buttons */}
        <Flex
            h="30px"
            align="center"
            justify="center">

            <ArrowBack />

            {activeCourseIds
                .map(x => <FiberManualRecord style={{
                    width: "10px",
                    height: "8px"
                }} />)}

            <ArrowForward />
        </Flex>

        {/* text daily tip */}
        <Flex
            direction="column"
            align="center"
            justify="flex-start"
            flex="1"
            p="10px"
            fontSize="13px">

            <EpistoFont>
                {dailyTipData?.description}
            </EpistoFont>
        </Flex>
    </Flex >
}
