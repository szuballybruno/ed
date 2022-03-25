import { Flex, Grid } from "@chakra-ui/react"
import { applicationRoutes } from "../../../configuration/applicationRoutes"
import { getAssetUrl, iterate } from "../../../static/frontendHelpers"
import { EpistoGrid } from "../../controls/EpistoGrid"
import { FlexFloat } from "../../controls/FlexFloat"
import { NoProgressChartYet } from "../../home/NoProgressChartYet"
import { UserProgressChart } from "../../home/UserProgressChart"
import StatisticsCard from "../../statisticsCard/StatisticsCard"
import { AdminSubpageHeader } from "../AdminSubpageHeader"

export const AdminHomeDetails = () => {

    const userProgressData = {
        startDate: new Date("2022. 04. 10."),
        estimatedCompletionDate: new Date("2022. 05. 10."),
        estimatedLengthInDays: 30,
        days: [
            {
                completionDate: new Date("2022. 05. 10."),
                completedItemCount: 4,
                completedPercentage: 5,
                offsetDaysFromStart: 0,
                completedPercentageSum: 5
            },
            {
                completionDate: new Date("2022. 05. 12."),
                completedItemCount: 4,
                completedPercentage: 8,
                offsetDaysFromStart: 0,
                completedPercentageSum: 13
            },
            {
                completionDate: new Date("2022. 05. 12."),
                completedItemCount: 4,
                completedPercentage: 2,
                offsetDaysFromStart: 0,
                completedPercentageSum: 15
            },
            {
                completionDate: new Date("2022. 05. 12."),
                completedItemCount: 4,
                completedPercentage: 2,
                offsetDaysFromStart: 0,
                completedPercentageSum: 17
            },
            {
                completionDate: new Date("2022. 05. 12."),
                completedItemCount: 4,
                completedPercentage: 8,
                offsetDaysFromStart: 0,
                completedPercentageSum: 25
            },
            {
                completionDate: new Date("2022. 05. 12."),
                completedItemCount: 4,
                completedPercentage: 8,
                offsetDaysFromStart: 0,
                completedPercentageSum: 33
            }
        ]
    }

    return <AdminSubpageHeader
        isInverseBackground
        tabMenuItems={[{
            route: applicationRoutes.administrationRoute.homeRoute.overviewRoute.route,
            title: applicationRoutes.administrationRoute.homeRoute.overviewRoute.title
        }, {
            route: applicationRoutes.administrationRoute.homeRoute.detailsRoute.route,
            title: applicationRoutes.administrationRoute.homeRoute.detailsRoute.title
        }]}>

        <Flex flex="1" mt="10px">

            <Grid
                className="whall"
                gap="10px"
                gridTemplateColumns="repeat(auto-fill, minmax(250px, 1fr))"
                gridAutoRows="200px"
                gridAutoFlow="row dense">

                {/* total completed video count */}
                <StatisticsCard
                    title={"Megválaszolt tudást vizsgáló kérdések száma"}
                    value={"39"}
                    suffix={"db"}
                    iconPath={getAssetUrl("images/learningreport03.png")}
                    isOpenByDefault={false} />

                {/* total playback time */}
                <StatisticsCard
                    title={"Helyes válaszok aránya"}
                    value={"27"}
                    suffix={"%"}
                    iconPath={getAssetUrl("images/learningreport04.png")}
                    isOpenByDefault={false} />

                {/* total given answer count  */}
                <StatisticsCard
                    title={"Reakcióidő"}
                    value={"Átlagos"}
                    suffix={""}
                    iconPath={getAssetUrl("images/learningreport05.png")}
                    isOpenByDefault={false} />

                {/* correct answer rate  */}
                <StatisticsCard
                    title={"Átlagos napi megtekintett videók"}
                    value={"6.5"}
                    suffix={"db/nap"}
                    iconPath={getAssetUrl("images/learningreport06.png")}
                    isOpenByDefault={false} />
                {iterate(4, () => <FlexFloat
                    background="var(--transparentWhite70)"
                    //boxShadow="inset -1px -1px 5px rgba(0,0,0,0.15)"
                    direction="column"
                    p="10px"
                    minWidth={250}
                    style={{
                        gridColumn: `span 2`,
                        gridRow: `span 2`
                    }}>

                    {userProgressData && userProgressData.days.length > 0
                        ? <UserProgressChart userProgress={userProgressData} />
                        : <NoProgressChartYet />}

                </FlexFloat>)}
                {/* total completed video count */}
                <StatisticsCard
                    title={"Megválaszolt tudást vizsgáló kérdések száma"}
                    value={"39"}
                    suffix={"db"}
                    iconPath={getAssetUrl("images/learningreport03.png")}
                    isOpenByDefault={false} />

                {/* total playback time */}
                <StatisticsCard
                    title={"Helyes válaszok aránya"}
                    value={"27"}
                    suffix={"%"}
                    iconPath={getAssetUrl("images/learningreport04.png")}
                    isOpenByDefault={false} />

                {/* total given answer count  */}
                <StatisticsCard
                    title={"Reakcióidő"}
                    value={"Átlagos"}
                    suffix={""}
                    iconPath={getAssetUrl("images/learningreport05.png")}
                    isOpenByDefault={false} />

                {/* correct answer rate  */}
                <StatisticsCard
                    title={"Átlagos napi megtekintett videók"}
                    value={"6.5"}
                    suffix={"db/nap"}
                    iconPath={getAssetUrl("images/learningreport06.png")}
                    isOpenByDefault={false} />




            </Grid>

        </Flex>


    </AdminSubpageHeader>
}