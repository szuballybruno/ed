import { Image } from "@chakra-ui/image";
import { Flex } from "@chakra-ui/layout";
import { TextField } from "@mui/material";
import { useContext, useState } from "react";
import { applicationRoutes } from "../configuration/applicationRoutes";
import { getAssetUrl, getQueryParam } from "../frontendHelpers";
import { useNavigation } from "../services/navigatior";
import { showNotification, useShowErrorDialog } from "../services/notifications";
import { useRegisterInvitedUser, useRegisterUser } from "../services/openEndpointService";
import { EpistoHeader } from "./administration/universal/EpistoHeader";
import { RefetchUserAsyncContext } from "./HOC/AuthenticationFrame";
import { LoadingFrame } from "./HOC/LoadingFrame";
import { EpistoButton } from "./universal/EpistoButton";

export const RegistrationPage = () => {

    const token = getQueryParam("token");
    const isInvited = getQueryParam("isInvited") === "true";

    // registration
    const [lastName, setLastName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [emailAddress, setEmailAddress] = useState("");

    // invitation
    const [password, setPassword] = useState("");
    const [passwordCompare, setPasswordCompare] = useState("");

    const showErrorDialog = useShowErrorDialog();
    const { navigate } = useNavigation();
    const { registerUserAsync, registerUserState } = useRegisterUser();
    const { registerInvitedUserAsync, registerInvitedUserState } = useRegisterInvitedUser();

    const refetchUser = useContext(RefetchUserAsyncContext);

    const handleRegistration = async () => {

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

            showErrorDialog(e);
        }
    }

    return <Flex height="100vh" direction="column" align="center" justify="center" position="relative">

        <Image
            position="absolute"
            top="0"
            objectFit="cover"
            className="whall"
            src={getAssetUrl("images/abstract_background_1.jpg")} />

        <LoadingFrame
            loadingState={[registerUserState, registerInvitedUserState]}
            direction="column"
            width="100%"
            maxWidth="500px"
            position="relative"
            bg="white"
            padding="30px"
            className="roundBorders"
            boxShadow="#00000024 10px 30px 50px 0px">

            <Image width="50%" marginLeft="10%" src={getAssetUrl("/images/logo.png")} />

            <EpistoHeader
                alignSelf="flex-end"
                color="white"
                marginRight="20%"
                bg="var(--deepBlue)"
                p="5px 25px 5px 25px"
                borderRight="10px solid var(--epistoTeal)"
                text="Regisztracio" />

            {/* registration */}
            {!isInvited && <>
                <TextField
                    variant="standard"
                    label="Keresztnev"
                    value={firstName}
                    onChange={x => setFirstName(x.currentTarget.value)}
                    style={{ margin: "10px" }}></TextField>

                <TextField
                    variant="standard"
                    label="Vezeteknev"
                    value={lastName}
                    onChange={x => setLastName(x.currentTarget.value)}
                    style={{ margin: "10px" }}></TextField>

                <TextField
                    variant="standard"
                    label="Email cim"
                    value={emailAddress}
                    onChange={x => setEmailAddress(x.currentTarget.value)}
                    style={{ margin: "10px" }}></TextField>
            </>}

            {/* invited */}
            {isInvited && <>

                <TextField
                    variant="standard"
                    label="Jelszo"
                    type="password"
                    value={password}
                    onChange={x => setPassword(x.currentTarget.value)}
                    style={{ margin: "10px" }}></TextField>

                <TextField
                    variant="standard"
                    type="password"
                    label="Jelszo megegyszer"
                    value={passwordCompare}
                    onChange={x => setPasswordCompare(x.currentTarget.value)}
                    style={{ margin: "10px" }}></TextField>
            </>}

            <EpistoButton
                onClick={handleRegistration}
                variant="outlined"
                style={{
                    alignSelf: "center",
                    marginTop: "20px"
                }}>

                Ok
            </EpistoButton>
        </LoadingFrame>
    </Flex>
}