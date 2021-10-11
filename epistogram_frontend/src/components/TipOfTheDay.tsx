import { Box, Flex, FlexProps } from "@chakra-ui/layout"
import { Typography } from "@mui/material"
import { usePaging } from "../frontendHelpers"
import { tipOfTheDay } from "../services/dataService"
import { translatableTexts } from "../translatableTexts"
import { EpistoButton } from "./universal/EpistoButton"
import { SlidesDisplay } from "./universal/SlidesDisplay"

export const TipOfTheDay = (props: FlexProps) => {

    const { ...css } = props;
    const { currentIndex, next, previous } = usePaging([1, 2]);

    const DescriptionSlide = () => <Typography variant={"h6"} fontSize="16px">
        {tipOfTheDay}
    </Typography>;

    const VideoSlide = () => <Box p="20px">
        <img
            height="300px"
            width="100%"
            src="https://i.stack.imgur.com/z3pLU.png"
            style={{
                borderRadius: "15px"
            }}>
        </img>
    </Box>

    return <Flex direction="column" justify="center" {...css}>
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