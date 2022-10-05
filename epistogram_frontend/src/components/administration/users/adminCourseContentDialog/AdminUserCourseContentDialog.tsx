import { useState } from 'react';
import { CourseApiService } from '../../../../services/api/courseApiService';
import { UserApiService } from '../../../../services/api/userApiService';
import { Id } from '../../../../shared/types/versionId';
import { EpistoFlex2 } from '../../../controls/EpistoFlex';
import { EpistoFont } from '../../../controls/EpistoFont';
import { EpistoTabs } from '../../../controls/EpistoTabs';
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
            }
        ]
        : [];

    return <EpistoDialog
        closeButtonType="top"
        fullScreenX
        fullScreenY
        logic={dialogLogic}>

        <EpistoFlex2
            className="roundBorders whall"
            flex="1"
            flexDirection="column">

            {/* tabs */}
            <EpistoFlex2
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

                <EpistoFlex2
                    align="center"
                    h="50px">
                    <EpistoFlex2
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
                    </EpistoFlex2>
                </EpistoFlex2>

                <EpistoTabs
                    selectedTabKey={currentTab}
                    onChange={key => setCurrentTab(key)}
                    tabItems={moreInfoDialogTabs
                        .map((x, index) => ({
                            key: index,
                            label: x.title
                        }))} />
            </EpistoFlex2>

            <EpistoFlex2
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
            </EpistoFlex2>
        </EpistoFlex2>
    </EpistoDialog>;
};