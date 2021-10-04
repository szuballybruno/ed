import { Box, Flex } from "@chakra-ui/layout";
import { Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from 'react';
import { applicationRoutes } from "../../configuration/applicationRoutes";
import { TypedError } from "../../frontendHelpers";
import { useLogInUser } from '../../services/authenticationService';
import { useNavigation } from "../../services/navigatior";
import { useShowErrorDialog } from "../../services/notifications";
import SingleInput from "../administration/universal/singleInput/SingleInput";
import { AuthenticationStateContext, RefetchUserFunctionContext } from "../HOC/AuthenticationFrame";
import { EpistoButton } from "../universal/EpistoButton";
import classes from './loginScreen.module.scss';

const LoginScreen = (props: { history: any; }): JSX.Element => {

    console.warn("[LoginScreen] Started...")
    const { loginUserAsync, loginUserError, loginUserState } = useLogInUser();
    const [errorMessage, setErrorMessage] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { navigate } = useNavigation();
    const showErrorDialog = useShowErrorDialog();
    const authState = useContext(AuthenticationStateContext);
    const refetchUser = useContext(RefetchUserFunctionContext);

    const handleLoginUserAsync = async () => {

        await loginUserAsync(email, password);
        refetchUser();
    };

    // watch for auth state change
    // and navigate to home page if athenticated
    useEffect(() => {

        if (authState === "authenticated")
            navigate(applicationRoutes.homeRoute.route);
    }, [authState]);

    // watch for login call errors 
    useEffect(() => {

        if (!loginUserError)
            return;

        if (loginUserError.errorType === "bad request") {

            setErrorMessage("Hibas adatok!");
        }
        else if (loginUserError.errorType) {

            showErrorDialog(loginUserError.message);
        }
        else {

            showErrorDialog("" + loginUserError);
        }
    }, [loginUserError]);

    return (
        <div className={classes.loginhatter}>

            <Flex direction="column" maxWidth="400px">

                <Flex direction="column">
                    <h1 className={classes.loginfocim}>Örülünk, hogy ismét itt vagy velünk!</h1>
                    <h1 className={classes.loginalcim}>Jelentkezz be, és már kezdhetsz is.</h1>
                </Flex>

                <Box>
                    <SingleInput
                        id="email"
                        labelText={"E-mail"}
                        name={"currentEmail"}
                        changeHandler={(e) => setEmail(e.target.value)}
                        style={{ justifySelf: "center" }} />

                    <SingleInput
                        id="password"
                        labelText={"Jelszó"}
                        name={"currentPassword"}
                        type={"password"}
                        changeHandler={(x) => setPassword(x.target.value)}
                        style={{ justifySelf: "center" }} />

                    <p className={classes.forgotPassword}>
                        Elfelejtettem a jelszavam
                    </p>

                    <Typography style={{ color: "var(--mildRed)" }}>
                        {errorMessage}
                    </Typography>
                </Box>

                <EpistoButton variant="colored" padding="15px" onClick={handleLoginUserAsync}>
                    Bejelentkezés
                </EpistoButton>
            </Flex>

            <div className={classes.regisztracio}>
                <h3>Még nem regisztráltál?</h3>
                <h3>Itt az ideje!</h3>
            </div>
        </div >
    )
};

export default LoginScreen
