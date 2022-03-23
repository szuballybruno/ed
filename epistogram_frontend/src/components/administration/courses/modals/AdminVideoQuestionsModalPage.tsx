import { Flex, Tooltip } from "@chakra-ui/react"
import { Add, Remove, Timer } from "@mui/icons-material"
import { Checkbox } from "@mui/material"
import { useState } from "react"
import ReactPlayer from "react-player"
import { iterate } from "../../../../static/frontendHelpers"
import { EpistoButton } from "../../../controls/EpistoButton"
import { EpistoEntry } from "../../../controls/EpistoEntry"
import { EpistoFont } from "../../../controls/EpistoFont"


export const AdminVideoQuestionsModalPage = () => {

    const ValueLabelComponent = (props) => {
        const { children, value } = props;

        return (
            <Tooltip
                className="roundBorders"
                hasArrow
                padding="10px"
                label={value}
                placement="top"
                zIndex="9999"
                h="100px"
                w="200px">

                {children}
            </Tooltip >
        );
    }

    const AddQuestionWithAnswersComponent = (props: {
        isFirst?: boolean
    }) => {
        const { isFirst } = props
        return <Flex
            p="10px"
            h="330px"
            flex="1"
            mt={isFirst ? "0" : "100px"}
            direction="column"
            background="var(--transparentIntenseBlue10)"
            className="roundBorders">

            <Flex align="center" justify="space-between" mt="15px">
                <EpistoFont
                    isUppercase
                    fontSize="fontExtraSmall"
                    style={{
                        letterSpacing: "1.2px"
                    }}>
                    Kérdések
                </EpistoFont>
                <Flex>
                    <Timer />
                </Flex>
            </Flex>

            <Flex align="center">

                <EpistoEntry
                    flex="8"
                    labelVariant="hidden"
                    label="Válaszok" />

                <EpistoEntry
                    flex="1"
                    value="2:43"
                    style={{
                        fontWeight: "bold",
                        marginLeft: 10
                    }}
                    labelVariant="hidden"
                    label="Válaszok" />

            </Flex>


            <Flex align="center" justify="space-between" mt="15px">
                <EpistoFont
                    isUppercase
                    fontSize="fontExtraSmall"
                    style={{
                        letterSpacing: "1.2px"
                    }}>
                    Válaszok
                </EpistoFont>
                <Flex>
                    <Add />
                    <Remove />
                </Flex>
            </Flex>
            {iterate(4, () => <Flex align="center">

                <EpistoEntry flex="1" labelVariant="hidden" label="Válaszok" />
                <Flex
                    mt="10px"
                    ml="5px"
                    className="roundBorders"
                    background="var(--transparentWhite70)"
                    align="center"
                    justify="center">

                    <Checkbox
                        sx={{
                            ".MuiSvgIcon-root": {
                                width: 22,
                                height: 22
                            }
                        }}
                        style={{
                            //color: "var(--transparentIntenseBlue85)"
                        }} />
                </Flex>

            </Flex>)}
        </Flex>


    }
    const [playedSeconds, setPlayedSeconds] = useState(0);

    return <Flex
        direction="row"
        height="auto"
        p="20px">

        <Flex
            align="flex-start"
            m="0 5px 30px 0"
            position="sticky"
            maxH="400px"
            top="115"
            flex="1">

            <Flex className="mildShadow" >
                <ReactPlayer
                    width="100%"
                    height="calc(56.25 / 100)"
                    onProgress={x => setPlayedSeconds(x.playedSeconds)}
                    progressInterval={100}
                    style={{
                        borderRadius: 7,
                        background: "green",
                        overflow: "hidden"
                    }}
                    url={"https://storage.googleapis.com/epistogram_bucket_prod/videos/video_247_1642259265423.mp4"} />
            </Flex>

        </Flex>
        <Flex
            direction="column"
            flex="1"
            mt="5px"
            p="0 20px 100px 20px">

            <AddQuestionWithAnswersComponent isFirst />
            <AddQuestionWithAnswersComponent />
            <AddQuestionWithAnswersComponent />

            <EpistoButton
                variant="outlined"
                style={{
                    margin: "10px 0",
                    borderColor: "var(--epistoTeal)",
                    color: "var(--epistoTeal)"
                }}>

                <Add />
            </EpistoButton>
        </Flex>

        <EpistoButton
            variant="colored"
            style={{
                position: "absolute",
                bottom: 20,
                width: "calc(100% - 40px)"
            }}>

            Mentés
        </EpistoButton>
    </Flex >
}
