import { Image, ImageProps } from "@chakra-ui/image"
import { forwardRef } from "react";

type ProfileImageProps = {
    url: string
} & ImageProps;

export const ProfileImage = forwardRef<HTMLImageElement, ProfileImageProps>((props: ProfileImageProps, ref) => {

    const { url, className, ...css } = props;

    return <Image
        border="2px solid var(--epistoTeal)"
        objectFit="cover"
        className={className + " circle"}
        ref={ref}
        src={url}
        {...css} />
})