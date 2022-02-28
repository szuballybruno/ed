import { Flex, FlexProps } from "@chakra-ui/layout"
import { ArrowBack, ArrowForward, FiberManualRecord } from "@mui/icons-material"
import { useDailyTip } from "../../services/api/dailyTipApiService"
import { useRecommendedItemQuota } from "../../services/api/userProgressApiService"
import { UserActiveCourseDTO } from "../../shared/dtos/UserActiveCourseDTO"
import { PagingType } from "../../static/frontendHelpers"
import { EpistoButton } from "../controls/EpistoButton"
import { EpistoFont } from "../controls/EpistoFont"
import { RecommendedItemQuota } from "./RecommendedItemQuota"

export const RecommendedQuota = (props: { activeCoursesPaging: PagingType<UserActiveCourseDTO> } & FlexProps) => {

    const { activeCoursesPaging, ...css } = props;
    const { dailyTipData } = useDailyTip();

    const currentCourse = activeCoursesPaging.currentItem;
    const { recommendedItemQuota } = useRecommendedItemQuota(currentCourse?.courseId ?? 0, !!currentCourse);

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
                    maxItemCount={recommendedItemQuota?.allItemsCount ?? 0}
                    recommendedItemCount={recommendedItemQuota?.recommendedItemsPerDay ?? 0}
                    isDaily />

                {/* weekly recommended videos count */}
                <RecommendedItemQuota
                    maxItemCount={recommendedItemQuota?.allItemsCount ?? 0}
                    recommendedItemCount={recommendedItemQuota?.recommendedItemsPerWeek ?? 0} />
            </Flex>

            {/* active course thumbnail */}
            <Flex
                minWidth="250px"
                flex="1"
                padding="20px">
                <img
                    src={currentCourse?.coverFilePath ?? ""}
                    alt=""
                    className="roundBorders" />
            </Flex>
        </Flex>

        {/* navigation buttons */}
        <Flex
            h="30px"
            align="center"
            justify="center">

            <EpistoButton onClick={() => activeCoursesPaging.previous()}>
                <ArrowBack />
            </EpistoButton>

            {activeCoursesPaging
                .items
                .map((x, index) => <FiberManualRecord
                    style={{
                        width: "10px",
                        height: "8px",
                        color: index === activeCoursesPaging.currentIndex ? "black" : "gray"
                    }} />)}

            <EpistoButton onClick={() => activeCoursesPaging.next()}>
                <ArrowForward />
            </EpistoButton>

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
