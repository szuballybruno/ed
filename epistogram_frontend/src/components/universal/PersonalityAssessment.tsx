import { Flex, FlexProps } from "@chakra-ui/layout";
import { Accordion, AccordionButton, AccordionItem, AccordionPanel, AccordionIcon, Box } from "@chakra-ui/react";
import { ExpandMore, InfoOutlined } from "@mui/icons-material";
import { Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import { usePersonalityData } from "../../services/api/signupApiService";
import { translatableTexts } from "../../static/translatableTexts";
import { LoadingFrame } from "../system/LoadingFrame";
import { EpistoButton } from "../controls/EpistoButton";
import { EpistoPopper } from "../controls/EpistoPopper";
import { PersonalityChart } from "./PersonalityChart";
import { EpistoFont } from "../controls/EpistoFont";

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
        },
        {
            title: "Térben vizualizálsz, vagy inkább hangosan kimondod az információt?",
            description: descriptions?.category2
        },
        {
            title: "Gyakorlati vagy elméleti oldalról érdekel inkább egy-egy adott probléma?",
            description: descriptions?.category3
        },
        {
            title: "Hallás, vagy látás után jegyzel meg könnyebben valamit?",
            description: descriptions?.category4
        },
        {
            title: "Kreatív, vagy analitikus gondolkodást részesítesz előnyben?",
            description: descriptions?.category5
        }
    ]

    const [descriptionAccordionsState, setDescriptionAccordionsState] = useState([0])

    return <LoadingFrame
        loadingState={personalityDataState}
        onlyRenderIfLoaded
        error={personalityDataError}
        {...css}>

        {/* left wrapper */}
        <Flex
            direction="row"
            flexWrap="wrap"
            align="flex-start"
            justify="center"
            flex="1"
            width="100%">

            {/* personality chart panel */}
            <Flex
                className="roundBorders"
                justify="center"
                direction="column"
                background="var(--transparentWhite70)"
                position="relative"
                flex="1"
                height="400px"
                padding="10px">

                {personalityData?.chartData && <PersonalityChart
                    data={personalityData.chartData} />}
            </Flex>

            {/* personality info accordions */}
            <Flex
                flex="1"
                minWidth="300px"
                direction="column"
                pl="10px">

                {/* expand all */}
                <Flex
                    justifyContent="space-between"
                    mb="10px">

                    {/* personality chart info button and title */}
                    <EpistoButton
                        className="tinyShadow"
                        variant={"colored"}
                        style={{
                            background: "var(--transparentWhite70)",
                            color: "black",
                            marginRight: 5,
                            flex: 3
                        }}
                        onClick={() => {
                            setIsShowHelperPopper(true)
                        }}
                        ref={ref}
                        icon={<InfoOutlined />}>

                        <EpistoFont
                            isUppercase
                            fontSize="fontSmallPlus"
                            style={{
                                marginLeft: 5
                            }}>

                            {translatableTexts.learningOverview.whatIsThisGraphGoodFor}
                        </EpistoFont>
                    </EpistoButton>

                    {/* personality chart info description */}
                    <EpistoPopper
                        placementX="left"
                        isOpen={isShowHelperPopper}
                        handleClose={() => {
                            setIsShowHelperPopper(false)
                        }}
                        target={ref?.current}>

                        <EpistoFont
                            fontSize="fontSmallPlus"
                            style={{
                                maxWidth: "300px"
                            }}>

                            {translatableTexts.learningOverview.whatIsThisGraphGoodForDescription}
                        </EpistoFont>
                    </EpistoPopper>

                    <EpistoButton
                        className="tinyShadow"
                        variant={"colored"}
                        style={{
                            background: "var(--transparentWhite70)",
                            color: "black",
                            flex: 2
                        }}
                        onClick={() => {
                            descriptionAccordionsState.length <= 1 ?
                                setDescriptionAccordionsState([0, 1, 2, 3, 4]) :
                                setDescriptionAccordionsState([0])
                        }}>

                        {descriptionAccordionsState.length <= 1 ? "Összes kibontása" : "Összecsukás"}
                    </EpistoButton>
                </Flex>


                <Accordion defaultIndex={[0, 1, 2, 3, 4]} index={descriptionAccordionsState}>

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

                                <Box flex='1' fontWeight="500" fontSize="15px" textAlign='left'>
                                    {item.title}
                                </Box>

                                <AccordionIcon />
                            </AccordionButton>

                            <AccordionPanel pb={4} mt="10px" fontSize="13px">

                                {item.description}
                            </AccordionPanel>
                        </AccordionItem>
                    })}
                </Accordion>
            </Flex>
        </Flex>
    </LoadingFrame>
}
