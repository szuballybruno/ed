import { Box, Text } from "@chakra-ui/react";
import { Button, TextField } from "@material-ui/core";
import { useRef } from "react";
import { httpGet, httpPost } from "../services/httpClient";
import { useQuery } from 'react-query';

const RegistrationPage = () => {

    const emailRef = useRef<HTMLInputElement>();
    const passwordRef = useRef<HTMLInputElement>();

    const { isLoading, error, data, refetch } = useQuery('getCurrentUser', () => httpGet("get-current-user"), { retry: false })
    const currentUser = data?.data;

    const loggedInUser = isLoading ? "loading..." : currentUser.email;

    const register = async () => {

        const result = await httpPost("register-user", {
            email: emailRef.current?.value,
            password: passwordRef.current?.value
        });

        if (result.status == 200)
            refetch();
    }

    return (

        <Box>
            <Text>{`Logged in user: ${loggedInUser}`}</Text>

            <TextField label="Email" inputRef={emailRef}></TextField>
            <TextField label="Password" type="password" inputRef={passwordRef}></TextField>

            <Button onClick={() => register()}>Register!</Button>
        </Box>
    )
}

export default RegistrationPage;