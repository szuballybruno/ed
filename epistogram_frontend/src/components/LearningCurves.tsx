import {Flex} from "@chakra-ui/react";
import { Tab, Tabs, Typography} from "@mui/material";
import {Lock} from "@mui/icons-material";
import React, {useState} from "react";
import {translatableTexts} from "../translatableTexts";
import {FlexFloat} from "./universal/FlexFloat";
import {TabPanel} from "./courseDetails/TabPanel";
import {getAssetUrl} from "../frontendHelpers";

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
                    <Tab
                        label={"Tanulási görbéd"}
                        icon={
                            <img
                                src={getAssetUrl("/icons/learningcurve.svg")}
                                alt={""}
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
                        label={"Felejtési görbéd"}
                        icon={
                            <img
                                src={getAssetUrl("/icons/forgettingcurve.svg")}
                                alt={""}
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


            <TabPanel value={currentTab} index={0}>
                A tanulási görbe azon a megfigyelésen alapul, hogy minél gyakrabban végzünk egy tevékenységet, annál
                begyakorlottabban és gyorsabban tudjuk azt végrehajtani.
                Gondolhatnánk, hogy ez egy teljesen lineáris folyamat,
                a gyakorlatban ennél azonban komplikáltabb rendszerről beszélhetünk, mely
                mindenkinél mást jelent.A jobb oldalon láthatod, hogyan épül fel a te tanulási
                görbéd, ennek megfelelően pedig további tippeket adunk majd, hogyan tudod fejleszteni azt.
            </TabPanel>
            <TabPanel value={currentTab} index={1}>
                A felejtési görbe az emlékezetek fakulásának folyamatát ábrázolja az idő függvényében.
                Egy kapcsolódó fogalom az emlék erőssége, amely azt fejezik ki, hogy egy emlék milyen tartósan marad meg az agyban.
                Minél erősebb egy emlék, annál hosszabb ideig képes valaki előhívni.
                A felejtés sebessége sok tényezőtől függ, mint például a megtanult anyag nehézsége, az ismeretanyag ábrázolása,
                valamint fiziológiai tényezők mint a pillanatnyi stressz vagy kipihentség.
                Az alap felejtési sebességben nincs lényeges egyéni különbség.
                A látható teljesítményben mutatkozó különbségeket (pl. iskolai jegyek)
                eltérő mnemotechnikai képességekkel lehet megmagyarázni, melyekkel kapcsolatban hamarosan új ismeretekre tehetsz majd szert!
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
                justifyContent={"center"}
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
                <img
                    src={getAssetUrl("/images/learningcurve.png")}
                    alt={""}
                    style={{
                        maxHeight: 400,
                        objectFit: "contain",
                        margin: "auto 10px auto 0",
                    }} />
            </FlexFloat>

        </Flex>

    </Flex>
}
