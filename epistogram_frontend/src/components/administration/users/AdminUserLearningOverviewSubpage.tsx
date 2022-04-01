import { Box, Flex, GridItem, Image, Text, Tooltip } from "@chakra-ui/react";
import { Add, List } from "@mui/icons-material";
import { LinearProgress } from "@mui/material";
import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { applicationRoutes } from "../../../configuration/applicationRoutes";
import { ButtonType } from "../../../models/types";
import { useEditUserData } from "../../../services/api/userApiService";
import { useActiveCourses, useUserProgressData } from "../../../services/api/userProgressApiService";
import { useUserStats } from "../../../services/api/userStatsApiService";
import { useNavigation } from "../../../services/core/navigatior";
import { AdminPageUserDTO } from "../../../shared/dtos/admin/AdminPageUserDTO";
import { getAssetUrl, usePaging } from "../../../static/frontendHelpers";
import { EpistoButton } from "../../controls/EpistoButton";
import { EpistoFont } from "../../controls/EpistoFont";
import { EpistoGrid } from "../../controls/EpistoGrid";
import { FlexFloat } from "../../controls/FlexFloat";
import { NoProgressChartYet } from "../../home/NoProgressChartYet";
import { UserProgressChart } from "../../home/UserProgressChart";
import { SmallStat } from "../../learningInsights/LearningCourseStatsTile";
import StatisticsCard from "../../statisticsCard/StatisticsCard";
import { AdminBreadcrumbsHeader } from "../AdminBreadcrumbsHeader";
import { AdminSubpageHeader } from "../AdminSubpageHeader";
import { EditSection } from "../courses/EditSection";
import { AdminUserList } from "./AdminUserList";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { UserActivityDistributionChart } from "./UserActivityDistributionChart";

const DummyLearningCourseStatsModified = (props: {
    title: string,
    thumbnailImageUrl: string
}) => <GridItem
    className="roundBorders"
    background="var(--transparentWhite70)">

        <FlexFloat
            className="whall"
            direction="column"
            borderRadius="10px"
            position="relative"
            overflow="hidden"
            shadow={"0 0 10px 1px #CCC"}
            background="var(--transparentWhite70)"
            p="5"
            justifyContent="space-between">

            {/* cover image box */}
            <Box
                flex="1"
                position="relative"
                minHeight={150}
                maxHeight={150}>

                {/* cover image */}
                <img
                    className="whall"
                    style={{
                        objectFit: "cover",
                        borderRadius: 10,
                        position: "absolute"
                    }}
                    src={props.thumbnailImageUrl}
                    alt="" />
            </Box>

            {/* content */}
            <Flex p="10px" direction="column">

                {/* category  */}
                <Text
                    as="text"
                    color="grey">

                    Irodai alkalmazások
                </Text>

                {/* title */}
                <Text
                    as="h6"
                    fontWeight={"bold"}
                    fontSize="large">

                    {props.title}
                </Text>

                {/* small stats */}
                <Flex mt={7} justify="space-evenly">

                    {/* spent time  */}
                    <SmallStat
                        iconUrl={getAssetUrl("images/time3D.png")}
                        text={"2m"} />

                    {/* videos  */}
                    <SmallStat
                        iconUrl={getAssetUrl("images/videos3D.png")}
                        text={"18/1"} />

                    {/* video questions */}
                    <SmallStat
                        iconUrl={getAssetUrl("images/rightanswerontile3D.png")}
                        text={`2/0`} />
                </Flex>

                {/* course progress bar chart */}
                <Flex
                    direction={"row"}
                    alignItems={"center"}
                    mt={7}
                    width="100%"
                    height="10px">

                    <LinearProgress
                        variant="determinate"
                        style={{
                            width: "100%",
                        }}
                        value={70} />

                    <Flex m="0 5px 0 20px">
                        {`${70}%`}
                    </Flex>

                </Flex>
            </Flex>

            {/* buttons */}
            <Flex mt="10px">


                {/* start course */}
                <EpistoButton
                    variant="colored"
                    style={{ flex: "1" }}>

                    Részletek
                </EpistoButton>
            </Flex>
        </FlexFloat>
    </GridItem>

const UserStatisticsProgressWithLabel = (props: {
    title: string,
    value: number
}) => {

    return <Flex
        w="100%"
        mt="10px"
        h="30px"
        align="center"
        p="5px">

        <EpistoFont style={{
            minWidth: 100
        }} fontSize={"fontExtraSmall"}>
            {props.title}
        </EpistoFont>

        <LinearProgress
            value={props.value}
            variant="determinate"
            style={{
                width: "80%",
                color: "red",
                margin: "0 10px",
                height: "5px"
            }} />

        <EpistoFont
            style={{
                fontWeight: 600
            }}
            fontSize={"fontSmall"}>

            {props.value}
        </EpistoFont>
    </Flex>
}

