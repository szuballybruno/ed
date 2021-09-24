import { Box, Flex } from "@chakra-ui/layout"
import { Typography } from "@mui/material"
import { DashboardSection } from "./universal/DashboardSection"
import { EpistoGrid } from "./universal/EpistoGrid"
import { FlexFloat } from "./universal/FlexFloat"
import { InfoGrid } from "./universal/InfoGrid"
import VerifiedIcon from '@mui/icons-material/Verified';

const finisedExams = [
    {
        title: "Excel all zarovizsga"
    },
    {
        title: ".Net programozas expert"
    }
]

const stats = [
    {
        text: "Focus 24%"
    },
    {
        text: "Accuarcy 24%"
    },
    {
        text: "Compelted exams: 45"
    },
    {
        text: "Completed in: 3h"
    },
    {
        text: "Data: 123"
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

        <DashboardSection variant="noShadow" title="Jelentkezés vizsgára">

        </DashboardSection>
    </Flex>
}