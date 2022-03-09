import { Flex, Image } from "@chakra-ui/react"
import { height } from "@mui/system";
import { ReactNode } from "react";
import { ClassBuilder } from "../../../helpers/classBuilder";
import { TempomatModeType } from "../../../shared/types/sharedTypes";
import { EpistoFont } from "../../controls/EpistoFont"
import { TempomatModeImage } from "./TempomatModeImage";

export const TempomatModeTile = (props: {
    title: string,
    description: string,
    isSelected: boolean,
    onClick: () => void,
    tempomatMode: TempomatModeType
}) => {

    const { isSelected, tempomatMode, onClick } = props;

    return <Flex
        flex="1"
        direction="column"
        p="10px"
        mx="10px"
        maxW="220px"
        align="center"
        cursor="pointer"
        className="shadowOnHover"
        //bg={isSelected ? "var(--deepBlue)" : undefined}
        onClick={onClick}>

        <TempomatModeImage
            isSelected={isSelected}
            mode={tempomatMode}
            customizeFn={builder => builder
                .custom("roundBorders")} />

        <EpistoFont
            fontSize="fontSmall"
            style={{
                margin: "15px 0 0 0",
                width: "100%",
                textAlign: "center",
                fontWeight: 600
            }}>

            {props.title}
        </EpistoFont>

        <EpistoFont
            fontSize="fontSmall"
            style={{
                textAlign: "justify",
                margin: "5px 0 0 0",
            }}>

            {props.description}
        </EpistoFont>
    </Flex >
}
