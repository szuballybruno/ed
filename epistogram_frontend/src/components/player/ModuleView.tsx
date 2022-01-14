import { Flex } from "@chakra-ui/layout";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Typography } from "@mui/material";
import { ModuleDetailedDTO } from "../../models/shared_models/ModuleDetailedDTO";
import { EpistoHeader } from "../EpistoHeader";
import { EpistoButton } from "../universal/EpistoButton";
import { Image } from "@chakra-ui/react";

export const ModuleView = (params: {
    module?: ModuleDetailedDTO,
    startModule: () => void,
}) => {

    const { module, startModule } = params;
    const isVisible = !!module;

    return <Flex
        className="roundBorders mildShadow"
        display={isVisible ? undefined : "none"}
        direction="column"
        background="var(--transparentWhite70)">

        <Flex
            h="500px"
            maxH="500px"
            align="center"
            justify="center">

            <Flex direction="row" align="center">

                {module?.imageFilePath && <Flex>
                    <img
                        className="roundBorders"
                        src={module?.imageFilePath ?? ""}
                        style={{
                            width: "100px",
                            height: "100px",
                            objectFit: "cover",
                            margin: 10
                        }} />
                </Flex>}

                <Flex
                    maxW="300px"
                    direction="column"
                    justify="center">

                    <EpistoHeader
                        text={module?.name ?? ""}
                        variant="giant" />

                    <Typography>
                        {module?.description}
                    </Typography>
                </Flex>
            </Flex>
        </Flex>

        <Flex height="60px" borderTop="1px solid var(--mildGrey)" justify="flex-end" p="10px">
            <EpistoButton variant="colored" onClick={startModule} padding="0">
                <Flex className="whall" mx="15px" align="center">
                    <Typography style={{ marginRight: "5px" }} className="fontSmall">
                        Kezdhetjük!
                    </Typography>

                    <ArrowForwardIcon></ArrowForwardIcon>
                </Flex>
            </EpistoButton>
        </Flex>
    </Flex>
}