import React from 'react';
import {Flex} from "@chakra-ui/react";
import {AdministrationListItem} from "../../administration/universal/adminDashboardSearchItem/AdministrationListItem";
import {
    CalendarToday,
    Download, EditTwoTone, EqualizerTwoTone,
    FileCopy,
    Pages, Pageview,
} from "@mui/icons-material";
import {EpistoButton} from "../../universal/EpistoButton";
import {FloatChip} from "../../universal/FloatChip";
import {getAssetUrl, isString} from "../../../frontendHelpers";
import {Image} from "@chakra-ui/image";
import {EpistoHeader} from "../../administration/universal/EpistoHeader";
import {FlexListItem} from "../../universal/FlexListItem";
import {FlexListTitleSubtitle} from "../../universal/FlexListTitleSubtitle";
import {Typography} from "@mui/material";
import {Box} from "@chakra-ui/layout";

export const VideoContent = () => {
    const chips = [
        {
            name: "32KB",
            icon: <FileCopy />
        },
        {
            name: "2021. 05. 12.",
            icon: <CalendarToday />
        }
    ]
    return <Flex minH={600} direction={"column"} w={"100%"}>
        <FlexListItem
            align="center"
            p="5px"
            thumbnail={<Image
                className="square70"
                src={getAssetUrl("file_extension_icons/001-xlsx-1.svg")}
                objectFit="cover"
                m="10px" />}
            midContent={<Flex className="whall" direction="column">
                <Flex ml={10}>
                    <Typography>
                        {"Munkafüzet1.xlsx"}
                    </Typography>
                </Flex>
                <Box>
                    <Flex wrap="wrap" mt="10px">
                        {chips
                            .map((chip, index) => <FloatChip
                                name={chip.name}
                                icon={chip.icon}
                                padding="5px" />)}
                    </Flex>
                </Box>
            </Flex>}
            endContent={<Flex align="center">
                <EpistoButton variant="colored" style={{ padding: "3px" }}>
                    <Download className="square25" />
                </EpistoButton>
            </Flex>}
        >

        </FlexListItem>
    </Flex>
};
