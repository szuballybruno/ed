import { Flex, FlexProps } from "@chakra-ui/react";
import { ArrowBack, ArrowForward, ArrowRight, FiberManualRecord } from "@mui/icons-material";
import { ReactNode } from "react";
import { applicationRoutes } from "../../../configuration/applicationRoutes";
import { useActiveCourses } from "../../../services/api/userProgressApiService";
import { getAssetUrl, usePaging } from "../../../static/frontendHelpers";
import { EpistoButton } from "../../controls/EpistoButton";
import { EpistoFont } from "../../controls/EpistoFont";
import { EpistoGrid } from "../../controls/EpistoGrid";
import StatisticsCard from "../../statisticsCard/StatisticsCard";
import { FlexListItem } from "../../universal/FlexListItem";
import { AdminSubpageHeader } from "../AdminSubpageHeader";

export const AdminHomeOverview = () => {
    const AdminSectionWithButton = (props: {
        title: string,
        children?: ReactNode,
        headerContent?: ReactNode
    } & FlexProps) => {
        const { title, children, headerContent, ...css } = props;
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
        </Flex>;
    };

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
        <Flex flex="3"
            direction="column">

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

                    <StatisticsCard
                        additionalFunction={() => { throw new Error("Not implemented!"); }}
                        minWidth="180px"
                        p="10px 0"
                        iconPath={getAssetUrl("/images/teacherdashboard1.png")}
                        title="Átlagon felül teljesítenek"
                        value="19"
                        suffix="-en" />

                    <StatisticsCard
                        additionalFunction={() => { throw new Error("Not implemented!"); }}
                        minWidth="180px"
                        p="10px 0"
                        iconPath={getAssetUrl("/images/teacherdashboard2.png")}
                        title="Átlagosan teljesítenek"
                        value="89"
                        suffix="-en" />

                    <StatisticsCard
                        additionalFunction={() => { throw new Error("Not implemented!"); }}
                        minWidth="180px"
                        p="10px 0"
                        iconPath={getAssetUrl("/images/teacherdashboard3.png")}
                        title="Áttekintés javasolt"
                        value="9"
                        suffix="esetben" />
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




                <FlexListItem
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
                                Microsoft Excel Alapok
                            </EpistoFont>
                            <EpistoFont>
                                Nincs esetleg valamilyen billentyűkombináció arra, hogy gyorsan lehessen oszlopokat elrejteni?
                            </EpistoFont>
                        </Flex>
                    }
                    endContent={
                        <EpistoButton>
                            Ugrás
                            <ArrowRight />
                        </EpistoButton>
                    }>
                </FlexListItem>





                <FlexListItem
                    thumbnailContent={
                        <Flex
                            align="center"
                            justify="center"
                            className="square60 circle"
                            background="var(--mildOrange)">

                            10
                        </Flex>}
                    midContent={
                        <Flex direction="column">
                            <EpistoFont style={{
                                fontWeight: "bold"
                            }}>
                                Microsoft PowerPoint Alapok
                            </EpistoFont>
                            <EpistoFont>
                                Miután diavetítő módba lépek, a képernyő elsötétül. Ez mitől lehet?
                            </EpistoFont>
                        </Flex>
                    }
                    endContent={
                        <EpistoButton>
                            Ugrás
                            <ArrowRight />
                        </EpistoButton>
                    }>

                </FlexListItem>




                <FlexListItem
                    thumbnailContent={
                        <Flex
                            align="center"
                            justify="center"
                            className="square60 circle"
                            background="yellow">

                            8
                        </Flex>}
                    midContent={
                        <Flex direction="column">
                            <EpistoFont style={{
                                fontWeight: "bold"
                            }}>
                                Microsoft Word Alapok
                            </EpistoFont>
                            <EpistoFont>
                                A formátummásolás címeknél egyszerűen nem akar működni, de csak ott. Mi lehet a probléma?
                            </EpistoFont>
                        </Flex>
                    }
                    endContent={
                        <EpistoButton>
                            Ugrás
                            <ArrowRight />
                        </EpistoButton>
                    }></FlexListItem>

                <FlexListItem
                    thumbnailContent={
                        <Flex
                            align="center"
                            justify="center"
                            className="square60 circle"
                            background="lightgreen">

                            3
                        </Flex>}
                    midContent={
                        <Flex direction="column">
                            <EpistoFont style={{
                                fontWeight: "bold"
                            }}>
                                OBS Alapok
                            </EpistoFont>
                            <EpistoFont>
                                MAC-et használok, és fekete kijelzőt látok csak, a hangot szépen felveszi, de kép nincs. Mit lehet ilyenkor csinálni?
                            </EpistoFont>
                        </Flex>
                    }
                    endContent={
                        <EpistoButton>
                            Ugrás
                            <ArrowRight />
                        </EpistoButton>
                    }></FlexListItem>

            </AdminSectionWithButton>
        </Flex>
        <Flex flex="2"
            h="fit-content">
            <AdminSectionWithButton
                m="10px 0 0 10px"
                flex="1"
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

                    <Flex flex="1"
                        direction="column"
                        p="20px">
                        <EpistoFont>
                            Microsoft Excel Alapok
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
                                    key={index}
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

                    <StatisticsCard
                        minWidth="180px"
                        p="10px 0"
                        iconPath={getAssetUrl("/images/teacherdashboard4.png")}
                        title="Felhasználó jelenleg"
                        value="43"
                        suffix="aktív" />

                    <StatisticsCard
                        minWidth="180px"
                        p="10px 0"
                        iconPath={getAssetUrl("/images/teacherdashboard5.png")}
                        title="Végezte el a kurzust"
                        value="32"
                        suffix="tanuló" />

                    <StatisticsCard
                        minWidth="180px"
                        p="10px 0"
                        iconPath={getAssetUrl("/images/teacherdashboard6.png")}
                        title="Hagyta félbe a tanfolyamot"
                        value="13"
                        suffix="tanuló" />

                    <StatisticsCard
                        minWidth="180px"
                        p="10px 0"
                        iconPath={getAssetUrl("/images/teacherdashboard7.png")}
                        title="Átlagos teljesítmény"
                        value="79"
                        suffix="%" />

                    <StatisticsCard
                        minWidth="180px"
                        p="10px 0"
                        iconPath={getAssetUrl("/images/teacherdashboard8.png")}
                        title="Nehéznek megjelölve"
                        value="19"
                        suffix="videó" />

                    <StatisticsCard
                        minWidth="180px"
                        p="10px 0"
                        iconPath={getAssetUrl("/images/teacherdashboard9.png")}
                        title="Vár válaszokra a tanártól"
                        value="8"
                        suffix="kérdés" />
                </EpistoGrid>
            </AdminSectionWithButton>
        </Flex>
    </AdminSubpageHeader>;
};