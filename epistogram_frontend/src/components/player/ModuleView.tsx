import { Flex } from "@chakra-ui/layout"
import { Typography } from "@mui/material";
import { ModuleDetailedDTO } from "../../models/shared_models/ModuleDetailedDTO"
import { EpistoHeader } from "../EpistoHeader"
import { EpistoButton } from "../universal/EpistoButton";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { TimeoutFrame } from "../universal/TimeoutFrame";
import { useEffect } from "react";
import { useReactTimer } from "../../helpers/reactTimer";

export const ModuleView = (params: {
    module?: ModuleDetailedDTO,
    startModule: () => void,
}) => {

    const { module, startModule } = params;
    const isVisible = !!module;
    const reactTimer = useReactTimer(() => {

        console.log("Starting module by timer....");
        startModule();
    }, 15 * 1000);

    useEffect(() => {

        if (!isVisible)
            return;

        console.log("restarting timer");
        reactTimer.restart();
    }, [module?.id, isVisible]);

    useEffect(() => {

        if (isVisible)
            return;

        console.log("reseting timer");
        reactTimer.reset();
    }, [isVisible]);

    return <Flex display={isVisible ? undefined : "none"} direction="column" className="whall">
        <Flex flex="1" align="center" justify="center">

            <Flex direction="column">
                <EpistoHeader text={module?.name ?? ""} variant="giant"></EpistoHeader>
                <Typography>
                    {module?.description}
                </Typography>
            </Flex>
        </Flex>

        <Flex height="60px" borderTop="1px solid var(--mildGrey)" justify="flex-end" p="10px">
            <EpistoButton variant="colored" onClick={startModule} padding="0">
                <TimeoutFrame className="whall" reactTimer={reactTimer}>
                    <Flex className="whall" mx="15px" align="center">
                        <Typography style={{ marginRight: "5px" }} className="fontSmall">
                            Kezdhetjük!
                        </Typography>

                        <ArrowForwardIcon></ArrowForwardIcon>
                    </Flex>
                </TimeoutFrame>
            </EpistoButton>
        </Flex>
    </Flex>
}