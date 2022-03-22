import { Flex } from "@chakra-ui/react"
import { Tab, Tabs } from "@mui/material"
import React, { useState } from "react"
import { EpistoFont } from "../../../controls/EpistoFont"
import { TabPanel } from "../../../courseDetails/TabPanel"
import { EpistoDialog, EpistoDialogPropType } from "../../../EpistoDialog"
import { ChipSmall } from "../ChipSmall"
import { AdminVideoQuestionsModalPage } from "./AdminVideoQuestionsModalPage"
import { AdminVideoStatisticsModalPage } from "./AdminVideoStatisticsModalPage"



// Should be moved to modal
export const AdminVideoItemModal = (props: {

} & EpistoDialogPropType) => {


    const { ...dialogOptions } = props
    const [currentTab, setCurrentTab] = useState(0)


    const moreInfoDialogTabs = [
        {
            title: "Szerkesztés",
            component: <Flex>

            </Flex>
        },
        {
            title: "Statisztika",
            component: <AdminVideoStatisticsModalPage />
        },
        {
            title: "Kérdések",
            component: <AdminVideoQuestionsModalPage />
        }
    ]

    return <EpistoDialog
        sx={{
            ".MuiDialog-paper": {
                background: "rgba(255,255,255,0.7)",
                backdropFilter: "blur(12px)",
                borderRadius: "7px",
                boxShadow: "0px 0px 30px 50px rgba(0,0,0,0.2)"
            },
            ".MuiBackdrop-root": {
                background: "transparent"
            }
        }}
        fullScreenX
        fullScreenY
        {...dialogOptions}>

        <Flex
            overflowY="scroll"
            className="roundBorders"
            flex="1"
            flexDirection="column">

            {/* tabs */}
            <Flex
                background="rgba(255,255,255,0.97)"
                direction="row"
                justify="space-between"
                position="sticky"
                w="100%"
                top="0"
                p="20px 30px 20px 30px"
                className="mildShadow"
                zIndex="1000"
                flex="1">

                <Flex align="center">
                    <Flex h="50px" direction="column" mr="20px">
                        <EpistoFont fontSize={"fontLarge"} style={{
                            display: "flex",
                            alignItems: "center",
                            flexDirection: "row",
                            fontWeight: 600
                        }}>
                            Új dia hozzáadása
                            <ChipSmall text="Videó" color="var(--deepBlue)" style={{
                                marginLeft: 15
                            }} />
                        </EpistoFont>
                        <EpistoFont fontSize={"fontMid"}>
                            Microsoft PowerPoint alapok
                        </EpistoFont>
                    </Flex>
                </Flex>

                <Tabs
                    value={currentTab}
                    onChange={(_, y) => setCurrentTab(y as number)}
                    className="roundBorders"
                    TabIndicatorProps={{
                        style: {
                            display: "none",
                        },
                    }}
                    sx={{
                        "&.MuiTabs-root": {
                            //background: "var(--transparentIntenseBlue85)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            height: 45,
                            minHeight: 0
                        }
                    }}>

                    {moreInfoDialogTabs
                        .map((x, index) => {

                            return <Tab
                                sx={{
                                    "&.MuiTab-root": {
                                        color: "#444",
                                        cursor: "pointer",
                                        backgroundColor: "transparent",
                                        padding: "6px 16px",
                                        border: "none",
                                        borderRadius: "5px",
                                        display: "flex",
                                        justifyContent: "center",
                                        height: "41px",
                                        minHeight: "0px"
                                    },
                                    "&.MuiTouchRipple-root": {
                                        lineHeight: "0px"
                                    },
                                    "&.Mui-selected": {
                                        color: "#444",
                                        fontWeight: "bold",
                                        background: "var(--transparentIntenseTeal)"
                                    }
                                }}
                                label={x.title}
                                key={index}
                                id={`simple-tab-${index}`} />
                        })}
                </Tabs>
            </Flex>

            { /* tab contents */}
            {moreInfoDialogTabs
                .map((x, index) => <TabPanel
                    value={currentTab}
                    index={index}>

                    {x.component}
                </TabPanel>)}
        </Flex>
    </EpistoDialog>
}