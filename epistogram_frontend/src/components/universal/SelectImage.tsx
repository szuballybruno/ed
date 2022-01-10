import { Box, BoxProps, Flex } from "@chakra-ui/layout"
import { Typography } from "@mui/material"
import { useRef, useState } from "react";
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { HiddenFileUploadInput } from "./HiddenFileUploadInput";
import { Edit } from "@mui/icons-material";

export const SelectImage = (props: {
    setImageSource: (src: string) => void,
    setImageFile: (file: File) => void,
    isInteractionBlocked?: boolean
} & BoxProps) => {

    const [isHovered, setIsHovered] = useState(false);
    const { children, setImageFile, setImageSource, isInteractionBlocked, ...css } = props;
    const fileBrowseInputRef = useRef<HTMLInputElement>(null);

    return <Box
        position="relative"
        overflow="hidden"
        cursor="pointer"
        pointerEvents={isInteractionBlocked ? "none" : undefined}
        onClick={() => fileBrowseInputRef?.current?.click()}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...css}>

        {/* hidden input */}
        <HiddenFileUploadInput
            ref={fileBrowseInputRef}
            type="image"
            onFileSelected={(file, src) => {
                setImageSource(src);
                setImageFile(file);
            }} />

        {children}

        <Flex
            position="absolute"
            display={isInteractionBlocked ? "none" : undefined}
            className="whall"
            height="55%"
            transition="0.4s"
            top={0}
            bg="#ffffffcc"
            direction="column"
            align="center"
            justify="center"
            transform={isHovered ? "translateY(100%)" : "translateY(125%)"}
            opacity={isHovered ? 1 : 0}>

            <Edit />
        </Flex>
    </Box>
}