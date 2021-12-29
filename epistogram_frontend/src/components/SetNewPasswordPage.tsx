import { Image } from "@chakra-ui/react";
import { TextField } from "@mui/material";
import { applicationRoutes } from "../configuration/applicationRoutes";
import { useSetNewPassword } from "../services/api/passwordChangeApiService";
import { useNavigation } from "../services/core/navigatior";
import { showNotification, useShowErrorDialog } from "../services/core/notifications";
import { getAssetUrl, getQueryParam, usePasswordEntryState } from "../static/frontendHelpers";
import { EpistoHeader } from "./EpistoHeader";
import Navbar from "./navbar/Navbar";
import { LoadingFrame } from "./system/LoadingFrame";
import { ContentWrapper, MainWrapper } from "./system/MainPanels";
import { EpistoButton } from "./universal/EpistoButton";

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

    const token = getQueryParam("token");

    const showErrorDialog = useShowErrorDialog();

    const { navigate } = useNavigation();

    const handleSetNewPassword = async () => {

        if (!validate())
            return;

        if (!token) {

            showErrorDialog("Helytelen url cim. Nincs token megadva. Probald ujra egy masik linkel.");
            return;
        }

        try {

            await setNewPassword(password, passwordCompare, token);

            showNotification("Új jelszó sikeresen beállítva!");
            navigate(applicationRoutes.homeRoute.route);

        }
        catch (e) {

            showErrorDialog(e);
        }
    }

    return <MainWrapper>

        <Navbar></Navbar>

        <ContentWrapper align="flex-start" justify="center" bg="var(--whiteGrey)" position="relative">

            <Image
                position="absolute"
                top="0"
                objectFit="cover"
                className="whall"
                src={getAssetUrl("loginScreen/surveybg.png")} />

            <LoadingFrame
                direction="column"
                mt="20vh"
                position="relative"
                className="roundBorders"
                bg="white"
                p="30px"
                loadingState={setNewPasswordState}
                minWidth="400px">

                <EpistoHeader text="Új jelszó megadása" mt="30px" alignSelf="center">

                </EpistoHeader>

                <TextField
                    style={{ margin: "20px" }}
                    variant="standard"
                    type="password"
                    error={!!passwordError}
                    helperText={passwordError}
                    onChange={x => setPassword(x.currentTarget.value)}
                    label="Jelszó"></TextField>

                <TextField
                    style={{ margin: "0 20px 20px 20px" }}
                    variant="standard"
                    type="password"
                    error={!!passwordCompareError}
                    helperText={passwordCompareError}
                    onChange={x => setPasswordCompare(x.currentTarget.value)}
                    label="Jelszó mégegyszer"></TextField>

                <EpistoButton
                    variant="outlined"
                    onClick={handleSetNewPassword}
                    style={{ alignSelf: "flex-end", margin: "20px" }}>

                    Elküldés
                </EpistoButton>
            </LoadingFrame>
        </ContentWrapper>
    </MainWrapper>
}