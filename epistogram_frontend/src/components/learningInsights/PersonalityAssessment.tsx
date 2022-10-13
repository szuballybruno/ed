import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, useMediaQuery } from '@chakra-ui/react';
import { InfoOutlined } from '@mui/icons-material';
import { useRef, useState } from 'react';
import { usePersonalityData } from '../../services/api/signupApiService';
import { translatableTexts } from '../../static/translatableTexts';
import { EpistoButton } from '../controls/EpistoButton';
import { EpistoDiv } from '../controls/EpistoDiv';
import { EpistoFlex2, EpistoFlex2Props } from '../controls/EpistoFlex';
import { EpistoFont } from '../controls/EpistoFont';
import { EpistoPopper } from '../controls/EpistoPopper';
import { LoadingFrame } from '../system/LoadingFrame';
import { PersonalityChart } from '../universal/charts/PersonalityChart';

export const PersonalityAssessment = (props: EpistoFlex2Props) => {

    const { ...css } = props;

    const {
        personalityData,
        personalityDataError,
        personalityDataState
    } = usePersonalityData();

    const ref = useRef<HTMLButtonElement>(null);

    const [isShowHelperPopper, setIsShowHelperPopper] = useState(false);

    const [isSmallerThan1320] = useMediaQuery('(max-width: 1320px)');

    const personalityDescriptionAccordions = (personalityData?.personalityTraitCategories ?? [])
        .map(x => ({
            title: x.categoryTitle,
            description: x.activeDescription
        }));

    const [openAccordions, setOpenAccordions] = useState([0]);

    const allOrAllButOneAccordionsClosed = openAccordions.length <= 1;

    return <LoadingFrame
        pt='10px'
        loadingState={personalityDataState}
        onlyRenderIfLoaded
        error={personalityDataError}
        {...css}>

        {/* left wrapper */}
        <EpistoFlex2
            direction="row"
            flexWrap={isSmallerThan1320 ? 'wrap' : 'nowrap'}
            align="flex-start"
            justify="center"
            flex="1"
            width="100%">

            {/* personality chart panel */}
            <EpistoFlex2
                className="roundBorders"
                justify="center"
                align='center'
                direction="row"
                background="var(--transparentWhite70)"
                position="relative"
                flex="1"
                minWidth={isSmallerThan1320 ? '100%' : '500px'}
                height="400px">

                {personalityData?.chartData && <PersonalityChart
                    isSmallDesktop={isSmallerThan1320}
                    data={personalityData.chartData} />}
            </EpistoFlex2>

            {/* personality info accordions */}
            <EpistoFlex2
                flex="1"
                minWidth="300px"
                direction="column"
                pl="10px">

                {/* expand all */}
                <EpistoFlex2
                    justifyContent="space-between"
                    mb="10px">

                    {/* personality chart info button and title */}
                    <EpistoButton
                        className="tinyShadow"
                        variant={'colored'}
                        style={{
                            background: 'var(--transparentWhite70)',
                            color: 'black',
                            marginRight: 5,
                            flex: 3
                        }}
                        onClick={() => {
                            setIsShowHelperPopper(true);
                        }}
                        ref={ref}
                        icon={<InfoOutlined />}>

                        <EpistoFont
                            isUppercase
                            fontSize="fontNormal14"
                            style={{
                                marginLeft: 5
                            }}>

                            {translatableTexts.learningOverview.whatIsThisGraphGoodFor}
                        </EpistoFont>
                    </EpistoButton>

                    {/* personality chart info description */}
                    <EpistoPopper
                        placementX="left"
                        isOpen={isShowHelperPopper}
                        handleClose={() => {
                            setIsShowHelperPopper(false);
                        }}
                        target={ref?.current}>

                        <EpistoFont
                            fontSize="fontNormal14"
                            style={{
                                maxWidth: '300px'
                            }}>

                            {translatableTexts.learningOverview.whatIsThisGraphGoodForDescription}
                        </EpistoFont>
                    </EpistoPopper>

                    <EpistoButton
                        className="tinyShadow"
                        variant={'colored'}
                        style={{
                            background: 'var(--transparentWhite70)',
                            color: 'black',
                            flex: 2
                        }}
                        onClick={() => {

                            // open all
                            if (allOrAllButOneAccordionsClosed) {

                                setOpenAccordions(personalityDescriptionAccordions
                                    .map((_, index) => index));
                            }

                            // close all
                            else {

                                setOpenAccordions([0]);
                            }
                        }}>

                        {allOrAllButOneAccordionsClosed
                            ? 'Összes kibontása'
                            : 'Összecsukás'}
                    </EpistoButton>
                </EpistoFlex2>


                <Accordion
                    index={openAccordions}>

                    {personalityDescriptionAccordions
                        .map((item, index) => {

                            return <AccordionItem
                                key={index}
                                className="roundBorders mildShadow"
                                p="5px 0"
                                background="var(--transparentWhite70)"
                                onClick={() => {
                                    setOpenAccordions([index]);
                                }}>

                                {/* header */}
                                <AccordionButton>

                                    <EpistoDiv
                                        flex='1'
                                        fontWeight="500"
                                        fontSize="15px"
                                        textAlign='left'>

                                        {item.title}
                                    </EpistoDiv>

                                    <AccordionIcon />
                                </AccordionButton>

                                {/* content  */}
                                <AccordionPanel
                                    // pb={'4px'}
                                    //mt="10px"
                                    fontSize="13px">

                                    {item.description}
                                </AccordionPanel>
                            </AccordionItem>;
                        })}
                </Accordion>
            </EpistoFlex2>
        </EpistoFlex2>
    </LoadingFrame >;
};
