import { Flex, FlexProps } from "@chakra-ui/layout"
import { Typography } from "@mui/material";
import { usePersonalityData } from "../../services/dataService";
import { LoadingFrame } from "../HOC/LoadingFrame";
import { PersonalityChart } from "./PersonalityChart"
import {AlertDescription} from "@chakra-ui/react";

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
        <Flex direction={"row"} flexWrap={"wrap"} justifyContent={"center"} w={"100%"}>
            <Flex justifyContent={"flex-start"}
                  minWidth={window.innerWidth > 600 ? 350 : "100%"}
                  w={window.innerWidth > 400 ? "50%" : "100%"}
                  maxW={window.innerWidth < 600 ? "100%" : "50%"}
                  height="350"
                  minH={350}
                  mb={10}>
                <PersonalityChart data={personalityData?.chartData ?? null}></PersonalityChart>
            </Flex>

            <Flex minWidth={window.innerWidth > 600 ? 350 : "100%"}
                  w={window.innerWidth > 500 ? "50%" : "100%"} direction="column" p={10} overflow="scroll">
                <Typography >{descriptions?.category1}</Typography>
                <Typography mt={1}>{descriptions?.category2}</Typography>
                <Typography mt={1}>{descriptions?.category3}</Typography>
                <Typography mt={1}>{descriptions?.category4}</Typography>
                <Typography mt={1}>{descriptions?.category5}</Typography>
            </Flex>
        </Flex>



    </LoadingFrame>
}
