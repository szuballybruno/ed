import { applicationRoutes } from '../configuration/applicationRoutes';
import { useSetNewPassword } from '../services/api/passwordChangeApiService';
import { useNavigation } from '../services/core/navigatior';
import { showNotification, useShowErrorDialog } from '../services/core/notifications';
import { Environment } from '../static/Environemnt';
import { useRouteQuery } from '../static/locationHelpers';
import { ContentPane } from './ContentPane';
import { EpistoButton } from './controls/EpistoButton';
import { EpistoHeader } from './EpistoHeader';
import { PageRootContainer } from './PageRootContainer';
import { LoadingFrame } from './system/LoadingFrame';
import { PasswordEntry, usePasswordEntryState } from './universal/PasswordEntry';

export const SetNewPasswordPage = () => {

    const { setNewPassword, setNewPasswordState } = useSetNewPassword();

    const passwordEntryState = usePasswordEntryState();

    const token = useRouteQuery(applicationRoutes.setNewPasswordRoute)
        .getValue(x => x.token, 'string');

    const showErrorDialog = useShowErrorDialog();

    const { navigate2 } = useNavigation();

    const handleSetNewPassword = async () => {
        try {

            if (!passwordEntryState.validate())
                return;

            await setNewPassword(passwordEntryState.password, passwordEntryState.passwordCompare, token);

            showNotification('Új jelszó sikeresen beállítva!');
            navigate2(applicationRoutes.homeRoute);

        }
        catch (e) {

            showErrorDialog(e);
        }
    };

    return <PageRootContainer
        align="flex-start"
        justify="center"
        backgoundImageSrc={Environment.getAssetUrl('loginScreen/surveybg.png')}
        position="relative">

        <ContentPane
            hideNavbar
            navbarBg="white">

            <LoadingFrame
                direction="column"
                mt="20vh"
                position="relative"
                className="roundBorders"
                bg="white"
                p="30px"
                loadingState={setNewPasswordState}
                minWidth="400px">

                <EpistoHeader text="Új jelszó megadása"
                    mt="30px"
                    alignSelf="center">

                </EpistoHeader>

                <PasswordEntry
                    state={passwordEntryState} />

                <EpistoButton
                    variant="outlined"
                    onClick={handleSetNewPassword}
                    style={{ alignSelf: 'flex-end', margin: '20px' }}>

                    Elküldés
                </EpistoButton>
            </LoadingFrame>
        </ContentPane>
    </PageRootContainer >;
};