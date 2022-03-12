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
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import { Add, List } from '@mui/icons-material';

export const AdminEditUserSubpage = (props: {
    users: AdminPageUserDTO[],
    refetchUsersFunction: () => void
}) => {

    const { users, refetchUsersFunction } = props

    const params = useParams<{ userId: string }>();
    const editedUserId = parseInt(params.userId);
    const { userEditData, refetchEditUserData } = useEditUserData(editedUserId);
    const { saveUserAsync } = useSaveUser();
    const showError = useShowErrorDialog();
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
                                await refetchUsersFunction();
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
            icon: <List style={{ margin: "0 3px 0 0", padding: "0 0 1px 0" }} />,
            action: () => navigateToUserCourses()
        },
        {
            title: "Hozzáadás",
            icon: <Add style={{ margin: "0 3px 0 0", padding: "0 0 1px 0" }} />,
            action: () => navigateToAddUser()
        }
    ] as ButtonType[]

    const checkIfCurrentUserFromUrl = () => {
        const isUserFound = users.some(user => user.id === editedUserId);

        if (!isUserFound && users[0]) {
            navigate(applicationRoutes.administrationRoute.usersRoute.route + "/" + users[0].id + "/edit")
        }
    }
    checkIfCurrentUserFromUrl()



    return <AdminBreadcrumbsHeader
        viewSwitchFunction={() => {
            navigate(applicationRoutes.administrationRoute.usersRoute.route)
        }}
        breadcrumbs={[
            <BreadcrumbLink
                title="Felhasználók"
                iconComponent={applicationRoutes.administrationRoute.usersRoute.icon}
                to={applicationRoutes.administrationRoute.usersRoute.route + "/a/edit"} />,
            <BreadcrumbLink
                title={userEditData?.lastName + " " + userEditData?.firstName}
                isCurrent />
        ]}>

        <AdminUserList
            users={users}
            navigationFunction={(userId) => {
                navigate(applicationRoutes.administrationRoute.usersRoute.editRoute.route, { userId: userId })
            }} />

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
                //background="var(--transparentWhite70)"
                flexWrap="wrap">

                <EditUserControl
                    editDTO={userEditData}
                    showDeleteUserDialog={showDeleteUserDialog}
                    saveUserAsync={handleSaveUserAsync} />

                <Divider orientation='vertical' h="calc(100% - 20px)" w="1px" background="grey" my="10px" />

                <Box
                    className='roundBorders'
                    flex="1"
                    p="0 10px 10px 10px"
                    minWidth="300px"
                >

                    <LoadingFrame
                        loadingState={[coinBalanceStatus, giftCoinsToUserState]}
                        error={coinBalanceError}
                        direction="column">
                        <EpistoFont
                            fontSize={"fontHuge"}
                            style={{
                                marginTop: 10,
                                fontWeight: 600
                            }}>

                            EpistoCoin egyenleg
                        </EpistoFont>

                        <Flex mt="20px">

                            Egyenleg:

                            <EpistoFont
                                style={{
                                    marginLeft: 5,
                                    fontWeight: 600
                                }}>

                                {coinBalance}
                            </EpistoFont>
                        </Flex>

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
                        <EpistoFont
                            fontSize={"fontHuge"}
                            style={{
                                marginTop: 50,
                                fontWeight: 600
                            }}>

                            Alkalmazás adatai
                        </EpistoFont>
                    </LoadingFrame>
                </Box>
            </Flex>
        </AdminSubpageHeader>
    </AdminBreadcrumbsHeader>
};

export default AdminEditUserSubpage;
