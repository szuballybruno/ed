import { ArrowBack } from '@mui/icons-material';
import { ReactNode } from 'react';
import { Responsivity } from '../../helpers/responsivity';
import { Environment } from '../../static/Environemnt';
import { hasValue, isString } from '../../static/frontendHelpers';
import { EpistoButton } from '../controls/EpistoButton';
import { EpistoDiv } from '../controls/EpistoDiv';
import { EpistoFlex2 } from '../controls/EpistoFlex';
import { EpistoFont } from '../controls/EpistoFont';
import { EpistoImage } from '../controls/EpistoImage';
import { EpistoHeader } from '../EpistoHeader';

export const SurveyWrapper = (props: {
    children?: ReactNode,
    nextButtonTitle?: string
    currentImage?: string,

    onNext?: () => void,
    onNavPrevious?: () => void
    title?: string,
    upperTitle?: string,
    description?: string | ReactNode,
    bottomComponent?: ReactNode,
    upperComponent?: ReactNode,
    headerRightButton?: { name: string, action: () => void }
}) => {

    const { onNavPrevious, headerRightButton } = props;
    const canNavPrevious = !!onNavPrevious;

    const description = props.description;
    const hasDescription = !!description;

    const title = props.title;
    const hasTitle = props.title;

    const upperTitle = props.upperTitle;
    const hasUpperTitle = !!upperTitle;

    const nextButtonTitle = props.nextButtonTitle;
    const currentImage = props.currentImage;
    const hasImage = hasValue(currentImage);
    const children = props.children;
    const onNext = props.onNext;

    const { isMobile } = Responsivity
        .useIsMobileView();

    // TODO clarivy
    const isLargerThan1350 = Responsivity
        .useIsLargerThan('1350px');

    return <EpistoFlex2
        id="signupWrapperRoot"
        direction="column"
        alignItems="center"
        width="100%"
        height="100%"
        px={isLargerThan1350 ? 125 : 0}
        zIndex="3"
        maxH="100vh"
        position="relative">

        {/* header */}
        <EpistoFlex2
            id="header"
            direction="column"
            width="100%"
            height="100px"
            py="25px"
            maxH="100px">

            {/* logo */}
            <EpistoFlex2
                height='50px'
                width="100%"
                hidden={window.innerWidth > 1000}
                justify={'center'}
                align={'center'}>

                <EpistoImage maxH='50px'
                    src={Environment.getAssetUrl('/images/logo.svg')} />
            </EpistoFlex2>

            {/* header top */}
            <EpistoFlex2
                id="titleAligner"
                height="80px"
                justify="space-between">

                <EpistoFlex2
                    height='80px'
                    width="100%"
                    hidden={window.innerWidth < 1000}
                    justifyContent={'center'}
                    alignItems={'center'}>

                    <EpistoImage maxH='80px'
                        src={Environment.getAssetUrl('/images/logo.svg')} />
                </EpistoFlex2>

            </EpistoFlex2>

        </EpistoFlex2>

        {/* content aligner */}
        <EpistoFlex2
            id="contentAligner"
            align="center"
            justify="center"
            maxW="100%"
            flex="1"
            overflowY={'scroll'}>

            {/* content */}
            <EpistoFlex2
                direction={isMobile ? 'column' : 'row'}
                id="content"
                wrap="nowrap"
                justify="center"
                align="center"
                width={isLargerThan1350 ? '100vw' : '90vw'}
                height={'90%'}>

                {/* image */}
                {hasImage && <EpistoFlex2
                    flex="5"
                    align="center"
                    flexShrink={1}
                    minWidth={isMobile ? undefined : '300px'}
                    minH={isMobile ? undefined : '400px'}
                    height={isMobile ? '250px' : '400px'}
                    margin={isMobile ? '0 0 20px 0' : undefined}
                    justifyContent={!isMobile ? 'flex-end' : 'center'}>

                    <EpistoImage
                        maxW='350px'
                        minWidth={isMobile ? undefined : '300px'}
                        maxH="300px"
                        height="100%"
                        style={{
                            objectFit: 'contain',
                            margin: isMobile ? '0' : '0 30px'
                        }}
                        src={currentImage!} />
                </EpistoFlex2>}

                {/* question content */}
                <EpistoFlex2
                    id="content"
                    flex="5"
                    minWidth={isMobile ? undefined : '400px'}//window.innerWidth > 500 ? 300 : "calc(100% - 200px)"}
                    direction="column">

                    {/* title */}
                    {hasTitle && <EpistoHeader
                        textHeight={isMobile ? '100%' : undefined}
                        variant="strongSub"
                        type="strong"
                        m={isMobile ? '10px 10px 10px 0' : '10px 10px 30px 0px'}
                        alignSelf={hasImage ? 'flex-start' : 'center'}
                        text={title!}
                        maxW={isMobile ? '100%' : '400px'}>
                    </EpistoHeader>}

                    {/* description */}
                    {hasDescription && <EpistoDiv maxWidth="400px">
                        {
                            isString(description!)
                                ? <EpistoFont
                                    isMultiline
                                    fontSize2="normal">
                                    {description!}
                                </EpistoFont>
                                : description
                        }
                    </EpistoDiv>}

                    {/* content */}
                    <EpistoFlex2
                        direction='column'
                        justify={hasImage ? 'flex-start' : 'center'}>
                        {children}
                    </EpistoFlex2>

                </EpistoFlex2>
            </EpistoFlex2>
        </EpistoFlex2>

        {/* progress bar */}
        <EpistoFlex2
            wrap='nowrap'
            align="center"
            height="60px"
            width="100%"
            borderRadius="7px"
            bgColor="white"
            justifyContent={isMobile ? 'center' : 'space-between'}
            boxShadow={'5px 5px 15px 3px rgba(0,0,0,0.07)'}
            px="10px"
            my={isMobile ? '0' : '20'}
        >

            {/* back button */}
            {canNavPrevious && <EpistoButton
                onClick={() => onNavPrevious!()}
                variant="outlined"
                style={{
                    marginTop: '0',
                    height: 40,
                    width: 40,
                    color: '#7CC0C2',
                    backgroundColor: '#7CC0C24F',
                    border: 'none',
                    boxShadow: '1px 1px 5px 1px rgba(0,0,0,0.1)'
                }}>

                <ArrowBack />
            </EpistoButton>}

            <EpistoDiv
                id="footerBox"
                flex="1"
                pl={isMobile ? '10px' : '0'}
                mx={isMobile ? '5px' : '20'}>
                {props.bottomComponent}
            </EpistoDiv>

            {/* next button */}
            {onNext && <EpistoButton
                variant={'outlined'}
                onClick={() => onNext!()}
                style={{
                    alignSelf: 'center',
                    color: 'white',
                    backgroundColor: '#97C9CC',
                    height: '40px',
                    border: 'none',
                    boxShadow: '1px 1px 5px 1px rgba(0,0,0,0.2)'
                }}>

                {nextButtonTitle}
            </EpistoButton>}

        </EpistoFlex2>
    </EpistoFlex2>;
};
