import { Image, ImageProps } from "@chakra-ui/image"
import { Flex, FlexProps } from "@chakra-ui/layout";
import { Typography } from "@mui/material";
import { forwardRef, useContext } from "react";
import { CurrentUserContext } from "./HOC/AuthenticationFrame";

type ProfileImageProps = {
} & FlexProps;

export const ProfileImage = forwardRef<HTMLDivElement, ProfileImageProps>((props: ProfileImageProps, ref) => {

    const { className, ...css } = props;
    const user = useContext(CurrentUserContext)!;
    const url = user?.avatarUrl;

    return <Flex
        className={className + " circle"}
        border="2px solid var(--epistoTeal)"
        ref={ref}
        bg="var(--deepBlue)"
        color="white"
        align="center"
        justify="center"
        {...css} >
        {url && <Image
            border="none"
            className="whall"
            objectFit="cover"
            src={url} />}
        {(!url && user) && <Typography>
            {user.firstName.substr(0, 1) + user.lastName.substr(0, 1)}
        </Typography>}
    </Flex>
})