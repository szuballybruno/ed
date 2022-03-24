import { Flex } from "@chakra-ui/react"
import { Tab, Tabs } from "@mui/material"
import React from "react"
import { usePaging } from "../../../static/frontendHelpers"
import { EpistoFont } from "../../controls/EpistoFont"
import { EpistoDialog, EpistoDialogLogicType } from "../../EpistoDialog"
import { EpistoPaging } from "../../universal/EpistoPaging"
import { ChipSmall } from "./ChipSmall"

export const CourseItemEditDialogBase = (props: {
    subpages: ({
        title: string,
        content: (isCurrent: boolean) => JSX.Element
    })[],
    logic: EpistoDialogLogicType
}) => {

    const { logic: dialogLogic, subpages } = props;

    const paging = usePaging(subpages);

    // ".MuiDialog-paper": {
    //     background: "rgba(255,255,255,0.7)",
    //     backdropFilter: "blur(12px)",
    //     borderRadius: "7px",
    //     boxShadow: "0px 0px 30px 50px rgba(0,0,0,0.2)"
    // },
    // ".MuiBackdrop-root": {
    //     background: "transparent"
    // }

    return <EpistoDialog
        logic={dialogLogic}
        fullScreenX
        fullScreenY>

        <Flex
            overflowY="scroll"
            className="roundBorders"
            flex="1"
            flexDirection="column">

            {/* header */}
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

                {/* tab selector */}
                <Tabs
                    value={paging.currentIndex}
                    onChange={(_, y) => paging.setItem(y as number)}
                    className="roundBorders"
                    TabIndicatorProps={{
                        style: {
                            display: "none",
                        },
                    }}
                    sx={{
                        "&.MuiTabs-root": {
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            height: 45,
                            minHeight: 0
                        }
                    }}>

                    {subpages
                        .map((subpage, index) => {

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
                                label={subpage.title}
                                key={index}
                                id={`simple-tab-${index}`} />
                        })}
                </Tabs>
            </Flex>

            {/* tab renderer */}
            <EpistoPaging
                index={paging.currentIndex}
                slides={subpages.map(x => x.content)} />
        </Flex>

    </EpistoDialog>
}