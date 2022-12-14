import { Grid, Tooltip } from '@chakra-ui/react';
import { FiberManualRecord } from '@mui/icons-material';
import React, { ReactNode, useState } from 'react';
import { iterate } from '../../../../static/frontendHelpers';
import { EpistoDivider } from '../../../controls/EpistoDivider';
import { EpistoFlex2 } from '../../../controls/EpistoFlex';
import { EpistoFont } from '../../../controls/EpistoFont';
import { EpistoReactPlayer } from '../../../controls/EpistoReactPlayer';
import { EpistoSelect } from '../../../controls/EpistoSelect';
import { EpistoSlider } from '../../../controls/EpistoSlider';
import { StatisticsGroupType } from '../../../learningInsights/LearningStatistics';
import StatisticsCard from '../../../statisticsCard/StatisticsCard';
import { EpistoLineChart } from '../../../universal/charts/line-chart/EpistoLineChart';
import { EpistoPieChart } from '../../../universal/charts/pie-chart/EpistoPieChart';
import { DashboardSection } from '../../../universal/DashboardSection';

export const HotspotsSlider = (props: {
    valueLabelComponent: React.ElementType<any> | undefined
}) => {

    const { valueLabelComponent } = props;

    return <EpistoSlider
        style={{
            overflow: 'hidden',
            height: '10px',
            padding: 0,
            margin: '0 10px',
        }
        }
        components={{
            ValueLabel: valueLabelComponent,
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
        }} />;
};

export const adminExamStatistics = [
    {
        title: '',
        items: [

            /* Count of views */
            {
                title: 'Megtekintések száma',
                value: '213',
                suffix: 'db'
            },

            /* Time spent with watch */
            {
                title: 'Össz. megtekintési idő',
                value: '23',
                suffix: 'óra'
            },

            /* Performance on exam */
            {
                title: 'Átlagos nézési idő',
                value: '3:45',
                suffix: ''
            },

            /* Average time spent per sessions */
            {
                title: 'Átlagban hány %-át nézik meg a videónak',
                value: '78',
                suffix: '%'
            },

        ]
    },
    {
        title: '',
        items: [



            /* Video difficulty by users */
            {
                title: 'Videó nehézsége az értékelések alapján',
                value: '2.3',
                suffix: ''
            },

            /* Calculated video difficulty */
            {
                title: 'Videó nehézségének értékelései',
                value: '210',
                suffix: 'db'
            },

            /* Video quality rating by users */
            {
                title: 'Videó minősége az értékelések alapján',
                value: '4.8',
                suffix: ''
            },

            /* Calculated video quality rating */
            {
                title: 'Videó minőségének értékelései',
                value: '130',
                suffix: 'db'
            },

            /* Video watch rate chart*/
            {
                isOpenByDefault: true,
                children: <EpistoPieChart
                    title="Megtekintési arányok"
                    segments={[
                        { value: 33, name: 'Végignézi a videót' },
                        { value: 31, name: '75%-ig nézi meg a videót' },
                        { value: 27, name: '50%-ig nézi meg a videót' },
                        { value: 23, name: '25%-ig nézi meg a videót' },
                        { value: 40, name: '10%-ig nézi meg a videót' }
                    ]}
                    isSortValues
                    variant="redRadiusPie"
                    style={{
                        width: '100%',
                        height: '100%'
                    }} />
            },

            /* Dropout rate by video */
            {
                title: 'Hányan léptek ki a platformból ezután a videó után',
                value: '10',
                suffix: 'fő'
            },

            /* Correct answers count */
            {
                title: 'Hányan válaszoltak jól a videóhoz tartozó kérdésre?',
                value: '45',
                suffix: 'fő'
            },

            /* Correct answers rate by users */
            {
                title: 'A felhasználók hány %-a válaszolt jól a videóhoz tartozó kérdésre?',
                value: '70',
                suffix: '%'
            },

            /* Average repetition multiplier */
            {
                title: 'Átlagosan ennyiszer ismétlik meg a felhasználók',
                value: '1.3',
                suffix: 'x'
            },
        ]
    }
] as StatisticsGroupType[];

export const AdminExamStatisticsListItem = (props: {
    title: string,
    color: string
}) => {
    const { title, color } = props;

    return <EpistoFlex2 align="center">

        <FiberManualRecord
            style={{
                color: color,
                height: 10
            }} />

        <EpistoFont
            style={{
                color: color,
                lineHeight: 1.1,
                fontWeight: 500,
                margin: '3px 0'
            }}
            fontSize="fontSmall">

            {title}
        </EpistoFont>
    </EpistoFlex2>;
};

export const adminExamStatisticsListItems = [
    {
        title: 'A legtöbb felhasználónak nehezen érthető',
        color: 'red'
    },
    {
        title: 'A felhasználók egy részének nehezen érthető',
        color: 'orange'
    },
    {
        title: 'Nem történtek visszatekerések',
        color: 'green'
    },
];

export const ValueLabelComponent = (props: { children: ReactNode, value: any }) => {

    const { children, value } = props;

    return (
        <Tooltip
            className="roundBorders"
            hasArrow
            padding="10px"
            label={value}
            placement="top"
            zIndex="9999"
            height="100px"
            width="200px">

            {children}
        </Tooltip >
    );
};

export const ExamStats = () => {


    const [playedSeconds, setPlayedSeconds] = useState(0);

    return <EpistoFlex2 direction="column"
        overflowY="scroll"
        padding="5px">

        {/* First statistics card section */}
        <EpistoFlex2 >

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
                margin="5px 5px 0 0"
                position="relative"
                flex="1">

                <EpistoReactPlayer
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

                <EpistoFlex2
                    background="linear-gradient(180deg, rgba(190,190,190,0.55) 0%, rgba(240,240,240,1) 20%, rgba(255,255,255,1) 100%)"
                    align="center"
                    borderRadius="0 0 7px 7px"
                    //background="#FFFFFF"
                    position="absolute"
                    height="40px"
                    pt="10px"
                    width="100%"
                    bottom="0">

                    <HotspotsSlider valueLabelComponent={ValueLabelComponent} />
                </EpistoFlex2>
            </EpistoFlex2>

            {/* Video statistics */}
            <EpistoFlex2
                margin="5px 0 0 5px"
                flex="1">

                <EpistoFlex2
                    direction="column"
                    className="roundBorders"
                    padding="15px"
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
                                width="1px"
                                margin="0 10px" />

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
            margin="10px 0 0 0"
            width="100%">

            <EpistoFlex2
                height='350px'
                minHeight={350}
                minWidth={500}
                maxWidth='100%'>

                <EpistoLineChart
                    options={{
                        series: [
                            {
                                name: 'Dataset',
                                data: iterate(300, (index) => {
                                    return [(300 - index), Math.pow(index, 2 + Math.random()) / 1000000];
                                })
                            }
                        ],
                        xAxis: {
                            name: 'Időpont'
                        },
                        yAxis: {
                            name: 'Felhasználók'
                        }
                    }} />
            </EpistoFlex2>
        </DashboardSection >

        {/* Second statistics card section */}
        <Grid
            mt="30px"
            gridTemplateColumns="repeat(auto-fill, minmax(300px, 1fr))"
            gridAutoRows="160px"
            gridGap='10px' >

            {
                adminExamStatistics[1].items.map((item, index) => {
                    return <StatisticsCard
                        key={index}
                        style={{
                            background: 'var(--transparentWhite80)',
                            paddingLeft: 20,
                            minWidth: 200
                        }}
                        {...item} />;
                })
            }
        </Grid>
    </EpistoFlex2 >;
};
