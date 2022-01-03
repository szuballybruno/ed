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

    return <Flex display={isVisible ? undefined : "none"} direction="column" className="whall">
        <Flex flex="1" align="center" justify="center">

            <Flex direction="column">
                <EpistoHeader
                    text={module?.name ?? ""}
                    variant="giant" />

                <Image
                    width="400px"
                    src={module?.imageFilePath ?? ""} />

                <Typography>
                    {module?.description}
                </Typography>
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