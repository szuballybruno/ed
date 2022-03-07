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
        padding="15px"
        margin="5px"
        borderRadius="5px"
        cursor="pointer"
        className="shadowOnHover"
        bg={isSelected ? "var(--deepBlue)" : undefined}
        onClick={onClick}
        align="center" >

        <TempomatModeImage
            style={{
                background: isSelected
                    ? "#97c9cc50"
                    : "#efefef",
                padding: "10px",
                objectFit: "contain",
                width: "140px",
                height: "80px"
            }}
            mode={tempomatMode}
            customizeFn={builder => builder
                .custom("roundBorders")} />

        <EpistoFont
            fontSize="fontSmall"
            className={new ClassBuilder()
                .if(isSelected, x => x
                    .custom("fontLight"))
                .build()}
            style={{
                margin: "15px 0 0 0",
                width: "100%",
                textAlign: "center",
                fontWeight: 600
            }}>

            {props.title}
        </EpistoFont>

        <EpistoFont
            className={new ClassBuilder()
                .if(isSelected, x => x
                    .custom("fontLight"))
                .build()}
            fontSize="fontSmall"
            style={{
                textAlign: "justify",
                margin: "5px 0 0 0",
            }}>

            {props.description}
        </EpistoFont>
    </Flex >
}
