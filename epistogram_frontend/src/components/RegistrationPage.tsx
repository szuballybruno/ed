import { Image } from "@chakra-ui/image";
import { Flex } from "@chakra-ui/layout";
import {Checkbox, TextField, Typography} from "@mui/material";
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

    const [acceptPrivacyPolicy, setAcceptPrivacyPolicy] = useState(false)

    // registration
    const [lastName, setLastName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [emailAddress, setEmailAddress] = useState("");

    // invitation
    const [password, setPassword] = useState("");
    const [passwordCompare, setPasswordCompare] = useState("");

    const showErrorDialog = useShowErrorDialog("Hiba!");
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

            showErrorDialog("Ismeretlen hiba történt, kérjük próbálkozzon újra!");
        }
    }

    return <Flex height="100vh" direction="column" align="center" justify="center" position="relative">

        <Image
            position="absolute"
            top="0"
            objectFit="cover"
            className="whall"
            src={getAssetUrl("loginScreen/surveybg.png")} />

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


            <Flex w={"100%"} maxH={100} justifyContent={"center"}>
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
                    onChange={x => setPassword(x.currentTarget.value)}
                    style={{ margin: "10px" }}></TextField>

                <TextField
                    variant="standard"
                    type="password"
                    label="Jelszó mégegyszer"
                    value={passwordCompare}
                    onChange={x => setPasswordCompare(x.currentTarget.value)}
                    style={{ margin: "10px" }}>

                </TextField>
            </>}

            <Flex direction={"row"} alignItems={"center"}>
                <Checkbox checked={acceptPrivacyPolicy} value={acceptPrivacyPolicy} onClick={() => {setAcceptPrivacyPolicy(p => !p)}} />
                <Typography style={{userSelect: "none"}}>Elfogadom az <a style={{color: "#0055CC"}} onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                }} href={"https://epistogram.com/adatkezelesi-tajekoztato"}>adatkezelési nyilatkozat</a>ban foglaltakat</Typography>
            </Flex>


            <EpistoButton
                onClick={handleRegistration}
                variant="outlined"
                isDisabled={!acceptPrivacyPolicy}
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
