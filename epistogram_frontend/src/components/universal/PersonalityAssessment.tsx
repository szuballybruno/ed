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

    return <Flex {...css}>
        <LoadingFrame
            loadingState={personalityDataState}
            onlyRenderIfLoaded
            error={personalityDataError}>

            <Flex direction="column" flexBasis="50%">
                <Typography >{descriptions?.category1}</Typography>
                <Typography >{descriptions?.category2}</Typography>
                <Typography >{descriptions?.category3}</Typography>
                <Typography >{descriptions?.category4}</Typography>
                <Typography >{descriptions?.category5}</Typography>
            </Flex>

            <Flex flexBasis="50%">
                <PersonalityChart data={personalityData?.chartData ?? null}></PersonalityChart>
            </Flex>
        </LoadingFrame>
    </Flex>
}