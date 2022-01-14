import { Flex } from "@chakra-ui/react";
import { Tab, Tabs, Typography } from "@mui/material";
import React, { useState } from "react";
import { translatableTexts } from "../static/translatableTexts";
import { FlexFloat } from "./universal/FlexFloat";
import { TabPanel } from "./courseDetails/TabPanel";
import { getAssetUrl } from "../static/frontendHelpers";
import { EpistoHeader } from "./EpistoHeader";

export const LearningCurves = () => {

    const [currentTab, setCurrentTab] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setCurrentTab(newValue);
    };

    const a11yProps = (index: number) => {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    return <Flex
        direction="row"
        flexWrap="wrap"
        mt="10px"
        w="100%">

        {/* left wrapper */}
        <Flex
            className="roundBorders"
            flex="1"
            minW="300px"
            direction="column"
            background="var(--transparentWhite70)"
            minH="400px"
            mr="10px"
            p="10px"
            overflow="scroll">


            {/* learning curves description */}

            <EpistoHeader
                text={translatableTexts.learningOverview.learningCurveTitle}
                showDivider
                variant="strongSub"
                m="5px 10px 0 10px" />

            <Flex my="10px">

                <Tabs
                    value={currentTab}
                    onChange={handleChange}>

                    <Tab
                        label={translatableTexts.learningOverview.learningCurve}
                        icon={
                            <img
                                src={getAssetUrl("/icons/learningcurve.svg")}
                                alt=""
                                style={{
                                    width: 25,
                                    margin: "0 10px 0 0"
                                }} />
                        }
                        style={{
                            flexDirection: "row",
                        }}
                        {...a11yProps(0)} />

                    <Tab
                        label={translatableTexts.learningOverview.forgettingCurve}
                        icon={
                            <img
                                src={getAssetUrl("/icons/forgettingcurve.svg")}
                                alt=""
                                style={{
                                    width: 25,
                                    margin: "0 10px 0 0"
                                }} />
                        }
                        style={{
                            flexDirection: "row",
                        }}
                        {...a11yProps(1)} />
                </Tabs>
            </Flex>

            <TabPanel
                value={currentTab}
                index={0}>

                <Typography style={{
                    fontSize: 13
                }}>
                    {translatableTexts.learningOverview.learningCurveDescription}
                </Typography>
            </TabPanel>

            <TabPanel value={currentTab} index={1}>
                <Typography style={{
                    fontSize: 13
                }}>
                    {translatableTexts.learningOverview.forgettingCurveDescription}
                </Typography>
            </TabPanel>

        </Flex>

        {/* right wrapper */}
        <FlexFloat
            background="var(--transparentWhite70)"
            direction="column"
            justify="center"
            p="10px"
            flex="1"
            minW={250}
            style={{
                gridColumn: `auto / span 2`,
                gridRow: `auto / span 2`
            }} >

            {/* learning curve image */}
            <img
                src={getAssetUrl("/images/learningcurve3D.png")}
                alt=""
                style={{
                    maxHeight: 220,
                    objectFit: "contain",
                    margin: "0 10px 0 0",
                }} />

            <Typography align="center">
                {translatableTexts.homePage.noStatsYet}
            </Typography>
        </FlexFloat>
    </Flex>
}
