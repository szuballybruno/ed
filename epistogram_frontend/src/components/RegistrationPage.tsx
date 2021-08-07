import { Box, Flex, Text } from "@chakra-ui/react";
import { Button, TextField } from "@material-ui/core";
import { useRef } from "react";
import { logOutUserAsync, registerUser, useRenewUserSessionPooling, useUserFetching } from "../services/authentication";
import { httpPostAsync } from "../services/httpClient";

const RegistrationPage = () => {

    console.log("Rendering registration page...");

    const emailRef = useRef<HTMLInputElement>();
    const passwordRef = useRef<HTMLInputElement>();

    const { currentUser, refetchUser } = useUserFetching();

    useRenewUserSessionPooling();

    const register = async () => {

        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;

        if (!email || !password)
            throw new Error("Invalid credentials!");

        await registerUser(email as string, password as string);
        refetchUser();
    }

    const logout = async () => {

        await logOutUserAsync();
        refetchUser();
    }

    return (

        <Flex direction="column" p="50px">
            <Text>{`Logged in user: ${currentUser?.email}`}</Text>

            <TextField label="Email" inputRef={emailRef}></TextField>
            <TextField label="Password" type="password" inputRef={passwordRef}></TextField>

            <Button onClick={() => register()}>Register!</Button>
            <Button onClick={() => register()}>Log in!</Button>
            <Button onClick={() => logout()}>Log out!</Button>
        </Flex>
    )
}

export default RegistrationPage;