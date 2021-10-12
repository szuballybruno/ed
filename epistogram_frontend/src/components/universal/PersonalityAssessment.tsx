import { Flex, FlexProps } from "@chakra-ui/layout"
import { Typography } from "@mui/material";
import { usePersonalityData } from "../../services/dataService";
import { LoadingFrame } from "../HOC/LoadingFrame";
import { PersonalityChart } from "./PersonalityChart"

export const PersonalityAssessment = (props: FlexProps) => {

    const { ...css } = props;

    const {
        personalityData,
        personalityDataError,
        personalityDataState
    } = usePersonalityData();

    const descriptions = personalityData?.personalityDescriptions;

    return <LoadingFrame
        loadingState={personalityDataState}
        onlyRenderIfLoaded
        error={personalityDataError}
        wrap="wrap"
        className="whall"
        overflowY="scroll"
        {...css}>

        <Flex minWidth="300px" direction="column" flexBasis="50%" overflow="scroll">
            <Typography >{descriptions?.category1}</Typography>
            <Typography >{descriptions?.category2}</Typography>
            <Typography >{descriptions?.category3}</Typography>
            <Typography >{descriptions?.category4}</Typography>
            <Typography >{descriptions?.category5}</Typography>
        </Flex>

        <Flex minWidth="300px" height="100%" flexBasis="50%" overflow="hidden">
            <PersonalityChart data={personalityData?.chartData ?? null}></PersonalityChart>
        </Flex>
    </LoadingFrame>
}