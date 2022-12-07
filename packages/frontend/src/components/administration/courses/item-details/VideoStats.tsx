import { Grid, Tooltip } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { defaultCharts } from '../../../../static/defaultChartOptions';
import { iterate } from '../../../../static/frontendHelpers';
import { EpistoDivider } from '../../../controls/EpistoDivider';
import { EpistoFlex2 } from '../../../controls/EpistoFlex';
import { EpistoFont } from '../../../controls/EpistoFont';
import { EpistoReactPlayer } from '../../../controls/EpistoReactPlayer';
import { EpistoSelect } from '../../../controls/EpistoSelect';
import StatisticsCard from '../../../statisticsCard/StatisticsCard';
import { EpistoLineChart } from '../../../universal/charts/base_charts/EpistoLineChart';
import { DashboardSection } from '../../../universal/DashboardSection';
import { adminExamStatistics, AdminExamStatisticsListItem, adminExamStatisticsListItems, HotspotsSlider } from './ExamStats';

export const AdminVideoStatisticsModalPage = () => {

    const ValueLabelComponent = (props: { children: ReactNode, value: any }) => {
        const { children, value } = props;

        return (
            <Tooltip
                className="roundBorders"
                hasArrow
                padding="10px"
                label={value}
                placement="top"
                zIndex="9999"
                h="100px"
                w="200px">

                {children}
            </Tooltip >
        );
    };

    return <EpistoFlex2
        direction="column"
        overflowY="scroll"
        p="5px">

        {/* First statistics card section */}
        <EpistoFlex2>

            <Grid
                className="whall"
                gap="10px"
                gridTemplateColumns="repeat(auto-fit, minmax(250px, 1fr))"
                gridAutoRows="200px"
                gridAutoFlow="column dense">

                {adminExamStatistics[0].items.map((item, index) => {

                    return <StatisticsCard
                        key={index}
                        style={{
                            background: 'var(--transparentWhite80)',
                            paddingLeft: 20,
                            minWidth: 200
                        }}
                        {...item} />;
                })}
            </Grid>
        </EpistoFlex2>

        {/* Video stats with player */}
        <EpistoFlex2 mt="30px">

            {/* Video player with hotspots slider */}
            <EpistoFlex2
                align="flex-start"
                m="5px 5px 0 0"
                position="relative"
                flex="1">

                <EpistoReactPlayer
                    width="100%"
                    height="calc(56.25 / 100)"
                    controls={false}
                    progressInterval={100}
                    style={{
                        borderRadius: 7,
                        background: 'green',
                        overflow: 'hidden'
                    }}
                    url={'https://storage.googleapis.com/epistogram_bucket_prod/videos/video_247_1642259265423.mp4'} />

                <EpistoFlex2
                    background="linear-gradient(180deg, rgba(190,190,190,0.55) 0%, rgba(240,240,240,1) 20%, rgba(255,255,255,1) 100%)"
                    align="center"
                    borderRadius="0 0 7px 7px"
                    //background="#FFFFFF"
                    position="absolute"
                    h="40px"
                    pt="10px"
                    w="100%"
                    bottom="0">

                    <HotspotsSlider valueLabelComponent={ValueLabelComponent} />
                </EpistoFlex2>
            </EpistoFlex2>

            {/* Video statistics */}
            <EpistoFlex2
                m="5px 0 0 5px"
                flex="1">

                <EpistoFlex2
                    direction="column"
                    className="roundBorders"
                    p="15px"
                    flex="1"
                    background="var(--transparentWhite70)">

                    <EpistoFlex2 justify="space-between">

                        <EpistoFont fontSize="fontLarge">

                            Videó érthetősége - Ismétlés aránya a videón belül
                        </EpistoFont>

                        <EpistoSelect
                            getDisplayValue={x => x}
                            items={['Ismétlések aránya']}
                            selectedValue={'Ismétlések aránya'}
                            onSelected={() => 1}
                            getCompareKey={() => 'asd'} />
                    </EpistoFlex2>

                    <EpistoFlex2 flex="1" >

                        <EpistoFlex2
                            direction="row"
                            flex="1"
                            pt="10px">

                            <EpistoFlex2
                                direction="column"
                                justify="space-between"
                                flex="2">

                                <EpistoFlex2
                                    direction="column">

                                    <EpistoFont
                                        fontSize="fontLarge"
                                        style={{
                                            fontWeight: 500
                                        }}>

                                        Kritikus pontok a videóban
                                    </EpistoFont>

                                    <EpistoFlex2
                                        justify="space-between">

                                        <EpistoFont>

                                            3:29
                                        </EpistoFont>

                                        <EpistoFont>

                                            38 felhasználó
                                        </EpistoFont>
                                    </EpistoFlex2>
                                </EpistoFlex2>

                                <EpistoFlex2 direction="column">
                                    {adminExamStatisticsListItems.map((item, index) => {

                                        return <AdminExamStatisticsListItem
                                            key={index}
                                            title={item.title}
                                            color={item.color} />;
                                    })}
                                </EpistoFlex2>
                            </EpistoFlex2>

                            <EpistoDivider
                                orientation="vertical"
                                background="black"
                                w="1px"
                                m="0 10px" />

                            <EpistoFlex2
                                direction="column"
                                flex="3">

                                <EpistoFont
                                    fontSize="fontLarge"
                                    style={{
                                        fontWeight: 500
                                    }}>

                                    Általános statisztika
                                </EpistoFont>

                                <EpistoFlex2
                                    justify="space-between">

                                    <EpistoFont>

                                        Helyesen válaszolók aránya
                                    </EpistoFont>

                                    <EpistoFont>

                                        38%
                                    </EpistoFont>
                                </EpistoFlex2>
                            </EpistoFlex2>
                        </EpistoFlex2>
                        <EpistoFlex2>

                        </EpistoFlex2>
                    </EpistoFlex2>
                </EpistoFlex2>
            </EpistoFlex2>
        </EpistoFlex2>

        {/* Video low points */}
        <DashboardSection
            title={'Mélypontok'}
            background="var(--transparentWhite80)"
            className="mildShadow roundBorders"
            //boxShadow="inset -1px -1px 7px rgba(0,0,0,0.20)"
            color="black"
            showDivider
            m="10px 0 0 0"
            w="100%">

            <EpistoLineChart
                title=""
                dataset={[
                    {
                        name: 'Dataset',
                        data: iterate(300, (index) => {
                            return [(300 - index), Math.pow(index, 2 + Math.random()) / 1000000];
                        })
                    }
                ]}
                xAxisLabel="Időpont"
                yAxisLabel="Felhasználók"
                options={defaultCharts.simpleLineChart}
                style={{
                    height: '350px',
                    minHeight: 350,
                    minWidth: 500,
                    maxWidth: '100%'
                }} />
        </DashboardSection>

        {/* Second statistics card section */}
        <Grid
            mt="30px"
            gridTemplateColumns="repeat(auto-fill, minmax(300px, 1fr))"
            gridAutoRows="160px"
            gridGap='10px'>

            {adminExamStatistics[1].items.map((item, index) => {
                return <StatisticsCard
                    key={index}
                    style={{
                        background: 'var(--transparentWhite80)',
                        paddingLeft: 20,
                        minWidth: 200
                    }}
                    {...item} />;
            })}
        </Grid>
    </EpistoFlex2>;
};
