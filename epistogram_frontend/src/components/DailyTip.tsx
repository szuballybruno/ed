import { Box, Flex, FlexProps } from "@chakra-ui/layout"
import { ArrowBack, ArrowForward, FiberManualRecord, MoreHoriz, ThreeDRotation } from "@mui/icons-material"
import { LinearProgress, Typography } from "@mui/material"
import ReactPlayer from "react-player"
import { useDailyTip } from "../services/api/dailyTipApiService"
import { getAssetUrl, usePaging } from "../static/frontendHelpers"
import { translatableTexts } from "../static/translatableTexts"
import { EpistoFont } from "./controls/EpistoFont"
import { EpistoText } from "./controls/EpistoText"
import { EpistoDialog, useEpistoDialogLogic } from "./EpistoDialog"
import { SlidesDisplay } from "./universal/SlidesDisplay"

// const ModalPlayer = (props: {
//     videoUrl: string
// }) => {

//     return <ReactPlayer
//         width="100%"
//         height="100%"
//         style={{
//             margin: "auto"
//         }}
//         playing={true}
//         controls={true}
//         url={props.videoUrl} />
// }

export const DailyTip = (props: {} & FlexProps) => {

    const { ...css } = props;
    // const { currentIndex, next, previous } = usePaging([1, 2]);

    // const dialogLogic = useEpistoDialogLogic({
    //     title: translatableTexts.homePage.tipOfTheDay,
    //     defaultCloseButtonType: "top"
    // });

    const { dailyTipData } = useDailyTip();

    // const openDialog = () => dialogLogic.openDialog();

    // const DescriptionSlide = () => <EpistoFont classes={["fontMidPlus", "fontGrey"]}>
    //     {dailyTipData?.description}
    // </EpistoFont>;

    // const VideoSlide = () => <ModalPlayer videoUrl={dailyTipData?.videoUrl ?? ""}></ModalPlayer>

    // const toggleDisplayModes = () => {

    //     if (currentIndex === 0) {

    //         next();
    //     }
    //     else {

    //         previous();
    //     }
    // }

    return <Flex
        direction="column"
        height="100%"
        justify="center"
        {...css}>

        {/* Home page tempomat design */}
        <Flex align="center">
            <Flex
                flex="3"
                direction="column">

                <Flex
                    flex="2"
                    direction="column">

                    {/* Daily recommended videos count */}
                    <Flex
                        align="center"
                        p="0 15px">

                        <EpistoFont fontSize="fontSmall">

                            Napi ajánlott videók
                        </EpistoFont>
                    </Flex>
                    <Flex
                        align="center"
                        p="5px 15px">

                        <img
                            src={getAssetUrl("/images/videos3D.png")}
                            alt=""
                            style={{
                                height: "25px",
                                width: "25px",
                                marginRight: 5
                            }} />

                        <Flex h="100%" align="flex-end">

                            <EpistoFont
                                fontSize={"fontLargePlus"}
                                style={{
                                    fontWeight: 500,
                                    marginRight: 2
                                }}>

                                8/13
                            </EpistoFont>

                            <EpistoFont
                                fontSize="fontSmall"
                                style={{
                                    marginBottom: 2
                                }}>

                                videó
                            </EpistoFont>
                        </Flex>
                    </Flex>

                    <Flex w="100%" px="15px">

                        <LinearProgress
                            value={60}
                            variant="determinate"
                            style={{
                                width: "100%",
                                height: "5px"
                            }} />
                    </Flex>
                </Flex>

                {/* Weekly recommended videos count */}
                <Flex
                    flex="2"
                    direction="column">

                    <Flex
                        align="center"
                        mt="15px"
                        p="0 15px">

                        <EpistoFont fontSize="fontSmall">

                            Heti ajánlott videók
                        </EpistoFont>
                    </Flex>
                    <Flex
                        align="center"
                        p="5px 15px">

                        <img
                            src={getAssetUrl("/images/videos3D.png")}
                            alt=""
                            style={{
                                height: "25px",
                                width: "25px",
                                marginRight: 5
                            }} />

                        <Flex h="100%" align="flex-end">

                            <EpistoFont
                                fontSize={"fontLargePlus"}
                                style={{
                                    fontWeight: 500,
                                    marginRight: 2
                                }}>

                                8/13
                            </EpistoFont>

                            <EpistoFont
                                fontSize="fontSmall"
                                style={{
                                    marginBottom: 2
                                }}>

                                videó
                            </EpistoFont>
                        </Flex>
                    </Flex>

                    <Flex w="100%" px="15px">

                        <LinearProgress
                            value={60}
                            variant="determinate"
                            style={{
                                width: "100%",
                                height: "5px"
                            }} />
                    </Flex>
                </Flex>
            </Flex>

            {/* Current course image */}
            <Flex flex="4" p="20px">
                <img
                    src={getAssetUrl("/courseCoverImages/4.png")}
                    alt=""
                    className="roundBorders"
                    style={{

                    }} />
            </Flex>
        </Flex>
        <Flex
            h="30px"
            align="center"
            justify="center">

            <ArrowBack />
            <FiberManualRecord style={{
                width: "10px",
                height: "8px"
            }} />
            <FiberManualRecord style={{
                color: "grey",
                width: "10px",
                height: "8px"
            }} />
            <FiberManualRecord style={{
                color: "grey",
                width: "10px",
                height: "8px"
            }} />
            <ArrowForward />
        </Flex>

        {/* dialog */}
        {/* <EpistoDialog logic={dialogLogic} fullScreenX={true}>
            <Flex direction="column" align="center">
                <Flex
                    id="customContentRoot"
                    position={"relative"}
                    height="calc(min(min(80vw, 1400px), 140vh) * 0.5625)"
                    cursor="pointer"
                    width="min(min(80vw, 1400px), 140vh)"
                    align="center"
                    justify="center"
                    margin="auto">

                    <SlidesDisplay
                        alwaysRender
                        index={currentIndex}
                        slides={[
                            VideoSlide,
                            DescriptionSlide,
                        ]} />
                </Flex>
            </Flex>
        </EpistoDialog > */}

        {/* text daily tip */}
        <Flex
            direction="column"
            align="center"
            justify="flex-start"
            flex="1"
            p="10px"
            fontSize="13px">

            {/* <img
                src={getAssetUrl("images/dailytip3D.png")}
                alt=""
                style={{
                    maxWidth: 200
                }} /> */}

            <EpistoFont>
                {dailyTipData?.description}
            </EpistoFont>
        </Flex>

        {/* preview (disabled temporarily) */}
        {/* <Box position={"relative"} onClick={openDialog} cursor="pointer">
            <Flex
                top="0"
                position="absolute"
                align="center"
                justify="center"
                className="whall">
                <Box
                    className="square70 circle"
                    padding="10px"
                    background="#0000004f"
                    boxShadow="0 0 20px 16px #0000004f">
                    <img
                        style={{
                            transform: "translateX(5px)",
                            filter: "brightness(2)"
                        }}
                        alt=""
                        src={getAssetUrl("/icons/play2.svg")} />
                </Box>
            </Flex>
            <ReactPlayer
                width="100%"
                height="100%"
                style={{
                    margin: "auto"
                }}
                playing={false}
                url={dailyTipData?.videoUrl} />
        </Box> */}
    </Flex >
}
