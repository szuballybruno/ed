import { Box, BoxProps, Flex, FlexProps } from "@chakra-ui/layout"
import { Typography } from "@mui/material"
import { usePaging } from "../frontendHelpers"
import { tipOfTheDay } from "../services/dataService"
import { EpistoButton } from "./universal/EpistoButton"
import { FlexImage } from "./universal/FlexImage"
import { SlidesDisplay } from "./universal/SlidesDisplay"

export const TipOfTheDay = (props: FlexProps) => {

    const { ...css } = props;
    const { currentIndex, next, previous } = usePaging([1, 2]);

    const DescriptionSlide = () => <Typography variant={"h6"} fontSize="16px">
        {tipOfTheDay}
    </Typography>;

    const VideoSlide = () => <FlexImage
        height="300px"
        width="100%"
        url="https://i.stack.imgur.com/z3pLU.png">
    </FlexImage>

    return <Flex direction="column" {...css}>
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
            {currentIndex == 0 ? "Leírás" : "Videó"}
        </EpistoButton>
    </Flex>
}