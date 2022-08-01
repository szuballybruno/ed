import { Flex } from '@chakra-ui/react';
import { Checkbox, Slider } from '@mui/material';
import { useEffect, useState } from 'react';
import { applicationRoutes } from '../../../configuration/applicationRoutes';
import { useSaveTeacherInfoData, useTeacherInfoEditData } from '../../../services/api/teacherInfoApiService';
import { useEditUserData } from '../../../services/api/userApiService';
import { useNavigation } from '../../../services/core/navigatior';
import { showNotification, useShowErrorDialog } from '../../../services/core/notifications';
import { AdminPageUserDTO } from '../../../shared/dtos/admin/AdminPageUserDTO';
import { TeacherBadgeNameType } from '../../../shared/types/sharedTypes';
import { useRouteParams } from '../../../static/locationHelpers';
import { translatableTexts } from '../../../static/translatableTexts';
import { EpistoButton } from '../../controls/EpistoButton';
import { EpistoEntry } from '../../controls/EpistoEntry';
import { EpistoFont } from '../../controls/EpistoFont';
import { EpistoLabel } from '../../controls/EpistoLabel';
import { AdminBreadcrumbsHeader } from '../AdminBreadcrumbsHeader';
import { AdminSubpageHeader } from '../AdminSubpageHeader';
import { EditSection } from '../courses/EditSection';
import { AdminUserList } from './AdminUserList';

