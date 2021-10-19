import { Box, Flex, FlexProps } from "@chakra-ui/layout"
import { Typography } from "@mui/material"
import { m } from "framer-motion"
import { useEffect, useRef } from "react"
import { getAssetUrl, usePaging } from "../frontendHelpers"
import { tipOfTheDay } from "../services/dataService"
import { translatableTexts } from "../translatableTexts"
import { EpistoDialog, useEpistoDialogLogic } from "./EpistoDialog"
import { EpistoButton } from "./universal/EpistoButton"
import { SlidesDisplay } from "./universal/SlidesDisplay"

export const TipOfTheDay = (props: {} & FlexProps) => {

    const { ...css } = props;
    const { currentIndex, next, previous } = usePaging([1, 2]);

    const dialogLogic = useEpistoDialogLogic({
        title: "Napi tipped",
    });

    const openDialog = () => dialogLogic.openDialog();

    const DescriptionSlide = () => <Typography variant={"h6"} fontSize="16px">
        {tipOfTheDay}
    </Typography>;

    const VideoSlide = () => <Box position={"relative"} onClick={openDialog} cursor="pointer">
        <Flex top="0" position="absolute" align="center" justify="center" className="whall">
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
                    src={getAssetUrl("/icons/play2.svg")} />
            </Box>
        </Flex>
        <img
            width="100%"
            src={getAssetUrl("/images/tipoftheday.jpg")}
            style={{
                borderRadius: "15px"
            }}>
        </img>
    </Box>

    const toggleDisplayModes = () => {

        if (currentIndex === 0) {

            next();
        }
        else {

            previous();
        }
    }

    return <Flex direction="column" justify="center" {...css}>

        <EpistoDialog logic={dialogLogic} fullScreenX={true} showCloseButton={true}>
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
                            DescriptionSlide
                        ]} />
                </Flex>

                <Flex>
                    <EpistoButton variant="outlined" style={{ margin: "10px" }}>
                        {translatableTexts.tipOfTheDay.prevoiusVideos}
                    </EpistoButton>

                    <EpistoButton variant="outlined" style={{ margin: "10px" }} onClick={toggleDisplayModes}>
                        {translatableTexts.tipOfTheDay.description}
                    </EpistoButton>
                </Flex>
            </Flex>
        </EpistoDialog >

        <SlidesDisplay
            alwaysRender
            index={currentIndex}
            slides={[
                VideoSlide,
                DescriptionSlide
            ]} />

        <EpistoButton
            style={{ alignSelf: "center" }}
            variant="outlined"
            onClick={toggleDisplayModes}>
            {currentIndex === 0
                ? translatableTexts.tipOfTheDay.description
                : translatableTexts.tipOfTheDay.video}
        </EpistoButton>
    </Flex >
}
