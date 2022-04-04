import { Flex } from '@chakra-ui/layout';
import { ApartmentTwoTone, Edit, Email, Equalizer, School, WorkTwoTone } from '@mui/icons-material';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import DeleteIcon from '@mui/icons-material/Delete';
import DesktopAccessDisabledIcon from '@mui/icons-material/DesktopAccessDisabled';
import React, { ReactNode, useContext, useState } from 'react';
import { applicationRoutes } from '../../../configuration/applicationRoutes';
import { AdminPageUserDTO } from '../../../shared/dtos/admin/AdminPageUserDTO';
import { deleteUserAsync, useUserListQuery } from '../../../services/api/userApiService';
import { useNavigation } from '../../../services/core/navigatior';
import { useShowErrorDialog } from '../../../services/core/notifications';
import { ArrayBuilder, dateTimeToString, formatTimespan, getRoleName } from '../../../static/frontendHelpers';
import { EpistoButton } from '../../controls/EpistoButton';
import { EpistoDialog, useEpistoDialogLogic } from '../../EpistoDialog';
import { FloatAddButton } from '../../FloatAddButton';
import { ProfileImage } from '../../ProfileImage';
import { CurrentUserContext } from '../../system/AuthenticationFrame';
import { LoadingFrame } from '../../system/LoadingFrame';
import { FlexList } from '../../universal/FlexList';
import { FlexListItem } from '../../universal/FlexListItem';
import { FlexListTitleSubtitle } from '../../universal/FlexListTitleSubtitle';
import { FloatChip } from '../../universal/FloatChip';
import { AdminListEditHeader } from '../AdminListEditHeader';
import { AdminSubpageHeader } from '../AdminSubpageHeader';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import LoginIcon from '@mui/icons-material/Login';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