export const AdminUserTeacherInfoSubpage = (props: {
    users: AdminPageUserDTO[]
}) => {

    const { users } = props;

    const editedUserId = useRouteParams(applicationRoutes.administrationRoute.usersRoute.teacherInfoRoute)
        .getValue(x => x.userId, 'int');

    const { teacherInfoEditData } = useTeacherInfoEditData(editedUserId);
    const { userEditData, refetchEditUserData } = useEditUserData(editedUserId);
    const { saveTeacherInfoAsync, saveTeacherInfoState } = useSaveTeacherInfoData();
    const { navigate2 } = useNavigation();
    const showError = useShowErrorDialog();

    const [skills, setSkills] = useState('');
    const [courseCount, setCoursesCount] = useState('');
    const [videoCount, setVideoCount] = useState('');
    const [studentCount, setStudentCount] = useState('');
    const [description, setDescription] = useState('');
    const [rating, setRating] = useState(0);
    const [selectedBadges, setSelectedBadges] = useState<TeacherBadgeNameType[]>([]);

    useEffect(() => {

        if (!teacherInfoEditData)
            return;

        setSelectedBadges(teacherInfoEditData.badges);
        setSkills(teacherInfoEditData.skills);
        setVideoCount(teacherInfoEditData.videoCount + '');
        setStudentCount(teacherInfoEditData.studentCount + '');
        setCoursesCount(teacherInfoEditData.courseCount + '');
        setRating(teacherInfoEditData.rating);
        setDescription(teacherInfoEditData.description);
    }, [teacherInfoEditData]);

    const allBadges = [
        {
            name: 'badge1',
            icon: ''
        },
        {
            name: 'badge2',
            icon: ''
        },
        {
            name: 'badge3',
            icon: ''
        }
    ] as ({
        name: TeacherBadgeNameType,
        icon: any
    })[];

    const handleSaveAsync = async () => {

        try {

            await saveTeacherInfoAsync({
                badges: selectedBadges,
                rating,
                courseCount: parseInt(courseCount),
                id: teacherInfoEditData?.id!,
                skills: skills,
                studentCount: parseInt(studentCount),
                videoCount: parseInt(videoCount),
                description
            });

            showNotification(translatableTexts.administration.teacherInfoSubpage.teacherInfoSaved);
        }
        catch (e) {

            showError(e);
        }
    };

    return <AdminBreadcrumbsHeader
        subRouteLabel={`${userEditData?.lastName} ${userEditData?.firstName}`}>

        <AdminUserList
            currentUserId={editedUserId}
            users={users}
            navigationFunction={(userId) => navigate2(applicationRoutes.administrationRoute.usersRoute.teacherInfoRoute, { userId: userId })} />

        {/* admin header */}
        <AdminSubpageHeader
            tabMenuItems={[
                applicationRoutes.administrationRoute.usersRoute.editRoute,
                applicationRoutes.administrationRoute.usersRoute.statsRoute,
                applicationRoutes.administrationRoute.usersRoute.courseContentRoute,
                applicationRoutes.administrationRoute.usersRoute.teacherInfoRoute
            ]}>

            <Flex
                flex="1"
                direction="column"
                width="100%"
                className="roundBorders">

                <EditSection
                    isFirst
                    title="Oktató jellemzése">

                    {/* Teacher skills */}
                    <EpistoEntry
                        labelVariant={'top'}
                        isMultiline
                        value={skills}
                        label={translatableTexts.administration.teacherInfoSubpage.teacherSkills}
                        setValue={setSkills} />

                    {/* description */}
                    <EpistoEntry
                        labelVariant={'top'}
                        value={description}
                        label={translatableTexts.administration.teacherInfoSubpage.teacherDescription}
                        isMultiline
                        setValue={setDescription} />

                    {/* Teacher courses count */}
                    <EpistoEntry
                        labelVariant={'top'}
                        type="number"
                        value={courseCount}
                        label={translatableTexts.administration.teacherInfoSubpage.teacherCoursesCount}
                        setValue={setCoursesCount} />

                    {/* Teacher videos count */}
                    <EpistoEntry
                        labelVariant={'top'}
                        type="number"
                        value={videoCount}
                        label={translatableTexts.administration.teacherInfoSubpage.teacherVideosCount}
                        setValue={setVideoCount} />

                    {/* Teacher students count */}
                    <EpistoEntry
                        labelVariant={'top'}
                        type="number"
                        value={studentCount}
                        label={translatableTexts.administration.teacherInfoSubpage.teacherStudentsCount}
                        setValue={setStudentCount} />

                    {/* Teacher rating */}
                    <EpistoLabel text={translatableTexts.administration.teacherInfoSubpage.teacherRating}>
                        <Slider
                            defaultValue={0}
                            valueLabelDisplay="auto"
                            step={0.5}
                            marks
                            value={rating}
                            onChange={(_, x) => setRating(x as number)}
                            min={0}
                            max={5} />
                    </EpistoLabel>

                    {/* Teacher badges */}
                    <EpistoLabel text={translatableTexts.administration.teacherInfoSubpage.teacherBadges}>
                        <Flex flexWrap={'wrap'}>
                            {allBadges
                                .map((badge, index) => {
                                    return <Flex
                                        key={index}
                                        flexDir={'column'}
                                        justifyContent={'space-between'}
                                        alignItems={'center'}
                                        flex={'0 0 calc(33.3333333% - 10px)'}
                                        bgColor={'#f2f2f2'}
                                        borderRadius={7}
                                        height={180}
                                        boxSizing={'border-box'}
                                        m={5}>

                                        <Flex>
                                            <img src={badge.icon}
                                                alt={''} />
                                        </Flex>

                                        <Flex>
                                            <Checkbox
                                                checked={selectedBadges.some(x => x === badge.name)}
                                                onChange={(_, y) => {

                                                    if (y) {

                                                        setSelectedBadges([...selectedBadges, badge.name]);
                                                    }
                                                    else {

                                                        setSelectedBadges(selectedBadges.filter(x => x !== badge.name));
                                                    }
                                                }} />

                                            <EpistoFont fontSize={'fontSmall'}>
                                                {badge.name}
                                            </EpistoFont>
                                        </Flex>
                                    </Flex>;
                                })}
                        </Flex>
                    </EpistoLabel>

                    {/* submit button */}
                    <EpistoButton
                        variant={'colored'}
                        onClick={() => handleSaveAsync()}
                        style={{ marginTop: '20px', background: 'var(--deepBlue)' }}>

                        {translatableTexts.misc.save}
                    </EpistoButton>
                </EditSection>


            </Flex>
        </AdminSubpageHeader>
    </AdminBreadcrumbsHeader>;
};
