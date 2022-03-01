import { Flex, Image } from "@chakra-ui/react"
import { ClassBuilder } from "../../../helpers/classBuilder";
import { EpistoFont } from "../../controls/EpistoFont"

export const TempomatModeTile = (props: {
    thumbnailImage: string,
    title: string,
    description: string,
    isSelected: boolean,
    onClick: () => void
}) => {

    const { isSelected, onClick } = props;

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

        <Image
            background={props.isSelected ? "#97c9cc50" : "#efefef"}
            border="none"
            className="roundBorders"
            p="10px"
            objectFit="contain"
            src={props.thumbnailImage}
            alt=""
            w="140px"
            h="80px" />

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