export const AdminUserStatisticsSubpage = (props: {
    users: AdminPageUserDTO[]
}) => {

    const { users } = props

    const usersRoute = applicationRoutes.administrationRoute.usersRoute

    const params = useParams<{ userId: string }>();
    const userId = parseInt(params.userId);

    const { navigate } = useNavigation();
    const navigateToAddUser = () => navigate(usersRoute.addRoute.route);
    const navigateToUserCourses = () => navigate(`${usersRoute.route}/${userId}/courses/:courseId/statistics`)
    const location = useLocation()

    const { activeCourses } = useActiveCourses();
    const activeCoursesPaging = usePaging(activeCourses);
    const activeCourseId = activeCoursesPaging?.currentItem?.courseId ?? null

    const { userEditData } = useEditUserData(userId);
    const { userStats } = useUserStats(userId);
    const { userProgressData, userProgressDataError, userProgressDataState } = useUserProgressData(1, true);

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(null);
    const onChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };

    const bulkEditButtons = [
        {
            title: "Hozzáadás",
            icon: <Add
                style={{
                    margin: "0 3px 0 0",
                    padding: "0 0 1px 0"
                }} />,
            action: () => navigateToAddUser()
        }
    ] as ButtonType[]

    return <AdminBreadcrumbsHeader
        viewSwitchChecked={location.pathname === usersRoute.route}
        viewSwitchFunction={() => {
            navigate(usersRoute.route)
        }}
        subRouteLabel={`${userEditData?.lastName} ${userEditData?.firstName}`}>

        <AdminUserList
            users={users}
            navigationFunction={(userId) => {
                navigate(usersRoute.statsRoute.route, { userId: userId })
            }} />

        {/* admin header */}
        <AdminSubpageHeader
            direction="column"
            tabMenuItems={
                [
                    usersRoute.editRoute,
                    usersRoute.statsRoute,
                    usersRoute.courseContentRoute
                ]
                    .concat(
                        userEditData?.isTeacher
                            ? usersRoute.teacherInfoRoute
                            : [])
            }
            headerButtons={bulkEditButtons}>

            {/* learning insights header */}
            <EditSection
                isFirst
                title="Tanulási jelentés"
                rightSideComponent={

                    <Flex
                        justify="center"
                        align="center"
                        my="10px">

                        <Image
                            h="30px"
                            w="30px"
                            mr="5px"
                            src={getAssetUrl("/images/tempomatdatechange.png")}
                        />

                        <EpistoFont fontSize={"fontLarge"} style={{
                            minWidth: 150
                        }}>

                            Vizsgált időszak:
                        </EpistoFont>


                        <Tooltip title={"tiptool"} p="20px">
                            <DatePicker
                                dateFormat="yyyy-MM-dd"
                                calendarStartDay={1}
                                selected={startDate}
                                onChange={onChange}
                                startDate={startDate}
                                endDate={endDate}
                                selectsRange
                            />
                        </Tooltip>



                        {/*  <EpistoFont
                            fontSize={"fontLarge"}
                            style={{
                                marginLeft: "5px",
                                fontWeight: 600
                            }}>

                            2022.03.14.
                        </EpistoFont> */}
                    </Flex>
                }>

                <Flex minH="400px">
                    <Flex
                        direction="column"
                        justify="flex-start"
                        flex="4"
                        p="0 5px 0 0">

                        <Flex
                            background="var(--transparentWhite70)"
                            className="roundBorders mildShadow"
                            align="center"
                            p="10px"
                            maxH="150px"
                            flex="1"
                            position="relative">

                            <Image
                                h={"120px"}
                                w={"120px"}
                                src={getAssetUrl("/images/happyfacechart.png")} />

                            <Flex direction="column" p="10px">
                                <EpistoFont
                                    style={{
                                        fontWeight: 600
                                    }}
                                    fontSize={"fontLargePlus"}>

                                    80/100 Pont
                                </EpistoFont>

                                <EpistoFont
                                    style={{
                                        fontWeight: 600
                                    }}
                                    fontSize={"fontNormal14"}>

                                    Jól teljesített a hónapban
                                </EpistoFont>

                                <EpistoFont
                                    fontSize={"fontNormal14"}>

                                    A tanfolyamokon jól teljesített, és a kitűzött határidőket is többnyire tartani tudta.
                                </EpistoFont>
                            </Flex>
                        </Flex>
                        <Flex w="100%" mt="20px" direction="column">

                            <UserStatisticsProgressWithLabel title="Elköteleződés" value={95} />
                            <UserStatisticsProgressWithLabel title="Teljesítmény" value={67} />
                            <UserStatisticsProgressWithLabel title="Produktivitás" value={81} />
                            <UserStatisticsProgressWithLabel title="Elmélyülés" value={83} />
                            <UserStatisticsProgressWithLabel title="Közösségi aktivitás" value={78} />
                        </Flex>
                    </Flex>
                    <Flex
                        direction="column"
                        flex="5"
                        p="0 0 10px 5px">
                        <Flex h="150px">

                            <StatisticsCard
                                iconPath={getAssetUrl("images/learningreport01.png")}
                                value={"13"}
                                suffix={"óra"}
                                style={{
                                    marginRight: 10
                                }}
                                title={"Aktívan eltöltött idő a platformon"} />
                            <StatisticsCard
                                iconPath={getAssetUrl("images/learningreport02.png")}
                                value={"38"}
                                suffix={"db"}
                                title={"megtekintett videók a hónapban"} />
                        </Flex>
                        <Flex p="10px">
                            A hallgató elköteleződése 4 mérőszám összeségéből áll össze.
                            Vizsgáljuk a belépésének gyakoriságát, az aktivitásának intenzitását, a platformelhagyást, valamint a lemorzsolódást is.
                            Az elköteleződési szint magasan tartása kulcsfontosságú, hiszen a felhasználónak azt kell éreznie, hogy valóban értéket kap a tanulás során, és nem csak kötelező rosszként éli meg a képzési folyamatot.
                            Csökkenő elköteleződés esetén kérdéseket teszünk fel neki, ezt pedig összehasonlítjuk a kurzuselhagyási és értékelési adatokkal, ezáltal pedig felderíthető, melyek azok a kritikus pontok a tananyagban, melyek javításra szorulnak.
                        </Flex>

                    </Flex>
                </Flex>
            </EditSection>

            <EditSection title="Kurzusok a hónapban">
                <EpistoGrid auto="fill" gap="15" minColumnWidth="250px" p="10px 0">

                    <DummyLearningCourseStatsModified
                        title="Microsoft Excel Mesterkurzus"
                        thumbnailImageUrl={getAssetUrl("courseCoverImages/4.png")} />
                    <DummyLearningCourseStatsModified
                        title="Microsoft PowerPoint Mesterkurzus"
                        thumbnailImageUrl={getAssetUrl("courseCoverImages/courseCoverImage_22_1639469876995..jpg")} />
                </EpistoGrid>
            </EditSection>

            <EditSection title="Átlagos haladás a tanfolyamokon">
                <Flex p="10px 0">
                    <div
                        style={{
                            width: "80%",
                            marginRight: "10px",
                            display: "grid",
                            boxSizing: "border-box",
                            gap: "10px",
                            gridAutoFlow: "row dense",
                            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                            gridAutoRows: "160px"
                        }}>

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




                    </div>
                    {/* chart item  */}
                    <FlexFloat
                        background="var(--transparentWhite70)"
                        //boxShadow="inset -1px -1px 5px rgba(0,0,0,0.15)"
                        direction="column"
                        p="10px"
                        minWidth={250}
                        style={{
                            gridColumn: `auto / span 2`,
                            gridRow: `auto / span 2`
                        }}>

                        {userProgressData && userProgressData.days.length > 0
                            ? <UserProgressChart userProgress={userProgressData} />
                            : <NoProgressChartYet />}

                    </FlexFloat>
                </Flex>

            </EditSection>

            <EditSection title="Aktivitások">
                <div
                    style={{
                        width: "100%",
                        maxWidth: "100%",
                        display: "grid",
                        boxSizing: "border-box",
                        padding: "10px 0",
                        gap: "10px",
                        gridAutoFlow: "row dense",
                        gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                        gridAutoRows: "160px"
                    }}>

                    {/* chart item  */}
                    <FlexFloat
                        background="var(--transparentWhite70)"
                        //boxShadow="inset -1px -1px 5px rgba(0,0,0,0.15)"
                        direction="column"
                        p="10px"
                        minWidth={250}
                        style={{
                            gridColumn: `auto / span 2`,
                            gridRow: `auto / span 2`
                        }}>

                        <UserActivityDistributionChart />
                        {/* <Image
                            src={getAssetUrl("images/piechart.png")}
                            w="100%"
                            h="100%"
                            objectFit="contain" /> */}

                    </FlexFloat>

                    {/* total completed video count */}
                    <StatisticsCard
                        title={"Leggyakoribb aktív idősáv"}
                        value={"17-19"}
                        suffix={"óra között"}
                        iconPath={getAssetUrl("images/learningreport07.png")}
                        isOpenByDefault={false} />

                    {/* total playback time */}
                    <StatisticsCard
                        title={"Teljesített vizsgák száma"}
                        value={"8"}
                        suffix={"db"}
                        iconPath={getAssetUrl("images/learningreport08.png")}
                        isOpenByDefault={false} />

                    {/* total given answer count  */}
                    <StatisticsCard
                        title={"Egy belépés átlagos hossza"}
                        value={"42"}
                        suffix={"perc"}
                        iconPath={getAssetUrl("images/learningreport09.png")}
                        isOpenByDefault={false} />

                    {/* correct answer rate  */}
                    <StatisticsCard
                        title={"Ismétlésre ajánlott videó"}
                        value={"13"}
                        suffix={"db"}
                        iconPath={getAssetUrl("images/learningreport10.png")}
                        isOpenByDefault={false} />
                </div>
            </EditSection>
        </AdminSubpageHeader>
    </AdminBreadcrumbsHeader >
};
