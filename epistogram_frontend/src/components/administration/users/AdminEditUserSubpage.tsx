import { Box, Divider, Flex } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { applicationRoutes } from '../../../configuration/applicationRoutes';
import { UserEditDTO } from '../../../shared/dtos/UserEditDTO';
import { useCoinBalanceOfUser, useGiftCoinsToUser } from '../../../services/api/coinTransactionsApiService';
import { deleteUserAsync, useEditUserData, useSaveUser, useUserListQuery } from '../../../services/api/userApiService';
import { showNotification, useShowErrorDialog } from '../../../services/core/notifications';
import { parseIntOrNull } from '../../../static/frontendHelpers';
import { EpistoButton } from '../../controls/EpistoButton';
import { EpistoEntryNew, useEpistoEntryState } from '../../controls/EpistoEntryNew';
import { EpistoFont } from '../../controls/EpistoFont';
import { EpistoLabel } from '../../controls/EpistoLabel';
import { LoadingFrame } from '../../system/LoadingFrame';
import { AdminSubpageHeader } from '../AdminSubpageHeader';
import { EditUserControl } from './EditUserControl';
import { AdminUserList } from './AdminUserList';
import { AdminBreadcrumbsHeader, BreadcrumbLink } from '../AdminBreadcrumbsHeader';
import { useNavigation } from '../../../services/core/navigatior';
import { ButtonType } from '../../../models/types';
import { AdminPageUserDTO } from '../../../shared/dtos/AdminPageUserDTO';
import { EpistoDialog, useEpistoDialogLogic } from '../../EpistoDialog';

const AdminEditUserSubpage = () => {

    const params = useParams<{ userId: string }>();
    const [searchText, setSearchText] = useState<string | null>(null);
    const editedUserId = parseInt(params.userId);
    const { userEditData, refetchEditUserData } = useEditUserData(editedUserId);
    const { saveUserAsync } = useSaveUser();
    const showError = useShowErrorDialog();
    const { users, usersStatus, usersError, refetchUsers } = useUserListQuery(searchText);
    const { coinBalance, coinBalanceStatus, coinBalanceError, refetchCoinBalance } = useCoinBalanceOfUser(editedUserId);
    const { giftCoinsToUserAsync, giftCoinsToUserState } = useGiftCoinsToUser();
    const { navigate } = useNavigation();
    const navigateToAddUser = () => navigate(applicationRoutes.administrationRoute.usersRoute.addRoute.route);
    const navigateToUserCourses = () => navigate(`${applicationRoutes.administrationRoute.usersRoute.route}/${editedUserId}/courses/:courseId/statistics`)

    const handleSaveUserAsync = async (dto: UserEditDTO) => {

        try {

            await saveUserAsync(dto);
            showNotification("A változtatások sikeresen mentésre kerültek.");
            refetchEditUserData();
        }
        catch (e) {

            showError(e);
        }
    }

    const coinAmountEntryState = useEpistoEntryState({
        isMandatory: true,
        validateFunction: (value) => {

            if (value === "0")
                return "Nem adhatsz hozzá '0' coin-t."

            if (!parseIntOrNull(value))
                return "Helytelen formátum"

            return null;
        }
    });

    const handleAddCoinsAsync = async () => {

        try {

            if (!coinAmountEntryState.validate())
                return;

            const amount = parseInt(coinAmountEntryState.value);

            await giftCoinsToUserAsync({ userId: editedUserId, amount });
            showNotification(`Sikeresen hozzáadtál ${amount} Coint.`);
            await refetchCoinBalance();
        }
        catch (e) {

            showError(e);
        }
    }

    const deleteWaningDialogLogic = useEpistoDialogLogic();

    const handleSearch = (value: string) => {

        if (value === "")
            setSearchText(null);

        if (value.length > 2)
            setSearchText(value);
    }

    const showDeleteUserDialog = (user: UserEditDTO | null) => {
        if (!user)
            return

        deleteWaningDialogLogic
            .openDialog({
                title: "Biztosan törlöd a felhasználót?",
                description: `${user.lastName} ${user.firstName} nevű felhasználó visszavonhatatlanul törölve lesz!`,
                buttons: [
                    {
                        title: "Törlés",
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
    }

    const bulkEditButtons = [
        {
            title: "Összes megtekintett kurzus",
            action: () => navigateToUserCourses()
        },
        {
            title: "Hozzáadás",
            action: () => navigateToAddUser()
        }
    ] as ButtonType[]

    return <AdminBreadcrumbsHeader breadcrumbs={[
        <BreadcrumbLink
            title="Felhasználók"
            iconComponent={applicationRoutes.administrationRoute.usersRoute.icon}
            to={applicationRoutes.administrationRoute.usersRoute.route + "/a/edit"} />,
        <BreadcrumbLink
            title={userEditData?.lastName + " " + userEditData?.firstName}
            isCurrent />
    ]}>

        <AdminUserList currentUserPage='edit' />

        <AdminSubpageHeader
            direction="row"
            headerButtons={bulkEditButtons}
            tabMenuItems={
                [
                    applicationRoutes.administrationRoute.usersRoute.editRoute,
                    applicationRoutes.administrationRoute.usersRoute.statsRoute
                ]
                    .concat(userEditData?.isTeacher ? applicationRoutes.administrationRoute.usersRoute.teacherInfoRoute : [])}>

            <EpistoDialog logic={deleteWaningDialogLogic} />

            <Flex
                className='roundBorders'
                flex="1"
                mt="5px"
                background="var(--transparentWhite70)"
                flexWrap="wrap">

                <EditUserControl
                    editDTO={userEditData}
                    showDeleteUserDialog={showDeleteUserDialog}
                    saveUserAsync={handleSaveUserAsync} />

                <Divider orientation='vertical' h="calc(100% - 20px)" w="1px" background="grey" my="10px" />

                <Box
                    className='roundBorders'
                    flex="1"
                    p="10px"
                    minWidth="300px"
                >

                    <LoadingFrame
                        loadingState={[coinBalanceStatus, giftCoinsToUserState]}
                        error={coinBalanceError}
                        direction="column">

                        <EpistoFont>
                            Egyenleg: {coinBalance}
                        </EpistoFont>

                        <EpistoLabel text="EpistoCoin hozzáadása">

                            <EpistoEntryNew
                                type="number"
                                state={coinAmountEntryState} />

                            <EpistoButton
                                isDisabled={!!coinAmountEntryState.error}
                                onClick={handleAddCoinsAsync}
                                style={{ alignSelf: "flex-start" }}
                                variant="colored">
                                Hozzáadás
                            </EpistoButton>
                        </EpistoLabel>
                    </LoadingFrame>
                </Box>
            </Flex>
        </AdminSubpageHeader>
    </AdminBreadcrumbsHeader>
};

export default AdminEditUserSubpage;
