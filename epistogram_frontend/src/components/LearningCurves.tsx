import {Flex} from "@chakra-ui/react";
import { Tab, Tabs, Typography} from "@mui/material";
import {Lock} from "@mui/icons-material";
import React, {useState} from "react";
import {translatableTexts} from "../translatableTexts";
import {Bar} from "react-chartjs-2";
import classes from "./learningStatistics/learningStatistics.module.scss";
import {chartDefaultOptions, daysWithActivityInTime} from "./learningStatistics/LearningStatistics";
import {FlexFloat} from "./universal/FlexFloat";
import {TabPanel} from "./courseDetails/TabPanel";

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
            direction={"row"}
            flexWrap={"wrap"}
            justifyContent={"center"}
            alignItems={"flex-start"}
            w={"100%"}
            h={"100%"}

        >
        <Flex
            flex={1}
            minW={300}
            direction="column"
            p={10}
            overflow="scroll">

            <Flex my={10}>
                <Tabs value={currentTab} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label={"Tanulási görbéd"} {...a11yProps(0)} />
                    <Tab label={"Felejtési görbéd"} {...a11yProps(1)} />
                </Tabs>
            </Flex>


            <TabPanel value={currentTab} index={0}>
                Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
            </TabPanel>
            <TabPanel value={currentTab} index={1}>
                Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 46 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
            </TabPanel>

        </Flex>

        <Flex
            justifyContent={"flex-start"}
            direction={"column"}
            minWidth={window.innerWidth < 600 ? "100%" : 450}
            w={"100%"}
            maxW={window.innerWidth < 600 ? "100%" : "50%"}
            mt={32}
            mx={20}
            mb={10}>

            <FlexFloat
                direction="column"
                p="0px"
                minW={250}
                style={{
                    gridColumn: `auto / span 2`,
                    gridRow: `auto / span 2`
                }}
                position="relative"
                m="10px" >
                <Flex
                    flexDir={"column"}
                    boxSizing={"border-box"}
                    p={20}
                    alignItems={"center"}
                    justifyContent={"center"}
                    pos={"absolute"}
                    w={"100%"}
                    h={"100%"}
                    bgColor={"#333333CC"}
                    color={"white"}
                    borderRadius={5} >
                    <Lock style={{
                        width: "50%",
                        height: "50%"
                    }}/>
                    <Typography align={"center"}>
                        {translatableTexts.homePage.noStatsYet}
                    </Typography>
                </Flex>
                <Bar
                    className={classes.progressLineChart}
                    options={chartDefaultOptions}
                    data={daysWithActivityInTime} />
            </FlexFloat>

        </Flex>

    </Flex>
}
