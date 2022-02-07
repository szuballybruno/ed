import { Box, Flex } from '@chakra-ui/react';
import React from 'react';
import { useParams } from 'react-router-dom';
import { applicationRoutes } from '../../../configuration/applicationRoutes';
import { UserEditDTO } from '../../../models/shared_models/UserEditDTO';
import { useCoinBalanceOfUser, useGiftCoinsToUser } from '../../../services/api/coinTransactionsApiService';
import { useEditUserData, useSaveUser } from '../../../services/api/userApiService';
import { showNotification, useShowErrorDialog } from '../../../services/core/notifications';
import { parseIntOrNull } from '../../../static/frontendHelpers';
import { EpistoButton } from '../../controls/EpistoButton';
import { EpistoEntryNew, useEpistoEntryState } from '../../controls/EpistoEntryNew';
import { EpistoFont } from '../../controls/EpistoFont';
import { EpistoLabel } from '../../controls/EpistoLabel';
import { LoadingFrame } from '../../system/LoadingFrame';
import { AdminSubpageHeader } from '../AdminSubpageHeader';
import { EditUserControl } from './EditUserControl';

const AdminEditUserSubpage = () => {

    const params = useParams<{ userId: string }>();
    const editedUserId = parseInt(params.userId);
    const { userEditData, refetchEditUserData } = useEditUserData(editedUserId);
    const { saveUserAsync } = useSaveUser();
    const showError = useShowErrorDialog();
    const { coinBalance, coinBalanceStatus, coinBalanceError, refetchCoinBalance } = useCoinBalanceOfUser(editedUserId);
    const { giftCoinsToUserAsync, giftCoinsToUserState } = useGiftCoinsToUser();

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
                return "Nem adhatsz hozza '0' coin-t."

            if (!parseIntOrNull(value))
                return "Helytelen formatum."

            return null;
        }
    });

    const handleAddCoinsAsync = async () => {

        try {

            if (!coinAmountEntryState.validate())
                return;

            const amount = parseInt(coinAmountEntryState.value);

            await giftCoinsToUserAsync({ userId: editedUserId, amount });
            showNotification(`Sikeresen hozzaadtal ${amount} Coint.`);
            await refetchCoinBalance();
        }
        catch (e) {

            showError(e);
        }
    }

    return <AdminSubpageHeader
        tabMenuItems={
            [
                applicationRoutes.administrationRoute.usersRoute.editRoute,
                applicationRoutes.administrationRoute.usersRoute.statsRoute
            ]
                .concat(userEditData?.isTeacher ? applicationRoutes.administrationRoute.usersRoute.teacherInfoRoute : [])}>

        <Flex
            className='roundBorders'
            mt="5px"
            pb="10px"
            background="var(--transparentWhite70)"
            flexWrap="wrap">

            <Box flex="1" minWidth="300px">
                <EditUserControl
                    editDTO={userEditData}
                    saveUserAsync={handleSaveUserAsync} />
            </Box>

            <Box
                flex="1"
                minWidth="300px">

                <LoadingFrame
                    loadingState={[coinBalanceStatus, giftCoinsToUserState]}
                    error={coinBalanceError}
                    direction="column">

                    <EpistoFont>
                        Balance: {coinBalance}
                    </EpistoFont>

                    <EpistoLabel text="Add coins">

                        <EpistoEntryNew
                            type="number"
                            state={coinAmountEntryState} />

                        <EpistoButton
                            isDisabled={!!coinAmountEntryState.error}
                            onClick={handleAddCoinsAsync}
                            style={{ alignSelf: "flex-start" }}
                            variant="colored">
                            Add coins
                        </EpistoButton>
                    </EpistoLabel>
                </LoadingFrame>
            </Box>
        </Flex>
    </AdminSubpageHeader>
};

export default AdminEditUserSubpage;