export const AdminUserListSubpage = () => {

    const user = useContext(CurrentUserContext)!;
    const currentUserId = user.id;
    const { navigate } = useNavigation();
    const navigateToAddUser = () => navigate(applicationRoutes.administrationRoute.usersRoute.addRoute);
    const showError = useShowErrorDialog();

    const administrationRoutes = applicationRoutes.administrationRoute;

    const [searchText, setSearchText] = useState<string | null>(null);
    const [selectedUserIds, setSelectedUserIds] = useState<number[]>([]);

    const { users, usersStatus, usersError, refetchUsers } = useUserListQuery(searchText);

    const isAllUsersSelected = !users.some(user => !selectedUserIds.some(uid => uid === user.id));

    const deleteWaningDialogLogic = useEpistoDialogLogic('delwarn2');

    const handleSearch = (value: string) => {

        if (value === '')
            setSearchText(null);

        if (value.length > 2)
            setSearchText(value);
    };

    const showDeleteUserDialog = (user: AdminPageUserDTO) => {

        deleteWaningDialogLogic
            .openDialog({
                title: 'Biztosan törlöd a felhasználót?',
                description: `A ${user.name} nevű felhasználó visszavonhatatlanul törölve lesz!`,
                buttons: [
                    {
                        title: 'Törlés',
                        action: async () => {

                            try {

                                await deleteUserAsync(user.id);
                                await refetchUsers();
                            }
                            catch (e) {

                                showError(e);
                            }
                        }
                    }
                ]
            });
    };

    const setSelectedUser = (userId: number, isSelected: boolean) => {

        if (isSelected) {

            setSelectedUserIds([...selectedUserIds, userId]);
        }
        else {

            setSelectedUserIds(selectedUserIds.filter(x => x !== userId));
        }
    };

    const selectAllOrNone = (isAll: boolean) => {

        if (isAll) {

            setSelectedUserIds(users.map(x => x.id));
        } else {

            setSelectedUserIds([]);
        }
    };

    const headerButtons = [
        {
            name: 'editUserButton',
            text: 'Szerkesztés',
            onClick: () => navigate(administrationRoutes.usersRoute.editRoute, { userId: user.id }),
        },
        {
            name: 'deleteUserButton',
            text: 'Törlés',
            onClick: () => showDeleteUserDialog(users.filter(x => x.id === selectedUserIds[0])[0])
        },
        {
            name: 'viewUserStatsButton',
            text: 'Statisztika megjelenítése',
            onClick: () => navigate(administrationRoutes.usersRoute.statsRoute, { userId: user.id })
        },
        {
            name: 'editTeacherInfo',
            text: 'Oktatói adatok szerkesztése',
            onClick: () => navigate(applicationRoutes.administrationRoute.usersRoute.teacherInfoRoute, { userId: user.id })
        }
    ];

    const rowButtons = [
        {
            icon: <Edit style={{ width: '20px', height: '20px' }} />,
            onClick: (user: AdminPageUserDTO) => navigate(administrationRoutes.usersRoute.editRoute, { userId: user.id })
        },
        {
            icon: <Equalizer style={{ width: '20px', height: '20px' }} />,
            onClick: (user: AdminPageUserDTO) => navigate(administrationRoutes.usersRoute.statsRoute, { userId: user.id })
        },
        {
            icon: <School style={{ width: '20px', height: '20px' }} />,
            onClick: (user: AdminPageUserDTO) => navigate(applicationRoutes.administrationRoute.usersRoute.teacherInfoRoute, { userId: user.id })
        },
        {
            icon: <DeleteIcon style={{ width: '20px', height: '20px' }}></DeleteIcon>,
            getIsVisible: (userId: number) => currentUserId !== userId,
            onClick: (user: AdminPageUserDTO) => showDeleteUserDialog(user)
        },
    ];

    const getChips = (user: AdminPageUserDTO) => {

        return new ArrayBuilder<{ name: string, icon: ReactNode }>()
            .addIf(!user.canAccessApplication, {
                name: 'Nincs hozzáférése az applikációhoz',
                icon: <DesktopAccessDisabledIcon />
            })
            .addIf(!user.isInvitationAccepted, {
                name: 'A meghívás elfogadásra vár',
                icon: <Email />
            })
            .add({
                name: user.email,
                icon: <AlternateEmailIcon />
            })
            .add({
                name: user.organizationName,
                icon: <ApartmentTwoTone />
            })
            .add({
                name: getRoleName(user.roleId),
                icon: <AccessibilityIcon />
            })
            .addIf(!!user.jobTitleName, {
                name: user.jobTitleName,
                icon: <WorkTwoTone />
            })
            .add({
                name: formatTimespan(user.totalSpentTimeSeconds),
                icon: <AccessTimeFilledIcon />
            })
            .addIf(!!user.latestActivityDate, {
                name: dateTimeToString(user.latestActivityDate),
                icon: <LoginIcon />
            })
            .add({
                name: 'EpistoCoin egyenleg: ' + user.coinBalance,
                icon: <MonetizationOnIcon />
            })
            .getArray();
    };

    return <LoadingFrame loadingState={usersStatus}
        error={usersError}
        className="whall">

        {/* admin header */}
        <AdminSubpageHeader direction="column">
            <AdminListEditHeader
                headerButtons={headerButtons}
                isAllSelected={isAllUsersSelected}
                selectAllOrNone={selectAllOrNone}
                selectedIds={selectedUserIds}
                onSearchChanged={handleSearch}
                itemLabel="felhasználó" />

            <EpistoDialog logic={deleteWaningDialogLogic} />

            {/* user list */}
            <FlexList
                background="var(--transparentWhite70)"
                className="whall roundBorders"
                mt="5px">

                {users
                    .map((user, index) => {

                        return <FlexListItem
                            key={index}
                            thumbnailContent={<ProfileImage
                                url={user.avatarUrl}
                                lastName={user.lastName}
                                firstName={user.firstName}
                                className="square70" />}
                            setIsChecked={x => setSelectedUser(user.id, x)}
                            isChecked={selectedUserIds.some(x => x === user.id)}
                            midContent={<FlexListTitleSubtitle
                                title={`${user.name}`}
                                subTitle={<Flex wrap="wrap">
                                    {getChips(user)
                                        .map((chip, index) => <FloatChip
                                            key={index}
                                            name={chip.name}
                                            icon={chip.icon}
                                            padding="5px" />)}
                                </Flex>}
                            />}
                            endContent={<Flex
                                align="center"
                                justifyContent={'flex-end'}
                                height="100%"
                                width={165}
                                px={10}>

                                {/* go to edit */}
                                {rowButtons
                                    .filter(x => x?.getIsVisible ? x.getIsVisible(user.id) : true)
                                    .map((x, index2) => <EpistoButton
                                        key={index2}
                                        variant={'colored'}
                                        onClick={() => x.onClick(user)}
                                        style={{ width: 20, margin: '3px' }}>

                                        {x.icon}
                                    </EpistoButton>)}
                            </Flex>}
                        />;
                    })}
            </FlexList>

            <FloatAddButton onClick={navigateToAddUser} />
        </AdminSubpageHeader>
    </LoadingFrame>;
};
