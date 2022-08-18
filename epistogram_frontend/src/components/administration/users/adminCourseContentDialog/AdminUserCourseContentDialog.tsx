import { Flex } from '@chakra-ui/react';
import { Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import { CourseApiService } from '../../../../services/api/courseApiService';
import { UserApiService } from '../../../../services/api/userApiService';
import { Id } from '../../../../shared/types/versionId';
import { EpistoFont } from '../../../controls/EpistoFont';
import { TabPanel } from '../../../courseDetails/TabPanel';
import { EpistoDialog } from '../../../universal/epistoDialog/EpistoDialog';
import { EpistoDialogLogicType } from '../../../universal/epistoDialog/EpistoDialogTypes';
import { AdminUserCourseStatsOverview } from '../AdminUserCourseStatsOverview';
import { AdminUserExamsDataGridControl } from '../dataGrids/AdminUserExamsDataGridControl';
import { AdminUserVideosDataGridControl } from '../dataGrids/AdminUserVideosDataGridControl';

export const AdminUserCourseContentDialog = (props: {
    dialogLogic: EpistoDialogLogicType<{
        courseId: Id<'Course'>,
        userId: Id<'User'>
    }>
}) => {

    const { dialogLogic } = props;
    const dialogParams = dialogLogic.params;

    const [currentTab, setCurrentTab] = useState(0);

    // http 
    const { courseBriefData } = CourseApiService
        .useCourseBriefData(dialogParams?.courseId ?? null);

    const { briefUserData } = UserApiService
        .useBriefUserData(dialogParams?.userId ?? null);

    const courseTitle = courseBriefData?.title || '';
    const userFullName = briefUserData?.fullName || '';

    const moreInfoDialogTabs = dialogParams
        ? [
            {
                title: 'Áttekintés',
                component: <AdminUserCourseStatsOverview
                    courseId={dialogParams.courseId}
                    userId={dialogParams.userId} />
            },
            {
                title: 'Videók',
                component: <AdminUserVideosDataGridControl
                    courseId={dialogParams.courseId}
                    handleMoreButton={
                        function (): void {
                            throw new Error('Function not implemented.');
                        }} />
            },
            {
                title: 'Vizsgák',
                component: <AdminUserExamsDataGridControl
                    courseId={dialogParams.courseId}
                    handleMoreButton={
                        function (): void {
                            throw new Error('Function not implemented.');
                        }} />
            },
            {
                title: 'Kommentek/kérdések',
                component: <Flex>
                    Kommentek/kérdések
                </Flex>
            }
        ]
        : [];

    return <EpistoDialog
        closeButtonType="top"
        fullScreenX
        fullScreenY
        logic={dialogLogic}>

        <Flex
            className="roundBorders whall"
            flex="1"
            flexDirection="column">

            {/* tabs */}
            <Flex
                background="rgba(255,255,255,0.97)"
                direction="row"
                justify="space-between"
                align="center"
                position="sticky"
                w="100%"
                top="0"
                maxH="80px"
                p="20px 30px 20px 30px"
                className="mildShadow"
                zIndex="1000">

                <Flex
                    align="center"
                    h="50px">
                    <Flex
                        h="50px"
                        direction="column"
                        mr="20px">

                        <EpistoFont
                            fontSize={'fontLarge'}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                flexDirection: 'row',
                                fontWeight: 600
                            }}>
                            {courseTitle}
                        </EpistoFont>
                        <EpistoFont fontSize={'fontMid'}>
                            {userFullName}
                        </EpistoFont>
                    </Flex>
                </Flex>
                <Tabs
                    value={currentTab}
                    onChange={(_, y) => setCurrentTab(y as number)}
                    className="roundBorders"
                    TabIndicatorProps={{
                        style: {
                            display: 'none',
                        },
                    }}
                    sx={{
                        '&.MuiTabs-root': {
                            //background: 'var(--transparentIntenseBlue85)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: 45,
                            minHeight: 0
                        }
                    }}>

                    {moreInfoDialogTabs
                        .map((x, index) => {

                            return <Tab
                                key={index}
                                sx={{
                                    '&.MuiTab-root': {
                                        color: '#444',
                                        cursor: 'pointer',
                                        backgroundColor: 'transparent',
                                        padding: '6px 16px',
                                        border: 'none',
                                        borderRadius: '5px',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        height: '41px',
                                        minHeight: '0px'
                                    },
                                    '&.MuiTouchRipple-root': {
                                        lineHeight: '0px'
                                    },
                                    '&.Mui-selected': {
                                        color: '#444',
                                        fontWeight: 'bold',
                                        background: 'var(--transparentIntenseTeal)'
                                    }
                                }}
                                label={x.title}
                                id={index + ''} />;
                        })}
                </Tabs>
            </Flex>

            { /* tab contents */}
            <Flex
                flex='1'
                className='whall'>

                {moreInfoDialogTabs
                    .map((x, index) => <TabPanel
                        style={{
                            height: '100%',
                            width: '100%',
                        }}
                        key={index}
                        value={currentTab}
                        index={index}>

                        {x.component}
                    </TabPanel>)}
            </Flex>
        </Flex>
    </EpistoDialog>;
};