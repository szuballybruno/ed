import { CSSProperties, ReactNode } from 'react';
import { Responsivity } from '../../helpers/responsivity';
import { Environment } from '../../static/Environemnt';
import { EpistoFlex2 } from '../controls/EpistoFlex';
import { EpistoFont } from '../controls/EpistoFont';

export const DesktopExamLayoutContent = (props: {
    children: ReactNode,
    title: string,
    style?: CSSProperties
}) => {

    const { children, title, style } = props;

    return (
        <EpistoFlex2
            id="examLayoutContentRoot"
            className='roundBorders mildShadow'
            direction={'column'}
            alignItems={'center'}
            justifyContent={'center'}
            width={'100%'}
            flex='1'
            background='var(--transparentWhite70)'
            style={style}>

            <EpistoFlex2
                maxW='calc(100% - 100px)'
                direction='column'>

                {/* header */}
                <EpistoFlex2
                    id="examLayoutContentHeader"
                    padding='20px 0 40px 0'
                    minWidth='400px'
                    align="center">

                    <img
                        style={{
                            padding: '8px',
                            width: '70px',
                            height: '70px',
                            objectFit: 'contain',
                            marginRight: '30px',
                            marginLeft: '-5px'
                        }}
                        alt=""
                        src={Environment.getAssetUrl('/images/rightanswer3D.png')} />

                    <EpistoFont fontWeight='heavy'>
                        {title}
                    </EpistoFont>
                </EpistoFlex2>

                {/* answers */}
                <EpistoFlex2
                    id="examLayoutContentContainer"
                    direction={'row'}
                    minWidth='500px'
                    justifyContent={'center'}
                    pt='10px'>

                    {children}
                </EpistoFlex2>
            </EpistoFlex2>

        </EpistoFlex2>
    );
};

export const MobileExamLayoutContent = (props: {
    children: ReactNode,
    title: string,
    style?: CSSProperties
}) => {

    const { children, title, style } = props;

    return (
        <EpistoFlex2
            id="examLayoutContentRoot"
            className='roundBorders mildShadow'
            direction={'column'}
            alignItems={'center'}
            justifyContent={'center'}
            width={'100%'}
            flex='1'
            background='var(--transparentWhite70)'
            style={style}>

            <EpistoFlex2
                direction='column'>

                {/* header */}
                <EpistoFlex2
                    direction='column'
                    id="examLayoutContentHeader"
                    padding='0 20px 20px 20px'
                    align="center">

                    <img
                        style={{
                            padding: '8px',
                            width: '70px',
                            height: '70px',
                            objectFit: 'contain',
                            marginRight: '30px',
                            marginLeft: '-5px'
                        }}
                        alt=""
                        src={Environment.getAssetUrl('/images/rightanswer3D.png')} />

                    <EpistoFont
                        style={{
                            textAlign: 'center'
                        }}
                        fontWeight='heavy'>
                        {title}
                    </EpistoFont>
                </EpistoFlex2>


                {children}
            </EpistoFlex2>

        </EpistoFlex2>
    );
};

export const ExamLayoutContent = (props: {
    children: ReactNode,
    title: string,
    style?: CSSProperties
}) => {

    const { isMobile } = Responsivity
        .useIsMobileView();

    return isMobile
        ? <MobileExamLayoutContent {...props} />
        : <DesktopExamLayoutContent {...props} />;
};
