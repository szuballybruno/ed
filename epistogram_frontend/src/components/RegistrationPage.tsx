import { Image } from "@chakra-ui/image";
import { Flex } from "@chakra-ui/layout";
import { Checkbox, TextField, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { applicationRoutes } from "../configuration/applicationRoutes";
import { getAssetUrl, getQueryParam, usePasswordEntryState } from "../static/frontendHelpers";
import { useNavigation } from "../services/core/navigatior";
import { showNotification, useShowErrorDialog } from "../services/core/notifications";
import { RefetchUserAsyncContext } from "./system/AuthenticationFrame";
import { LoadingFrame } from "./system/LoadingFrame";
import { EpistoButton } from "./universal/EpistoButton";
import { useRegisterInvitedUser, useRegisterUser } from "../services/api/registrationApiService";

export const RegistrationPage = () => {

    const token = getQueryParam("token");
    const isInvited = getQueryParam("isInvited") === "true";

    const [acceptPrivacyPolicy, setAcceptPrivacyPolicy] = useState(false)

    // registration
    const [lastName, setLastName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [emailAddress, setEmailAddress] = useState("");

    // invitation
    const {
        password,
        passwordCompare,
        passwordCompareError,
        passwordError,
        hasCredentialError,
        setPassword,
        setPasswordCompare,
        validate
    } = usePasswordEntryState();

    const showErrorDialog = useShowErrorDialog("Hiba!");
    const { navigate } = useNavigation();
    const { registerUserAsync, registerUserState } = useRegisterUser();
    const { registerInvitedUserAsync, registerInvitedUserState } = useRegisterInvitedUser();

    const refetchUser = useContext(RefetchUserAsyncContext);

    const handleRegistration = async () => {

        if (!validate())
            return;

        try {

            if (isInvited) {

                await registerInvitedUserAsync(token, password, passwordCompare);
            } else {

                await registerUserAsync(token, emailAddress, firstName, lastName);
            }

            showNotification("Sikeres regisztracio!");
            await refetchUser();
            navigate(applicationRoutes.signupRoute.route);
        }
        catch (e) {

            showErrorDialog("Ismeretlen hiba történt, kérjük próbálkozzon újra!");
        }
    }

    return <Flex
        background="var(--gradientBlueBackground)"
        height="100vh"
        direction="column"
        align="center"
        justify="center"
        position="relative">

        <LoadingFrame
            loadingState={[registerUserState, registerInvitedUserState]}
            direction="column"
            width={500}
            maxWidth="95%"
            position="relative"
            bg="white"
            padding="30px"
            alignItems="center"
            justifyContent={"center"}
            className="roundBorders"
            boxShadow="#00000024 10px 30px 50px 0px">


            <Flex w={"100%"} maxH={50} my="25px" justifyContent={"center"}>
                <Image width="50%" src={getAssetUrl("/images/logo.svg")} />
            </Flex>

            <Typography>Tanulási stílust felmérő kérdőív</Typography>

            {/* registration */}
            {!isInvited && <>
                <TextField
                    variant="standard"
                    label="Keresztnév"
                    value={firstName}
                    onChange={x => setFirstName(x.currentTarget.value)}
                    style={{ margin: "10px" }}></TextField>

                <TextField
                    variant="standard"
                    label="Vezetéknév"
                    value={lastName}
                    onChange={x => setLastName(x.currentTarget.value)}
                    style={{ margin: "10px" }}></TextField>

                <TextField
                    variant="standard"
                    label="E-mail cím"
                    value={emailAddress}
                    onChange={x => setEmailAddress(x.currentTarget.value)}
                    style={{ margin: "10px" }}></TextField>
            </>}

            {/* invited */}
            {isInvited && <>

                <TextField
                    variant="standard"
                    label="Jelszó"
                    type="password"
                    value={password}
                    error={!!passwordError}
                    helperText={passwordError}
                    onChange={x => {
                        setPassword(x.currentTarget.value);
                    }}
                    style={{ margin: "10px" }}></TextField>

                <TextField
                    variant="standard"
                    type="password"
                    label="Jelszó mégegyszer"
                    value={passwordCompare}
                    error={!!passwordCompareError}
                    helperText={passwordCompareError}
                    onChange={x => {
                        setPasswordCompare(x.currentTarget.value);
                    }}
                    style={{ margin: "10px" }}>

                </TextField>
            </>}

            <Flex direction={"row"} alignItems={"center"}>

                <Checkbox
                    checked={acceptPrivacyPolicy}
                    value={acceptPrivacyPolicy}
                    onClick={() => setAcceptPrivacyPolicy(p => !p)} />

                <Typography
                    style={{
                        userSelect: "none"
                    }}>

                    {"Elfogadom az "}
                    <a
                        target="_blank"
                        rel="noreferrer"
                        style={{ color: "#0055CC" }}
                        href={"https://epistogram.com/adatkezelesi-tajekoztato"}>
                        Adatkezelési Nyilatkozat
                    </a>
                    {"ban foglaltakat"}
                </Typography>
            </Flex>


            <EpistoButton
                onClick={handleRegistration}
                variant="outlined"
                isDisabled={!acceptPrivacyPolicy || (isInvited && hasCredentialError)}
                style={{
                    width: "200px",
                    alignSelf: "center",
                    marginTop: "20px"
                }}>

                Kezdhetjük
            </EpistoButton>
        </LoadingFrame>
    </Flex>
}
