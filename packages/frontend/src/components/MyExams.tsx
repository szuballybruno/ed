import { DashboardSection } from './universal/DashboardSection';
import { EpistoGrid } from './controls/EpistoGrid';
import { ExamTile } from './universal/ExamTile';
import { EpistoFlex2 } from './controls/EpistoFlex';

const finisedExams = [
    {
        title: 'Excel bevezető'
    },
    {
        title: '.Net programozás haladó'
    }
];

export const MyExams = () => {

    return <EpistoFlex2 direction="column"
        width="100%">
        <DashboardSection variant="noShadow"
            title="Teljesített vizsgáim">
            <EpistoGrid auto="fill"
                gap="15px"
                minColumnWidth="330px">
                {finisedExams
                    .map((x, index) => <ExamTile key={index} />)}
            </EpistoGrid>
        </DashboardSection>
    </EpistoFlex2>;
};
