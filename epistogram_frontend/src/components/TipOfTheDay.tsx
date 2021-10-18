import { Box, Flex, FlexProps } from "@chakra-ui/layout"
import { Typography } from "@mui/material"
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

    const VideoSlide = () => <Box position={"relative"} p="20px" onClick={openDialog} cursor="pointer">
        <img src={getAssetUrl("/icons/play2.svg")} style={{
            position: "absolute",
            top: "43%",
            left: "45%",
            width: 40,
            height: 40,
        }} alt={""} />
        <img
            height="300px"
            width="100%"
            src={getAssetUrl("/images/tipoftheday.jpg")}
            style={{
                borderRadius: "15px"
            }}>
        </img>
    </Box>

    return <Flex direction="column" justify="center" {...css}>

        <EpistoDialog logic={dialogLogic} height="90vh" showCloseButton={true}>
            <Flex width="90vw" >

            </Flex>
        </EpistoDialog>

        <SlidesDisplay
            index={currentIndex}
            slides={[
                VideoSlide,
                DescriptionSlide
            ]} />

        <EpistoButton
            style={{ alignSelf: "center" }}
            variant="outlined"
            onClick={() => {

                if (currentIndex == 0) {

                    next();
                }
                else {

                    previous();
                }
            }}>
            {currentIndex == 0
                ? translatableTexts.tipOfTheDay.description
                : translatableTexts.tipOfTheDay.video}
        </EpistoButton>
    </Flex>
}
