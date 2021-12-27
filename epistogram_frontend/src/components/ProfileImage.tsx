import { Image } from "@chakra-ui/image";
import { Flex, FlexProps } from "@chakra-ui/layout";
import { Typography } from "@mui/material";
import { forwardRef, useContext } from "react";
import { CurrentUserContext } from "./system/AuthenticationFrame";

type ProfileImageProps = {
    url: string | null,
    firstName?: string,
    lastName?: string
} & FlexProps;

export const ProfileImage = forwardRef<HTMLDivElement, ProfileImageProps>((props: ProfileImageProps, ref) => {

    const { className, url, firstName, lastName, ...css } = props;
    const user = useContext(CurrentUserContext)!;
    const signature = (firstName ?? user.firstName).substr(0, 1) + (lastName ?? user.lastName).substr(0, 1);
    const showSingature = (!url && user);
    const showImage = !!url;

    return <Flex
        className={className + " circle"}
        border="2px solid var(--epistoTeal)"
        ref={ref}
        bg="var(--deepBlue)"
        color="white"
        align="center"
        justify="center"
        overflow="hidden"
        {...css} >

        <Image
            border="none"
            className="whall"
            objectFit="cover"
            src={url ?? ""}
            display={showImage ? undefined : "none"} />

        <Typography
            display={showSingature ? undefined : "none"}>

            {signature.toUpperCase()}
        </Typography>
    </Flex>
});
