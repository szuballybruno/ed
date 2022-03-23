import { Flex, FlexProps } from "@chakra-ui/react"
import { ArrowBack, ArrowForward, ArrowRight, FiberManualRecord } from "@mui/icons-material"
import { ReactNode } from "react"
import { applicationRoutes } from "../../../configuration/applicationRoutes"
import { useActiveCourses } from "../../../services/api/userProgressApiService"
import { iterate, usePaging } from "../../../static/frontendHelpers"
import { EpistoButton } from "../../controls/EpistoButton"
import { EpistoFont } from "../../controls/EpistoFont"
import { EpistoGrid } from "../../controls/EpistoGrid"
import StatisticsCard from "../../statisticsCard/StatisticsCard"
import { DashboardSection } from "../../universal/DashboardSection"
import { FlexListItem } from "../../universal/FlexListItem"
import { AdminSubpageHeader } from "../AdminSubpageHeader"

export const AdminHomeOverview = () => {
    const AdminSectionWithButton = (props: {
        title: string,
        children?: ReactNode,
        headerContent?: ReactNode
    } & FlexProps) => {
        const { title, children, headerContent, ...css } = props
        return <Flex
            direction="column"
            className="roundBorders"
            background="var(--transparentWhite70)"
            p="20px"
            {...css}>

            <Flex
                h="40px"
                w="100%"
                align="center"
                justify="space-between">

                <EpistoFont>
                    {title}
                </EpistoFont>

                {headerContent}
            </Flex>

            {children}
        </Flex>
    }

    const { activeCourses } = useActiveCourses();
    const activeCoursesPaging = usePaging(activeCourses);
    const currentCourse = activeCoursesPaging.currentItem;

    return <AdminSubpageHeader
        isInverseBackground
        tabMenuItems={[{
            route: applicationRoutes.administrationRoute.homeRoute.overviewRoute.route,
            title: applicationRoutes.administrationRoute.homeRoute.overviewRoute.title
        }, {
            route: applicationRoutes.administrationRoute.homeRoute.detailsRoute.route,
            title: applicationRoutes.administrationRoute.homeRoute.detailsRoute.title
        }]}>
        <Flex flex="3" direction="column">

            <AdminSectionWithButton
                title="Top beérkező kérdések"
                mt="10px"
                headerContent={
                    <EpistoButton
                        variant="colored">
                        Összes hallgató
                    </EpistoButton>}>

                <EpistoGrid
                    auto="fill"
                    mt="20px"
                    h="130px"
                    minColumnWidth="50px"
                    gap="10"
                    gridTemplateColumns="repeat(3, minmax(0, 1fr))">

                    <StatisticsCard minWidth="180px" p="20px" title="Átlagon felül teljesítenek" value="19" suffix="-en" />
                    <StatisticsCard minWidth="180px" p="20px" title="Átlagosan teljesítenek" value="89" suffix="-en" />
                    <StatisticsCard minWidth="180px" p="20px" title="Áttekintés javasolt" value="9" suffix="esetben" />
                </EpistoGrid>

            </AdminSectionWithButton>

            <AdminSectionWithButton
                title="Top beérkező kérdések"
                mt="10px"
                headerContent={
                    <EpistoButton
                        variant="colored">
                        Összes kérdés
                    </EpistoButton>}>

                {iterate(4, () => <FlexListItem
                    thumbnailContent={
                        <Flex
                            align="center"
                            justify="center"
                            className="square60 circle"
                            background="red">

                            18
                        </Flex>}
                    midContent={
                        <Flex direction="column">
                            <EpistoFont style={{
                                fontWeight: "bold"
                            }}>
                                Kurzus címe ami akár nagyon hosszú is lehet
                            </EpistoFont>
                            <EpistoFont>
                                B... B... B... B... B... B... Béla
                            </EpistoFont>
                        </Flex>
                    }
                    endContent={
                        <EpistoButton>
                            Ugrás
                            <ArrowRight />
                        </EpistoButton>
                    }>

                </FlexListItem>)}
            </AdminSectionWithButton>
        </Flex>
        <Flex flex="2" h="fit-content">
            <AdminSectionWithButton
                m="10px 0 0 10px"
                title="Kurzusok teljesítménye"
                headerContent={
                    <EpistoButton
                        variant="colored">
                        Összes kurzus
                    </EpistoButton>}>

                {/* active course thumbnail */}
                <Flex
                    align="center"
                    h="200px"
                    padding="20px">

                    <Flex flex="1">
                        <img
                            src={currentCourse?.coverFilePath ?? ""}
                            alt=""
                            style={{
                                objectFit: "contain"
                            }}
                            className="roundBorders" />
                    </Flex>

                    <Flex flex="1" direction="column" p="20px">
                        <EpistoFont>
                            Kurzus Bélája ami név lehet nagyon
                        </EpistoFont>
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

                    </Flex>

                </Flex>



                <EpistoGrid
                    auto="fill"
                    mt="20px"
                    minColumnWidth="50px"
                    gap="10"
                    gridTemplateColumns="repeat(2, minmax(0, 1fr))">

                    <StatisticsCard minWidth="180px" p="20px" title="Átlagon felül teljesítenek" value="19" suffix="-en" />
                    <StatisticsCard minWidth="180px" p="20px" title="Átlagosan teljesítenek" value="89" suffix="-en" />
                    <StatisticsCard minWidth="180px" p="20px" title="Áttekintés javasolt" value="9" suffix="esetben" />
                    <StatisticsCard minWidth="180px" p="20px" title="Átlagon felül teljesítenek" value="19" suffix="-en" />
                    <StatisticsCard minWidth="180px" p="20px" title="Átlagosan teljesítenek" value="89" suffix="-en" />
                    <StatisticsCard minWidth="180px" p="20px" title="Áttekintés javasolt" value="9" suffix="esetben" />
                </EpistoGrid>
            </AdminSectionWithButton>
        </Flex>
    </AdminSubpageHeader>
}