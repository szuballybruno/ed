import { Flex, FlexProps } from "@chakra-ui/layout";
import { ExpandMore, InfoOutlined } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import { usePersonalityData } from "../../services/api/signupApiService";
import { LoadingFrame } from "../system/LoadingFrame";
import { EpistoButton } from "./EpistoButton";
import { EpistoPopper } from "./EpistoPopper";
import { PersonalityChart } from "./PersonalityChart";

export const PersonalityAssessment = (props: FlexProps) => {

    const { ...css } = props;

    const {
        personalityData,
        personalityDataError,
        personalityDataState
    } = usePersonalityData();

    const descriptions = personalityData?.personalityDescriptions;

    const ref = useRef<HTMLButtonElement>(null);

    const [isShowHelperPopper, setIsShowHelperPopper] = useState(false);

    const personalityDescriptionAccordions = [
        {
            title: "Egyedül, vagy csoportosan tanulsz szívesebben?",
            description: descriptions?.category1
        }, {
            title: "Térben vizualizálsz, vagy inkább hangosan kimondod az információt?",
            description: descriptions?.category2
        }, {
            title: "Gyakorlati vagy elméleti oldalról érdekel inkább egy-egy adott probléma?",
            description: descriptions?.category3
        }, {
            title: "Hallás, vagy látás után jegyzel meg könnyebben valamit?",
            description: descriptions?.category4
        }, {
            title: "Kreatív, vagy analitikus gondolkodst részesítesz előnyben?",
            description: descriptions?.category5
        }
    ]

    const [descriptionAccordionsState, setDescriptionAccordionsState] = useState([0])

    return <LoadingFrame
        loadingState={personalityDataState}
        onlyRenderIfLoaded
        error={personalityDataError}
        wrap="wrap"
        className="whall"
        overflowY="scroll"
        {...css}>

        <Flex
            direction={"row"}
            flexWrap={"wrap"}
            justifyContent={"center"}
            alignItems={"flex-start"}
            w={"100%"}
            h={"100%"}

        >

            <EpistoButton
                onClick={() => { setIsShowHelperPopper(true) }}
                ref={ref}
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0
                }}
                icon={<InfoOutlined />}>
                <Typography style={{ marginLeft: 5, fontSize: "0.9em" }}>Mit jelent ez a grafikon?</Typography>
            </EpistoButton>

            <EpistoPopper placementX={"left"} isOpen={isShowHelperPopper} handleClose={() => { setIsShowHelperPopper(false) }} target={ref?.current}>
                <Typography style={{ maxWidth: "300px", fontSize: "0.9em" }}>
                    A fenti grafikonon 5-5 tulajdonság párt láthatsz, melyek 0-7
                    között vehetnek fel értéket, attól függően, hogy az adott tulajdonság mennyire jellemző rád.
                    Ezek általában ellentétben állnak egymással, így minél több pontod van az egyik oldalon, annál
                    kevesebb lesz a másikon.
                </Typography>
            </EpistoPopper>

            <Flex
                justifyContent={"flex-start"}
                direction={"column"}
                minWidth={window.innerWidth < 600 ? "100%" : 450}
                w={"100%"}
                maxW={window.innerWidth < 600 ? "100%" : "50%"}
                mt={32}
                mx={20}
                mb={10}>

                <Flex>
                    <PersonalityChart data={personalityData?.chartData ?? null} />
                </Flex>

            </Flex>

            <Flex
                flex={1}
                minW={300}
                direction="column"
                p={10}
                overflow="scroll">

                <Flex justifyContent={"flex-end"} mb={10}>
                    <EpistoButton variant={"outlined"} onClick={() => {
                        descriptionAccordionsState.length <= 1 ? setDescriptionAccordionsState([0, 1, 2, 3, 4]) : setDescriptionAccordionsState([0])
                    }}>
                        {descriptionAccordionsState.length <= 1 ? "Összes kibontása" : "Összecsukás"}
                    </EpistoButton>
                </Flex>

                {personalityDescriptionAccordions.map((item, index) => {
                    return <Accordion expanded={descriptionAccordionsState.includes(index)} onClick={() => {
                        setDescriptionAccordionsState([index])
                    }} defaultExpanded={true}>
                        <AccordionSummary
                            expandIcon={<ExpandMore />}
                            aria-controls="panel1a-content"
                            id="panel1a-header">
                            <Typography>{item.title}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            {item.description}
                        </AccordionDetails>
                    </Accordion>
                })}

            </Flex>


        </Flex>


    </LoadingFrame>
}
