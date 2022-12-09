import { Id, TeacherBadgeNameType } from '@episto/commontypes';
import { useEffect, useState } from 'react';
import { ButtonType } from '../../../models/types';
import { useSaveTeacherInfoData, useTeacherInfoEditData } from '../../../services/api/teacherInfoApiService';
import { UserApiService } from '../../../services/api/UserApiService1';
import { useNavigation } from '../../../services/core/navigatior';
import { showNotification, useShowErrorDialog } from '../../../services/core/notifications';
import { translatableTexts } from '../../../static/translatableTexts';
import { EpistoButton } from '../../controls/EpistoButton';
import { EpistoEntry } from '../../controls/EpistoEntry';
import { EpistoFlex2 } from '../../controls/EpistoFlex';
import { EpistoFont } from '../../controls/EpistoFont';
import { EpistoLabel } from '../../controls/EpistoLabel';
import { EpistoSlider } from '../../controls/EpistoSlider';
import { MUI } from '../../controls/MUIControls';
import { AdminSubpageHeader } from '../AdminSubpageHeader';
import { EditSection } from '../courses/EditSection';

export const AdminUserTeacherInfoSubpage = ({
    tabMenuItems,
    headerButtons,
    userId
}: {
    tabMenuItems: any[],
    headerButtons: ButtonType[],
    userId: Id<'User'>
}) => {

    const { teacherInfoEditData } = useTeacherInfoEditData(userId);

    const { userEditData, refetchEditUserData } = UserApiService
        .useEditUserData(userId);

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

    return (
        <AdminSubpageHeader
            headerButtons={headerButtons}
            tabMenuItems={tabMenuItems}>

            <EpistoFlex2
                flex="1"
                direction="column"
                width="100%"
                className="roundBorders">

                <EditSection
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
                        <EpistoSlider
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
                        <EpistoFlex2 flexWrap={'wrap'}>
                            {allBadges
                                .map((badge, index) => {
                                    return <EpistoFlex2
                                        key={index}
                                        flexDir={'column'}
                                        justifyContent={'space-between'}
                                        alignItems={'center'}
                                        flex={'0 0 calc(33.3333333% - 10px)'}
                                        bgColor={'#f2f2f2'}
                                        borderRadius='7px'
                                        height='180px'
                                        boxSizing={'border-box'}
                                        margin='5px'>

                                        <EpistoFlex2>
                                            <img src={badge.icon}
                                                alt={''} />
                                        </EpistoFlex2>

                                        <EpistoFlex2>
                                            <MUI.Checkbox
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
                                        </EpistoFlex2>
                                    </EpistoFlex2>;
                                })}
                        </EpistoFlex2>
                    </EpistoLabel>

                    {/* submit button */}
                    <EpistoButton
                        variant={'colored'}
                        onClick={() => handleSaveAsync()}
                        style={{ marginTop: '20px', background: 'var(--deepBlue)' }}>

                        {translatableTexts.misc.save}
                    </EpistoButton>
                </EditSection>
            </EpistoFlex2>
        </AdminSubpageHeader>
    );
};
