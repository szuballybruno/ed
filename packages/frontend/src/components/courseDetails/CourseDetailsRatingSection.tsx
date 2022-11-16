import React from 'react';
import { EpistoFlex2 } from '../controls/EpistoFlex';
import { EpistoFont } from '../controls/EpistoFont';
import { EpistoProgressBar } from '../controls/EpistoProgressBar';
import { MUI } from '../controls/MUIControls';

export const CourseDetailsRatingSection = () => {
    const mockRatingProgresses = [60, 20, 10, 0, 0];

    const CourseDetailsRatingItem = () => {
        return <EpistoFlex2 width="100%"
            mt='20px'>
            <EpistoFlex2 height="100%">
                <EpistoFlex2 width='70px'
                    height='70px'
                    m='10px'
                    className={'circle'}
                    border="2px solid var(--epistoTeal)"
                    bg="var(--deepBlue)"
                    color="white"
                    alignItems={'center'}
                    justifyContent={'center'}>
                    <EpistoFont>
                        ND
                    </EpistoFont>
                </EpistoFlex2>
            </EpistoFlex2>
            <EpistoFlex2 flex={1}
                flexDir={'column'}>
                <EpistoFlex2 height='70px'
                    alignItems={'center'}
                    justifyContent={'space-between'}>
                    <EpistoFlex2 flexDir={'column'}>
                        <EpistoFont style={{
                            fontWeight: 'bold',
                            fontSize: '0.9em'
                        }}>
                            Nagy Dezső
                        </EpistoFont>
                        <EpistoFont style={{
                            fontSize: '0.8em'
                        }}>
                            Alkalmazott tudományok
                        </EpistoFont>
                    </EpistoFlex2>
                    <EpistoFlex2>
                        <MUI.Rating value={5}
                            style={{ color: 'var(--epistoTeal)' }} />
                    </EpistoFlex2>
                </EpistoFlex2>
                <EpistoFlex2 mt='20px'>
                    <EpistoFont style={{
                        fontSize: '0.8em'
                    }}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tristique suscipit tempor. Pellentesque dictum, augue a egestas faucibus, augue ipsum vehicula dui, faucibus eleifend risus orci quis ante. Curabitur porttitor fringilla blandit. Suspendisse placerat tempus vehicula. In dignissim tellus magna. Donec non tincidunt risus. Morbi sit amet turpis dolor. Proin vulputate leo eu leo bibendum, in condimentum ex efficitur.
                    </EpistoFont>
                </EpistoFlex2>
            </EpistoFlex2>
        </EpistoFlex2>;
    };

    return <EpistoFlex2 mt='10px'
        width="100%"
        height='500px'
        direction={'column'}
        alignItems={'flex-start'}>
        <EpistoFlex2 width="100%"
            height='170px'>
            <MUI.Paper>
                <EpistoFlex2 width='170px'
                    height='170px'
                    flexDir={'column'}
                    alignItems={'center'}
                    justifyContent={'center'}>

                    <EpistoFont
                        style={{
                            fontWeight: 'bold',
                            fontSize: '3em'
                        }}>
                        4.6
                    </EpistoFont>

                    <EpistoFont
                        style={{
                            fontWeight: 'bold'
                        }}>

                        Kurzus értékelése
                    </EpistoFont>
                </EpistoFlex2>
            </MUI.Paper>
            <EpistoFlex2 height='170px'
                flex={1}
                px='20px'
                flexDir={'column'}
                justifyContent={'space-evenly'}>
                {mockRatingProgresses
                    .map((x, index) => <EpistoProgressBar
                        key={index}
                        style={{
                            width: '100%',
                            height: 10,
                            borderRadius: 5,
                        }}
                        value={x}
                        variant={'determinate'} />)}
            </EpistoFlex2>
            <EpistoFlex2 width='170px'
                height='170px'
                flexDir={'column'}
                alignItems={'center'}
                justifyContent={'center'}>
                <MUI.Rating value={5}
                    style={{ color: 'var(--epistoTeal)' }} />
                <MUI.Rating value={4}
                    style={{ color: 'var(--epistoTeal)' }} />
                <MUI.Rating value={3}
                    style={{ color: 'var(--epistoTeal)' }} />
                <MUI.Rating value={2}
                    style={{ color: 'var(--epistoTeal)' }} />
                <MUI.Rating value={1}
                    style={{ color: 'var(--epistoTeal)' }} />
            </EpistoFlex2>
        </EpistoFlex2>
        <EpistoFlex2 width="100%"
            flexDir={'column'}>
            <CourseDetailsRatingItem />
            <CourseDetailsRatingItem />
            <CourseDetailsRatingItem />
            <CourseDetailsRatingItem />
            <CourseDetailsRatingItem />
        </EpistoFlex2>
    </EpistoFlex2>;
};
