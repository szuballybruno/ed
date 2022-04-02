import { Divider, Flex, Grid, Tooltip } from '@chakra-ui/react';
import { FiberManualRecord } from '@mui/icons-material';
import { Slider } from '@mui/material';
import React, { ReactNode, useState } from 'react';
import ReactPlayer from 'react-player';
import { defaultCharts } from '../../../../static/defaultChartOptions';
import { iterate } from '../../../../static/frontendHelpers';
import { EpistoFont } from '../../../controls/EpistoFont';
import { EpistoSelect } from '../../../controls/EpistoSelect';
import StatisticsCard from '../../../statisticsCard/StatisticsCard';
import { EpistoLineChart } from '../../../universal/charts/EpistoLineChart';
import { EpistoPieChart } from '../../../universal/charts/EpistoPieChart';
import { DashboardSection } from '../../../universal/DashboardSection';

export const AdminExamStatisticsModalPage = () => {

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
    const [playedSeconds, setPlayedSeconds] = useState(0);

    return <Flex direction="column"
        overflowY="scroll"
        p="20px">
        <Grid
            mt="30px"
            h="120px"
            templateColumns="repeat(4, 1fr)"
            gridGap={10}
            gridAutoRows="1">

            <StatisticsCard
                style={{
                    paddingLeft: 20,
                    minWidth: 200
                }}
                title="Megtekintések száma"
                value="213"
                suffix="db" />
            <StatisticsCard
                style={{
                    paddingLeft: 20,
                    minWidth: 200
                }}
                title="Össz. megtekintési idő"
                value="23"
                suffix="óra" />
            <StatisticsCard
                style={{
                    paddingLeft: 20,
                    minWidth: 200
                }}
                title="Átlagos nézési idő"
                value="3:45"
                suffix="" />
            <StatisticsCard
                style={{
                    paddingLeft: 20,
                    minWidth: 200
                }}
                title="Átlagban hány %-át nézik meg a videónak"
                value="78"
                suffix="%" />
        </Grid>

        {/* Video stats with player */}
        <Flex mt="30px">
            <Flex
                align="flex-start"
                m="5px 5px 0 0"
                position="relative"
                flex="1">

                <ReactPlayer
                    width="100%"
                    height="calc(56.25 / 100)"
                    controls={false}
                    onProgress={x => setPlayedSeconds(x.playedSeconds)}
                    progressInterval={100}
                    style={{
                        borderRadius: 7,
                        background: 'green',
                        overflow: 'hidden'
                    }}
                    url={'https://storage.googleapis.com/epistogram_bucket_prod/videos/video_247_1642259265423.mp4'} />

                <Flex
                    background="linear-gradient(180deg, rgba(190,190,190,0.55) 0%, rgba(240,240,240,1) 20%, rgba(255,255,255,1) 100%)"
                    align="center"
                    borderRadius="0 0 7px 7px"
                    //background="#FFFFFF"
                    position="absolute"
                    h="40px"
                    pt="10px"
                    w="100%"
                    bottom="0">

                    <Slider
                        style={{
                            overflow: 'hidden',
                            height: '10px',
                            padding: 0,
                            margin: '0 10px',
                        }}
                        components={{
                            ValueLabel: ValueLabelComponent,
                        }}
                        valueLabelDisplay="on"
                        sx={{
                            '.MuiSlider-rail': {
                                padding: '0',
                                borderRadius: '7px',
                                opacity: '100%',
                                backgroundImage:
                                    `linear-gradient(to right, 
                                        rgb(30,255,50),
                                        rgb(30,255,50), 
                                        rgb(30,255,50),
                                        rgb(255,240,0),  
                                        rgb(30,255,50), 
                                        rgb(30,255,50), 
                                        rgb(30,255,50), 
                                        rgb(30,255,50),
                                        rgb(255,240,0),  
                                        rgb(255,240,0),
                                        rgb(255,40,70), 
                                        rgb(30,255,50), 
                                        rgb(30,255,50), 
                                        rgb(30,255,50), 
                                        rgb(30,255,50), 
                                        rgb(30,255,50), 
                                        rgb(30,255,50))`
                            },
                            '.MuiSlider-track': {
                                display: 'none',
                                background: 'transparent'
                            },
                            '.MuiSlider-thumb': {
                                height: 5,
                                width: 5,
                                background: 'white',
                                color: 'white'
                            }
                        }} />
                </Flex>
            </Flex>
            <Flex
                m="5px 0 0 5px"
                flex="1">
                <Flex
                    direction="column"
                    className="roundBorders"
                    p="15px"
                    flex="1"
                    background="var(--transparentWhite70)">

                    <Flex justify="space-between">

                        <EpistoFont fontSize="fontLarge">

                            Videó érthetősége - Ismétlés aránya a videón belül
                        </EpistoFont>
                        <EpistoSelect
                            items={['Ismétlések aránya']}
                            selectedValue={'Ismétlések aránya'}
                            onSelected={() => {

                                throw new Error('Not implemented!');
                            }}
                            getCompareKey={() => 'asd'} />
                    </Flex>
                    <Flex flex="1" >
                        <Flex
                            direction="row"
                            flex="1"
                            pt="10px">

                            <Flex
                                direction="column"
                                justify="space-between"
                                flex="2">
                                <Flex
                                    direction="column">
                                    <EpistoFont
                                        fontSize="fontMid"
                                        style={{
                                            fontWeight: 500
                                        }}>
                                        Kritikus pontok a videóban
                                    </EpistoFont>
                                    <Flex
                                        justify="space-between">
                                        <EpistoFont
                                            fontSize="fontNormal14">

                                            3:29
                                        </EpistoFont>
                                        <EpistoFont
                                            fontSize="fontNormal14">

                                            38 felhasználó
                                        </EpistoFont>
                                    </Flex>
                                </Flex>
                                <Flex direction="column">
                                    <Flex align="center">
                                        <FiberManualRecord
                                            style={{
                                                color: 'red',
                                                height: 10
                                            }} />
                                        <EpistoFont
                                            style={{
                                                color: 'red',
                                                lineHeight: 1.1,
                                                fontWeight: 500,
                                                margin: '3px 0'
                                            }}
                                            fontSize="fontSmall">
                                            A legtöbb felhasználónak nehezen érthető
                                        </EpistoFont>
                                    </Flex>
                                    <Flex align="center">
                                        <FiberManualRecord
                                            style={{
                                                color: 'orange',
                                                height: 10
                                            }} />
                                        <EpistoFont
                                            style={{
                                                color: 'orange',
                                                lineHeight: 1.1,
                                                fontWeight: 500,
                                                margin: '3px 0'
                                            }}
                                            fontSize="fontSmall">
                                            A felhasználók egy részének nehezen érthető
                                        </EpistoFont>
                                    </Flex>
                                    <Flex align="center">
                                        <FiberManualRecord
                                            style={{
                                                color: 'green',
                                                height: 10
                                            }} />
                                        <EpistoFont
                                            style={{
                                                color: 'green',
                                                fontWeight: 500
                                            }}
                                            fontSize="fontSmall">
                                            Nem történtek visszatekerések
                                        </EpistoFont>
                                    </Flex>
                                </Flex>

                            </Flex>
                            <Divider
                                orientation="vertical"
                                background="black"
                                w="1px"
                                m="0 10px" />
                            <Flex
                                direction="column"
                                flex="3">
                                <EpistoFont
                                    fontSize="fontMid"
                                    style={{
                                        fontWeight: 500
                                    }}>
                                    Általános statisztika
                                </EpistoFont>
                                <Flex
                                    justify="space-between">
                                    <EpistoFont
                                        fontSize="fontNormal14">

                                        Helyesen válaszolók aránya
                                    </EpistoFont>
                                    <EpistoFont
                                        fontSize="fontNormal14">

                                        38%
                                    </EpistoFont>
                                </Flex>
                            </Flex>
                        </Flex>
                        <Flex>

                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>

        {/* test your knowledge */}
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

        <Grid
            mt="30px"
            gridTemplateColumns="repeat(auto-fill, minmax(300px, 1fr))"
            gridAutoRows="160px"
            gridGap={10}>
            <StatisticsCard
                style={{
                    background: 'var(--transparentWhite80)',
                    paddingLeft: 20,
                    minWidth: 200
                }}
                title="Videó nehézsége az értékelések alapján"
                value="2.3"
                suffix="" />
            <StatisticsCard
                style={{
                    background: 'var(--transparentWhite80)',
                    paddingLeft: 20,
                    minWidth: 200
                }}
                title="Videó nehézségének értékelései"
                value="210"
                suffix="db" />
            <StatisticsCard
                style={{
                    background: 'var(--transparentWhite80)',
                    paddingLeft: 20,
                    minWidth: 200
                }}
                title="Videó minősége az értékelések alapján"
                value="4.8"
                suffix="" />
            <StatisticsCard
                style={{
                    background: 'var(--transparentWhite80)',
                    paddingLeft: 20,
                    minWidth: 200
                }}
                title="Videó minőségének értékelései"
                value="130"
                suffix="db" />

            <DashboardSection
                title={'Megtekintési arányok'}
                background="var(--transparentWhite80)"
                className="mildShadow roundBorders"
                //boxShadow="inset -1px -1px 7px rgba(0,0,0,0.20)"
                color="black"
                showDivider
                gridColumn="auto / span 2"
                gridRow="auto / span 2">


                <EpistoPieChart
                    title=""
                    segments={[
                        { value: 335, name: 'Végignézi a videót' },
                        { value: 310, name: '75%-ig nézi meg a videót' },
                        { value: 274, name: '50%-ig nézi meg a videót' },
                        { value: 235, name: '25%-ig nézi meg a videót' },
                        { value: 400, name: '10%-ig nézi meg a videót' }
                    ]}
                    isSortValues
                    options={defaultCharts.redRadiusPie} />
            </DashboardSection>

            <StatisticsCard
                style={{
                    paddingLeft: 20,
                    minWidth: 200
                }}
                title="Hányan léptek ki a platformból ezután a videó után"
                value="10"
                suffix="fő" />
            <StatisticsCard
                style={{
                    paddingLeft: 20,
                    minWidth: 200
                }}
                title="Hányan válaszoltak jól a videóhoz tartozó kérdésre?"
                value="45"
                suffix="fő" />
            <StatisticsCard
                style={{
                    paddingLeft: 20,
                    minWidth: 200
                }}
                title="A felhasználók hány %-a válaszolt jól a videóhoz tartozó kérdésre?"
                value="70"
                suffix="%" />
            <StatisticsCard
                style={{
                    paddingLeft: 20,
                    minWidth: 200
                }}
                title="Átlagosan ennyiszer ismétlik meg a felhasználók"
                value="1.3"
                suffix="x" />
        </Grid>
    </Flex>;
};