import { Box, Text } from "@chakra-ui/react";
import { Button, TextField } from "@material-ui/core";
import { useRef } from "react";
import { useRenewUserSessionPooling, useUserFetching } from "../services/authentication";
import { httpPost } from "../services/httpClient";

const RegistrationPage = () => {

    console.log("Rendering registration page...");

    const emailRef = useRef<HTMLInputElement>();
    const passwordRef = useRef<HTMLInputElement>();

    const { currentUser, refetchUser } = useUserFetching();

    useRenewUserSessionPooling();

    const register = async () => {

        const result = await httpPost("register-user", {
            email: emailRef.current?.value,
            password: passwordRef.current?.value
        });

        if (result.status == 200)
            refetchUser();
    }

    return (

        <Box>
            <Text>{`Logged in user: ${currentUser?.email}`}</Text>

            <TextField label="Email" inputRef={emailRef}></TextField>
            <TextField label="Password" type="password" inputRef={passwordRef}></TextField>

            <Button onClick={() => register()}>Register!</Button>
        </Box>
    )
}

export default RegistrationPage;