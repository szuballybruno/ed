import { Flex, Grid } from "@chakra-ui/react"
import { applicationRoutes } from "../../../configuration/applicationRoutes"
import { getAssetUrl, iterate } from "../../../static/frontendHelpers"
import { EpistoGrid } from "../../controls/EpistoGrid"
import { FlexFloat } from "../../controls/FlexFloat"
import { NoProgressChartYet } from "../../home/NoProgressChartYet"
import { UserProgressChart } from "../../home/UserProgressChart"
import StatisticsCard from "../../statisticsCard/StatisticsCard"
import { AdminSubpageHeader } from "../AdminSubpageHeader"
import { MostActiveDaysChart } from "../MostActiveDaysChart"
import { MostWatchedCoursesChart } from "../MostWatchedCoursesChart"
import { UserMostActiveTimeRangeChart } from "../UserMostActiveTimeRangeChart"
import { UserActivityDistributionChart } from "../users/UserActivityDistributionChart"



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
        direction="column"
        isInverseBackground
        tabMenuItems={[{
            route: applicationRoutes.administrationRoute.homeRoute.overviewRoute.route,
            title: applicationRoutes.administrationRoute.homeRoute.overviewRoute.title
        }, {
            route: applicationRoutes.administrationRoute.homeRoute.detailsRoute.route,
            title: applicationRoutes.administrationRoute.homeRoute.detailsRoute.title
        }]}>

        <Flex mt="10px">

            <Grid
                className="whall"
                gap="10px"
                gridTemplateColumns="repeat(auto-fit, minmax(250px, 1fr))"
                gridAutoRows="200px"
                gridAutoFlow="column dense">

                {/* total completed video count */}
                <StatisticsCard
                    additionalInfo={{
                        change: "up",
                        value: "32",
                        suffix: "%"
                    }}
                    title={"Megválaszolt tudást vizsgáló kérdések száma"}
                    value={"39"}
                    suffix={"db"}
                    iconPath={getAssetUrl("images/teacherdashboardstatistic1.png")}
                    isOpenByDefault={false} />

                {/* total playback time */}
                <StatisticsCard
                    title={"Helyes válaszok aránya"}
                    value={"27"}
                    suffix={"%"}
                    iconPath={getAssetUrl("images/teacherdashboardstatistic2.png")}
                    isOpenByDefault={false} />

                {/* total given answer count  */}
                <StatisticsCard
                    additionalInfo={{
                        change: "down",
                        value: "20",
                        suffix: "%"
                    }}
                    title={"Reakcióidő"}
                    value={"Átlagos"}
                    suffix={""}
                    iconPath={getAssetUrl("images/teacherdashboardstatistic3.png")}
                    isOpenByDefault={false} />

                {/* correct answer rate  */}
                <StatisticsCard
                    title={"Átlagos napi megtekintett videók"}
                    value={"6.5"}
                    suffix={"db/nap"}
                    iconPath={getAssetUrl("images/teacherdashboardstatistic4.png")}
                    isOpenByDefault={false} />

                <Flex
                    className="roundBorders"
                    align="center"
                    justify="center"
                    background="var(--transparentWhite70)"
                    p="10px"
                    gridColumn="auto / span 2"
                    gridRow="auto / span 2">

                    <MostActiveDaysChart />
                </Flex>
            </Grid>
        </Flex>
        <Flex mt="10px">
            <Grid
                className="whall"
                gap="10px"
                gridTemplateColumns="repeat(auto-fit, minmax(250px, 1fr))"
                gridAutoRows="200px"
                gridAutoFlow="column dense">
                <Flex
                    className="roundBorders"
                    align="center"
                    justify="center"
                    background="var(--transparentWhite70)"
                    p="10px"
                    gridColumn="auto / span 2"
                    gridRow="auto / span 2">

                    <UserMostActiveTimeRangeChart />

                </Flex>

                {/* total completed video count */}
                <StatisticsCard
                    title={"Megválaszolt tudást vizsgáló kérdések száma"}
                    value={"39"}
                    suffix={"db"}
                    iconPath={getAssetUrl("images/teacherdashboardstatistic5.png")}
                    isOpenByDefault={false} />

                {/* total playback time */}
                <StatisticsCard
                    title={"Helyes válaszok aránya"}
                    value={"27"}
                    suffix={"%"}
                    iconPath={getAssetUrl("images/teacherdashboardstatistic6.png")}
                    isOpenByDefault={false} />

                {/* total given answer count  */}
                <StatisticsCard
                    title={"Reakcióidő"}
                    value={"Átlagos"}
                    suffix={""}
                    iconPath={getAssetUrl("images/teacherdashboardstatistic7.png")}
                    isOpenByDefault={false} />

                {/* correct answer rate  */}
                <StatisticsCard
                    title={"Átlagos napi megtekintett videók"}
                    value={"6.5"}
                    suffix={"db/nap"}
                    iconPath={getAssetUrl("images/teacherdashboardstatistic8.png")}
                    isOpenByDefault={false} />
            </Grid>
        </Flex>
        <Flex mt="10px">
            <Grid
                className="whall"
                gap="10px"
                gridTemplateColumns="repeat(auto-fit, minmax(250px, 1fr))"
                gridAutoRows="200px"
                gridAutoFlow="column dense">

                <Flex
                    className="roundBorders"
                    align="center"
                    justify="center"
                    background="var(--transparentWhite70)"
                    p="10px"
                    gridColumn="auto / span 2"
                    gridRow="auto / span 2">

                    <UserActivityDistributionChart title="Felhasználók aktivitása" />

                </Flex>

                <Flex
                    className="roundBorders"
                    align="center"
                    justify="center"
                    background="var(--transparentWhite70)"
                    p="10px"
                    gridColumn="auto / span 2"
                    gridRow="auto / span 2">

                    <MostWatchedCoursesChart title="Legnépszerűbb kurzusok" />

                </Flex>
            </Grid>
        </Flex>

    </AdminSubpageHeader >
}