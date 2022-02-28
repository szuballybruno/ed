import { Flex, Image } from "@chakra-ui/react"
import { EpistoFont } from "../../controls/EpistoFont"

export const TempomatModeTile = (props: {
    thumbnailImage: string,
    title: string,
    description: string,
    isSelected?: boolean
}) => {

    return <Flex
        flex="1"
        direction="column"
        p="10px"
        mx="10px"
        maxW="220px"
        align="center">

        <Image
            background={props.isSelected ? "#97c9cc50" : "#efefef"}
            border="none"
            className="roundBorders"
            cursor="pointer"
            transition=".2s ease-in-out"
            boxShadow="-6px -6px 14px rgba(255, 255, 255, .7), -6px -6px 10px rgba(255, 255, 255, .5), 6px 6px 8px rgba(255, 255, 255, .075), 6px 6px 10px rgba(0, 0, 0, .15)"
            _hover={{
                boxShadow: "-2px -2px 6px rgba(255, 255, 255, .6), -2px -2px 4px rgba(255, 255, 255, .4), 2px 2px 2px rgba(255, 255, 255, .05), 2px 2px 4px rgba(0, 0, 0, .1)"
            }}
            _active={{
                boxShadow: "inset -2px -2px 6px rgba(255, 255, 255, .7), inset -2px -2px 4px rgba(255, 255, 255, .5), inset 2px 2px 2px rgba(255, 255, 255, .075), inset 2px 2px 4px rgba(0, 0, 0, .15)"
            }}
            p="10px"
            objectFit="contain"
            src={props.thumbnailImage}
            alt=""
            w="140px"
            h="80px"
        />

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
