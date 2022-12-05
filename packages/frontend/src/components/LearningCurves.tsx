import { useState } from 'react';
import { Environment } from '../static/Environemnt';
import { translatableTexts } from '../static/translatableTexts';
import { EpistoFlex2 } from './controls/EpistoFlex';
import { EpistoFont } from './controls/EpistoFont';
import { EpistoTabs } from './controls/EpistoTabs';
import { FlexFloat } from './controls/FlexFloat';
import { TabPanel } from './courseDetails/TabPanel';
import { EpistoHeader } from './EpistoHeader';

/* TODO: REMOVE */
export const LearningCurves = () => {

    const [currentTab, setCurrentTab] = useState(0);

    const handleChange = (newValue: number) => {
        setCurrentTab(newValue);
    };

    // const a11yProps = (index: number) => {
    //     return {
    //         id: `simple-tab-${index}`,
    //         'aria-controls': `simple-tabpanel-${index}`,
    //     };
    // };

    return <EpistoFlex2
        direction="row"
        flexWrap="wrap"
        mt="10px"
        width="100%">

        {/* left wrapper */}
        <EpistoFlex2
            className="roundBorders"
            flex="1"
            minWidth="300px"
            direction="column"
            background="var(--transparentWhite70)"
            minH="400px"
            mr="10px"
            p="10px"
            overflow="scroll">


            {/* learning curves description */}

            <EpistoHeader
                text={translatableTexts.learningOverview.learningCurveTitle}
                showDivider
                variant="strongSub"
                m="5px 10px 0 10px" />

            <EpistoFlex2 my="10px">

                <EpistoTabs
                    tabItems={[
                        {
                            label: translatableTexts.learningOverview.learningCurve,
                            icon: <img
                                src={Environment.getAssetUrl('/icons/learningcurve.svg')}
                                alt=""
                                style={{
                                    width: 25,
                                    margin: '0 10px 0 0'
                                }} />,
                            key: 0
                        },
                        {
                            label: translatableTexts.learningOverview.forgettingCurve,
                            icon: <img
                                src={Environment.getAssetUrl('/icons/forgettingcurve.svg')}
                                alt=""
                                style={{
                                    width: 25,
                                    margin: '0 10px 0 0'
                                }} />,
                            key: 1
                        }
                    ]}
                    selectedTabKey={currentTab}
                    onChange={handleChange} />
            </EpistoFlex2>

            <TabPanel
                value={currentTab}
                index={0}>

                <EpistoFont fontSize="fontSmall">

                    {translatableTexts.learningOverview.learningCurveDescription}
                </EpistoFont>
            </TabPanel>

            <TabPanel value={currentTab}
                index={1}>

                <EpistoFont fontSize="fontSmall">

                    {translatableTexts.learningOverview.forgettingCurveDescription}
                </EpistoFont>
            </TabPanel>

        </EpistoFlex2>

        {/* right wrapper */}
        <FlexFloat
            background="var(--transparentWhite70)"
            direction="column"
            justify="center"
            p="10px"
            flex="1"
            minWidth='250px'
            style={{
                gridColumn: 'auto / span 2',
                gridRow: 'auto / span 2'
            }} >

            {/* learning curve image */}
            <img
                src={Environment.getAssetUrl('/images/learningcurve3D.png')}
                alt=""
                style={{
                    maxHeight: 220,
                    objectFit: 'contain',
                    margin: '0 10px 0 0',
                }} />

            <EpistoFont style={{
                textAlign: 'center'
            }}>

                {translatableTexts.homePage.noStatsYet}
            </EpistoFont>
        </FlexFloat>
    </EpistoFlex2 >;
};
