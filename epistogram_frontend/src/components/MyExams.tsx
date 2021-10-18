import { Box, Flex } from "@chakra-ui/layout"
import { Typography } from "@mui/material"
import { DashboardSection } from "./universal/DashboardSection"
import { EpistoGrid } from "./universal/EpistoGrid"
import { FlexFloat } from "./universal/FlexFloat"
import { InfoGrid } from "./universal/InfoGrid"
import VerifiedIcon from '@mui/icons-material/Verified';

const finisedExams = [
    {
        title: "Excel bevezető"
    },
    {
        title: ".Net programozás haladó"
    }
]

const stats = [
    {
        text: "Fókusz 24%"
    },
    {
        text: "Pontosság 24%"
    },
    {
        text: "Elvégzett vizsgák: 45"
    },
    {
        text: "A kurzus teljes időtartalma: 3h"
    },
    {
        text: "Reakció idő: 12s"
    },
]

export const MyExams = () => {

    return <Flex direction="column">
        <DashboardSection variant="noShadow" title="Teljesített vizsgáim">
            <EpistoGrid auto="fill" gap="15px" minColumnWidth="200px">
                {finisedExams
                    .map(x => <FlexFloat variant="rect" direction="column">

                        <Flex align="center">

                            <Box borderRadius="50%" padding="3px" m="5px">
                                <VerifiedIcon className="square50" style={{ color: "var(--epistoTeal)" }}></VerifiedIcon>
                            </Box>

                            <Typography style={{ paddingLeft: "10px" }}>
                                {x.title}
                            </Typography>
                        </Flex>

                        <InfoGrid infos={stats.map(x => x.text)} />
                    </FlexFloat>)}
            </EpistoGrid>
        </DashboardSection>
    </Flex>
}
