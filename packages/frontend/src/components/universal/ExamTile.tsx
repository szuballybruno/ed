import {css, Text} from '@chakra-ui/react';
import {Environment} from '../../static/Environemnt';
import {EpistoButton} from '../controls/EpistoButton';
import {EpistoDiv} from '../controls/EpistoDiv';
import {EpistoFlex2, EpistoFlex2Props} from '../controls/EpistoFlex';
import {EpistoFont} from '../controls/EpistoFont';

export const ExamTile = (props: {
    className?: string,
} & EpistoFlex2Props) => {

    const ExamTileResultLabel = () => <EpistoFlex2
        position="absolute"
        bottom={10}
        left={1}
        justify="flex-end">

        <EpistoFlex2
            direction="row"
            justifyContent="space-around"
            alignItems="center"
            padding="4px"
            width='140px'
            bg="white"
            borderRadius="0 7px 7px 0">
            <Text
                fontSize="0.85em"
                textTransform={'uppercase'}
                color="var(--epistoTeal)">
                65%-os eredmény
            </Text>
        </EpistoFlex2>
    </EpistoFlex2>;

    const ExamTileTopPercentLabel = () => <EpistoFlex2
        position="absolute"
        bottom={10}
        right={1}
        justify="flex-end">

        <EpistoFlex2
            direction="row"
            justifyContent="space-around"
            alignItems="center"
            padding="4px"
            width='160px'
            bg="var(--epistoTeal)"
            borderRadius="7px 0 0 7px">
            <Text
                fontSize="0.85em"
                textTransform={'uppercase'}
                color="white">
                top 30% cégen belül
            </Text>
        </EpistoFlex2>
    </EpistoFlex2>;

    return <EpistoFlex2
        className="whall"
        direction="column"
        borderRadius="10px"
        position="relative"
        overflow="hidden"
        background="var(--transparentWhite70)"
        boxShadow={'1px 1px 5px 2px rgba(255,100,30,0.1)'}
        padding="5px"
        justifyContent="space-between"
        {...css}>

        {/* image  */}
        <EpistoFlex2 direction={'column'}>

            <EpistoDiv
                flex="1"
                position="relative"
                minH='250px'
                maxH='250px'>

                <EpistoDiv
                    position="relative"
                    className="whall"
                    minHeight="150px">

                    <EpistoDiv
                        position="absolute"
                        top="0"
                        height="100%"
                        width="100%"
                        padding="4px">

                        <img
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                backgroundColor: 'white',
                                borderRadius: 10
                            }}
                            src={Environment.getAssetUrl('/courseCoverImages/1.png')}
                            alt="" />

                        <EpistoFlex2 position="relative">

                            <ExamTileResultLabel />
                            <ExamTileTopPercentLabel />
                        </EpistoFlex2>
                    </EpistoDiv>
                </EpistoDiv>
            </EpistoDiv>

            {/* title */}
            <EpistoDiv
                flexBasis="80px"
                zIndex={1}>

                <EpistoFlex2
                    direction="column"
                    padding="10px">

                    <EpistoFont>

                        {'Irodai alkalmazások'}
                    </EpistoFont>

                    <EpistoFlex2 direction="column">

                        <EpistoFont
                            style={{
                                fontWeight: 'bold',
                                fontSize: 'large'
                            }}>

                            {'Menüszalagok használata az Excelben'}
                        </EpistoFont>
                    </EpistoFlex2>

                    <EpistoFlex2 mt={7}>

                        <EpistoFlex2
                            direction={'row'}
                            alignItems={'center'}
                            mr='5px'
                            flex="1">

                            <img
                                src={Environment.getAssetUrl('course_exam_tile_icons/tile_lenght_left.svg')}
                                alt={''}
                                style={{
                                    width: 15,
                                    height: 15,
                                    margin: '0 2px 0 2px'
                                }}
                            />

                            <EpistoFont
                                style={{
                                    color: 'gray'
                                }}>
                                {'52 perc'}
                            </EpistoFont>
                        </EpistoFlex2>

                        <EpistoFlex2
                            direction={'row'}
                            alignItems={'center'}
                            mr='5px'
                            flex="1">

                            <img
                                src={Environment.getAssetUrl('course_exam_tile_icons/tile_videos.svg')}
                                alt={''}
                                style={{
                                    width: 15,
                                    height: 15,
                                    margin: '0 2px 0 4px'
                                }}
                            />
                            <EpistoFont
                                style={{ color: 'grey' }}>
                                {'65%-os eredmény'}
                            </EpistoFont>
                        </EpistoFlex2>
                    </EpistoFlex2>

                    <EpistoFlex2
                        direction={'row'}
                        alignItems={'center'}
                        mt='7px'>

                        <EpistoFlex2
                            direction={'row'}
                            alignItems={'center'}
                            mr='5px'
                            flex="1">

                            <img
                                src={Environment.getAssetUrl('course_exam_tile_icons/tile_difficulty.svg')}
                                alt={''}
                                style={{
                                    width: 20,
                                    height: 20,
                                    margin: '0 2px'
                                }} />

                            <EpistoFont>
                                {'8.9/10 nehézség'}
                            </EpistoFont>
                        </EpistoFlex2>

                        <EpistoFlex2
                            direction={'row'}
                            alignItems={'center'}
                            mr='5px'
                            flex="1">

                            <img
                                src={Environment.getAssetUrl('course_exam_tile_icons/tile_questions.svg')}
                                alt={''}
                                style={{
                                    width: 20,
                                    height: 20,
                                    margin: '0 2px'
                                }} />

                            <EpistoFont>
                                {'16/23 helyes válasz'}
                            </EpistoFont>
                        </EpistoFlex2>
                    </EpistoFlex2>
                </EpistoFlex2>
            </EpistoDiv>
        </EpistoFlex2>

        <EpistoFlex2
            direction="column"
            minH="50px">

            <EpistoFlex2
                width="100%"
                justifyContent="space-between"
                padding="5">

                {/* <EpistoButton style={{
                    width: "50%",
                }}>Részletek</EpistoButton> */}

                <EpistoButton
                    variant="colored"
                    style={{
                        backgroundColor: 'white',
                        width: '100%',
                        color: '#98A4CC'
                    }}>
                    Újrapróbálom
                </EpistoButton>
            </EpistoFlex2>
        </EpistoFlex2>
    </EpistoFlex2>;
};
