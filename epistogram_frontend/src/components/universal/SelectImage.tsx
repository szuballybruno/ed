import { Box, BoxProps, Flex } from "@chakra-ui/layout"
import { Typography } from "@mui/material"
import { useState } from "react";
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';

export const SelectImage = (props: {
    onClick: () => void
} & BoxProps) => {

    const [isHovered, setIsHovered] = useState(false);
    const { children, onClick, ...css } = props;

    return <Box
        position="relative"
        overflow="hidden"
        cursor="pointer"
        onClick={() => onClick()}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...css}>

        {children}

        <Flex
            position="absolute"
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

            <Typography>
                Új kép feltöltése
            </Typography>

            <PhotoCameraIcon className="square40"></PhotoCameraIcon>
        </Flex>
    </Box>
}