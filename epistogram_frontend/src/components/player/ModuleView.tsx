import { Flex } from "@chakra-ui/layout"
import { Typography } from "@mui/material";
import { ModuleDetailedDTO } from "../../models/shared_models/ModuleDetailedDTO"
import { EpistoHeader } from "../EpistoHeader"
import { EpistoButton } from "../universal/EpistoButton";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export const ModuleView = (params: {
    module: ModuleDetailedDTO,
    startModule: () => void
}) => {

    const { module, startModule } = params;

    return <Flex direction="column" className="whall">
        <Flex flex="1" align="center" justify="center">

            <Flex direction="column">
                <EpistoHeader text={module.name} variant="giant"></EpistoHeader>
                <Typography>
                    {module.description}
                </Typography>
            </Flex>
        </Flex>

        <Flex height="60px" borderTop="1px solid var(--mildGrey)" justify="flex-end" p="10px">
            <EpistoButton variant="colored" onClick={startModule}>
                <Flex align="center">
                    <Typography style={{ marginRight: "5px" }} className="fontSmall">
                        Kezdhetjük!
                    </Typography>

                    <ArrowForwardIcon></ArrowForwardIcon>
                </Flex>
            </EpistoButton>
        </Flex>
    </Flex>
}