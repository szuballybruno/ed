import { Flex, Text } from "@chakra-ui/react";
import { Button, TextField } from "@material-ui/core";
import { useContext, useRef } from "react";
import { CurrentUserContext, RefetchUserFunctionContext } from "../HOC/data_manager_frame/DataManagerFrame";
import { logOutUserAsync, registerUser } from "../services/authentication";

const RegistrationPage = () => {

    console.log("Rendering registration page...");

    const emailRef = useRef<HTMLInputElement>();
    const passwordRef = useRef<HTMLInputElement>();
    const userInfo = useContext(CurrentUserContext);
    const refetchUser = useContext(RefetchUserFunctionContext);

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
            <Text>{`Logged in user: ${userInfo?.email}`}</Text>

            <TextField label="Email" inputRef={emailRef}></TextField>
            <TextField label="Password" type="password" inputRef={passwordRef}></TextField>

            <Button onClick={() => register()}>Register!</Button>
            <Button onClick={() => register()}>Log in!</Button>
            <Button onClick={() => logout()}>Log out!</Button>
        </Flex>
    )
}

export default RegistrationPage;