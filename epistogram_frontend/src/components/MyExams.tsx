import { Flex } from "@chakra-ui/layout";
import { DashboardSection } from "./universal/DashboardSection";
import { EpistoGrid } from "./controls/EpistoGrid";
import { ExamTile } from "./universal/ExamTile";

const finisedExams = [
    {
        title: "Excel bevezető"
    },
    {
        title: ".Net programozás haladó"
    }
];

export const MyExams = () => {

    return <Flex direction="column"
width="100%">
        <DashboardSection variant="noShadow"
title="Teljesített vizsgáim">
            <EpistoGrid auto="fill"
gap="15px"
minColumnWidth="330px">
                {finisedExams
                    .map(x => <ExamTile />)}
            </EpistoGrid>
        </DashboardSection>
    </Flex>;
};
