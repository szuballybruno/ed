import { Image, ImageProps } from "@chakra-ui/image"
import { Flex, FlexProps } from "@chakra-ui/layout";
import { Typography } from "@mui/material";
import { forwardRef, useContext } from "react";
import { CurrentUserContext } from "./HOC/AuthenticationFrame";

type ProfileImageProps = {
    url: string | null,
    firstName?: string,
    lastName?: string
} & FlexProps;

export const ProfileImage = forwardRef<HTMLDivElement, ProfileImageProps>((props: ProfileImageProps, ref) => {

    const { className, url, firstName, lastName, ...css } = props;
    const user = useContext(CurrentUserContext)!;
    const signature = (lastName ?? user.lastName).substr(0, 1) + (firstName ?? user.firstName).substr(0, 1);

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
        {url && <Image
            border="none"
            className="whall"
            objectFit="cover"
            src={url} />}
        {(!url && user) && <Typography>
            {signature.toUpperCase()}
        </Typography>}
    </Flex>
})
