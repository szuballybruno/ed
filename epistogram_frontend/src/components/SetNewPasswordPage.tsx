import { Image } from "@chakra-ui/react";
import { TextField } from "@mui/material";
import { useState } from "react";
import { applicationRoutes } from "../configuration/applicationRoutes";
import { getAssetUrl, getQueryParam } from "../static/frontendHelpers";
import { useSetNewPassword } from "../services/dataService";
import { useNavigation } from "../services/core/navigatior";
import { showNotification, useShowErrorDialog } from "../services/core/notifications";
import { EpistoHeader } from "./EpistoHeader";
import { LoadingFrame } from "./system/LoadingFrame";
import { ContentWrapper, MainWrapper } from "./system/MainPanels";
import Navbar from "./navbar/Navbar";
import { EpistoButton } from "./universal/EpistoButton";

export const SetNewPasswordPage = () => {

    const { setNewPassword, setNewPasswordState } = useSetNewPassword();

    const [password, setPassword] = useState("");
    const [passwordCompare, setPasswordCompare] = useState("");
    const token = getQueryParam("token");

    const showErrorDialog = useShowErrorDialog();

    const { navigate } = useNavigation();

    const handleSetNewPassword = async () => {

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
                src={getAssetUrl("images/abstract_background_1.jpg")} />

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
                    onChange={x => setPassword(x.currentTarget.value)}
                    label="Jelszó"></TextField>

                <TextField
                    style={{ margin: "0 20px 20px 20px" }}
                    variant="standard"
                    type="password"
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