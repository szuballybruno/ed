import { TextField } from '@mui/material';
import { applicationRoutes } from '../configuration/applicationRoutes';
import { useSetNewPassword } from '../services/api/passwordChangeApiService';
import { useNavigation } from '../services/core/navigatior';
import { showNotification, useShowErrorDialog } from '../services/core/notifications';
import { Environment } from '../static/Environemnt';
import { usePasswordEntryState } from '../static/frontendHelpers';
import { useRouteQuery } from '../static/locationHelpers';
import { ContentPane } from './ContentPane';
import { EpistoButton } from './controls/EpistoButton';
import { EpistoHeader } from './EpistoHeader';
import { PageRootContainer } from './PageRootContainer';
import { LoadingFrame } from './system/LoadingFrame';

export const SetNewPasswordPage = () => {

    const { setNewPassword, setNewPasswordState } = useSetNewPassword();

    const {
        password,
        passwordCompare,
        passwordCompareError,
        passwordError,
        setPassword,
        setPasswordCompare,
        validate
    } = usePasswordEntryState();

    const token = useRouteQuery(applicationRoutes.setNewPasswordRoute)
        .getValue(x => x.token, 'string');

    const showErrorDialog = useShowErrorDialog();

    const { navigate2 } = useNavigation();

    console.log(password);

    const handleSetNewPassword = async () => {
        try {

            if (!validate())
                return;

            await setNewPassword(password, passwordCompare, token);

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

        <ContentPane navbarBg="white">

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

                <TextField
                    style={{ margin: '20px' }}
                    variant="standard"
                    type="password"
                    autoComplete="new-password"
                    error={!!passwordError}
                    helperText={passwordError}
                    onChange={x => setPassword(x.currentTarget.value)}
                    label="Jelszó"></TextField>

                <TextField
                    style={{ margin: '0 20px 20px 20px' }}
                    variant="standard"
                    autoComplete="new-password"
                    type="password"
                    error={!!passwordCompareError}
                    helperText={passwordCompareError}
                    onChange={x => setPasswordCompare(x.currentTarget.value)}
                    label="Jelszó mégegyszer"></TextField>

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