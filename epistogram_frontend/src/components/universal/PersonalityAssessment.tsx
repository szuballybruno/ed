import { Flex, FlexProps } from "@chakra-ui/layout";
import { Accordion, AccordionButton, AccordionItem, AccordionPanel, AccordionIcon, Box } from "@chakra-ui/react";
import { ExpandMore, InfoOutlined } from "@mui/icons-material";
import { Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import { usePersonalityData } from "../../services/api/signupApiService";
import { translatableTexts } from "../../static/translatableTexts";
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
        {...css}>

        {/* left wrapper */}
        <Flex
            direction="row"
            flexWrap="wrap"
            justifyContent="center"
            alignItems="flex-start"
            w="100%">

            <Flex
                className="roundBorders"
                justify="center"
                direction="column"
                background="var(--transparentWhite70)"
                position="relative"
                p="10px"
                minWidth={window.innerWidth < 600 ? "100%" : 450}
                w={"100%"}
                h="600px"
                maxW={window.innerWidth < 600 ? "100%" : "50%"}>

                {/* personality chart info button and title */}
                <EpistoButton
                    onClick={() => {
                        setIsShowHelperPopper(true)
                    }}
                    ref={ref}
                    style={{
                        position: "absolute",
                        top: 10,
                        left: 10
                    }}
                    icon={<InfoOutlined />}>

                    <Typography
                        style={{
                            marginLeft: 5,
                            fontSize: "0.9em"
                        }}>

                        {translatableTexts.learningOverview.whatIsThisGraphGoodFor}
                    </Typography>
                </EpistoButton>

                {/* personality chart info description */}
                <EpistoPopper
                    placementX="left"
                    isOpen={isShowHelperPopper}
                    handleClose={() => {
                        setIsShowHelperPopper(false)
                    }}
                    target={ref?.current}>

                    <Typography
                        style={{
                            maxWidth: "300px",
                            fontSize: "0.9em"
                        }}>

                        {translatableTexts.learningOverview.whatIsThisGraphGoodForDescription}
                    </Typography>
                </EpistoPopper>

                {/* personality chart */}
                <Flex>

                    <PersonalityChart data={personalityData?.chartData ?? null} />
                </Flex>

            </Flex>

            {/* personality info accordions */}
            <Flex
                flex="1"
                minW="300px"
                direction="column"
                pl="10px">

                {/* expand all */}
                <Flex
                    justifyContent="flex-end"
                    mb="10px">

                    <EpistoButton
                        className="tinyShadow"
                        variant={"colored"}
                        style={{
                            background: "var(--transparentWhite70)",
                            color: "black"
                        }}
                        onClick={() => {
                            descriptionAccordionsState.length <= 1 ?
                                setDescriptionAccordionsState([0, 1, 2, 3, 4]) :
                                setDescriptionAccordionsState([0])
                        }}>

                        {descriptionAccordionsState.length <= 1 ? "Összes kibontása" : "Összecsukás"}
                    </EpistoButton>
                </Flex>


                <Accordion defaultIndex={[0, 1, 2, 3, 4]} index={descriptionAccordionsState} >

                    {personalityDescriptionAccordions.map((item, index) => {

                        return <AccordionItem
                            className="roundBorders mildShadow"
                            p="10px 10px"
                            mb="10px"
                            background="var(--transparentWhite70)"
                            onClick={() => {
                                setDescriptionAccordionsState([index])
                            }}>

                            <AccordionButton>

                                <Box flex='1' textAlign='left'>
                                    {item.title}
                                </Box>

                                <AccordionIcon />
                            </AccordionButton>

                            <AccordionPanel pb={4}>

                                {item.description}
                            </AccordionPanel>
                        </AccordionItem>
                    })}
                </Accordion>
            </Flex>
        </Flex>
    </LoadingFrame>
}
