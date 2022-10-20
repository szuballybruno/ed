import { ArrowBack } from '@mui/icons-material';
import { CSSProperties, ReactNode, useEffect } from 'react';
import browser from '../../services/core/browserSniffingService';
import { QuestionDTO } from '../../shared/dtos/QuestionDTO';
import { isString, useIsMobileView } from '../../static/frontendHelpers';
import { EpistoButton } from '../controls/EpistoButton';
import { EpistoFlex2, EpistoFlex2Props } from '../controls/EpistoFlex';
import { EpistoFont } from '../controls/EpistoFont';
import { useVideoPlayerFullscreenContext } from '../player/watch/videoPlayer/VideoPlayerFullscreenFrame';
import { EpistoStepper, StepperParamsType } from '../universal/EpistoStepper';

type ExamLayoutButtonType = {
    title: string,
    action: () => void,
    icon?: any,
    iconPosition?: 'start' | 'end',
    style?: CSSProperties
};

const ExamLayoutButton = (args: ExamLayoutButtonType) => {

    const {
        title,
        action,
        icon,
        iconPosition,
        style
    } = args;

    return <EpistoButton
        variant={'colored'}
        onClick={action}
        style={{
            ...{
                height: '40px',
                margin: '0 5px',
            },
            ...style
        }}>
        {iconPosition === 'start' && icon}
        {title}
        {iconPosition === 'end' && icon}
    </EpistoButton>;
};

const HeaderButtons = ({ buttons }: { buttons: ExamLayoutButtonType[] }) => {
    return <EpistoFlex2>
        {buttons
            .map((x, i) => <ExamLayoutButton
                key={i}
                {...x} />)}
    </EpistoFlex2>;
};

const FooterButtons = ({ buttons }: { buttons: ExamLayoutButtonType[] }) => {

    return <EpistoFlex2>
        {buttons
            .map((x, i) => <ExamLayoutButton
                key={i}
                {...x} />)}
    </EpistoFlex2>;
};

const MobileFooterButtons = ({ buttons }: { buttons: ExamLayoutButtonType[] }) => {

    return <>
        {buttons
            .map((x, i) => <ExamLayoutButton
                style={{
                    flex: 1
                }}
                key={i}
                {...x} />)}
    </>;
};

export interface ExamLayoutProps extends EpistoFlex2Props {
    children: ReactNode,
    headerLeftItem?: string | ReactNode,
    headerCenterText?: string,
    isHeightMaximized?: boolean,
    stepperParams?: StepperParamsType<QuestionDTO>,
    handleBack?: () => void,
    showFooterButtonsOnTop?: boolean,
    footerButtons?: (ExamLayoutButtonType)[],
    headerButtons?: (ExamLayoutButtonType)[],
    isFirst?: boolean
};

export const MobileExamLayout = ({
    headerButtons,
    footerButtons,
    headerCenterText,
    headerLeftItem,
    children,
    handleBack,
    isHeightMaximized,
    showFooterButtonsOnTop,
    stepperParams,
    isFirst,
    ...css
}: ExamLayoutProps) => {

    const [isFullscreen, setIsFullscreen] = useVideoPlayerFullscreenContext();
    const isLandscape = window.orientation === 90;
    const isIPhone = browser.isIPhone;
    const isMobile = useIsMobileView();

    useEffect(() => {
        setIsFullscreen(true);
    });

    return <EpistoFlex2
        overflowY='scroll'
        id='ExamLayout-root'
        minH={(() => {

            if (isFullscreen && isIPhone)
                return 'calc(100vh - 120px)';

            if (isIPhone)
                return 'calc(100vh - 120px)';

            if (isFullscreen)
                return '100vh';

            return undefined;
        })()}
        height='100%'
        width='100%'
        px='5px'
        direction="column"
        alignItems="center">

        {/* header */}
        < EpistoFlex2
            id='ExamLayout-header'
            direction={'row'}
            justify='space-between'
            alignItems={'center'}
            position={!isHeightMaximized ? 'sticky' : undefined}
            top={!isHeightMaximized ? '0' : undefined}
            className="roundBorders mildShadow"
            background={!isHeightMaximized ? 'white' : 'var(--transparentWhite70)'}
            width="100%"
            zIndex='1000'
            height='60px'
            minH='60px'
            pl='20px' >

            {/* header left */}
            <EpistoFlex2>

                {
                    headerLeftItem && (
                        isString(headerLeftItem)
                            ? (
                                <EpistoFont>
                                    {headerLeftItem}
                                </EpistoFont>
                            )
                            : (
                                headerLeftItem
                            )
                    )
                }
            </EpistoFlex2 >

            {/* header center 
            <EpistoFlex2
                flex="1"
                align="center"
                justify="center">

                <EpistoFont>
                    {headerCenterText}
                </EpistoFont>
            </EpistoFlex2>*/}

            {/* header buttons right */}
            <EpistoFlex2 minWidth="200"
                justify="flex-end"
                pr='10px'>

                {/* render header buttons  */}
                {headerButtons && <HeaderButtons
                    buttons={headerButtons} />}

                {/* render footer buttons in the header section  */}
                {(showFooterButtonsOnTop && !headerButtons && footerButtons) && <MobileFooterButtons
                    buttons={footerButtons} />}
            </EpistoFlex2>

        </EpistoFlex2 >

        {/* content */}
        < EpistoFlex2
            id='ExamLayout-content'
            my={'5px'}
            width="100%"
            align="center"
            justify="center"
            direction="column"
            {...css}>

            {children}
        </EpistoFlex2 >

        {/* footer */}
        < EpistoFlex2
            id='ExamLayout-footer'
            width="100%"
            className="roundBorders mildShadow"
            background="var(--transparentWhite70)"
            height="60px"
            align='center'
            justify={isFirst ? 'flex-end' : 'space-between'}
            mb='5px'
            p='20px' >

            {/* back button */}
            {
                (handleBack && !isFirst) && ExamLayoutButton({
                    title: 'Vissza',
                    style: {
                        flex: 1
                    },
                    action: handleBack,
                    //icon: <ArrowBack />,
                    iconPosition: 'start'
                })
            }

            {/* progress line 
            <EpistoFlex2
                flex={1}
                px='10px'
                justify='center'
                alignItems={'center'}>

                {stepperParams && <EpistoStepper {...stepperParams} />}

            </EpistoFlex2>*/}

            {/* render footer buttons */}
            {
                footerButtons && <MobileFooterButtons
                    buttons={footerButtons} />
            }
        </EpistoFlex2 >
    </EpistoFlex2 >;
};

export const DesktopExamLayout = ({
    headerButtons,
    footerButtons,
    headerCenterText,
    headerLeftItem,
    children,
    handleBack,
    isHeightMaximized,
    showFooterButtonsOnTop,
    stepperParams,
    isFirst,
    ...css
}: ExamLayoutProps) => {

    return <EpistoFlex2
        id='ExamLayout-root'
        minH='calc(100vh - 120px)'
        maxH={isHeightMaximized ? 'calc(100vh - 120px)' : 'unset'}
        height='100%'
        width='100%'
        px='5px'
        direction="column"
        alignItems="center"
        flex='1'
        {...css}>

        {/* header */}
        <EpistoFlex2
            id='ExamLayout-header'
            direction={'row'}
            alignItems={'center'}
            position={!isHeightMaximized ? 'sticky' : undefined}
            top={!isHeightMaximized ? '0' : undefined}
            className="roundBorders mildShadow"
            background={!isHeightMaximized ? 'white' : 'var(--transparentWhite70)'}
            width="100%"
            zIndex='1000'
            height='60px'
            minH='60px'
            pl='20px'>

            {/* header left */}
            <EpistoFlex2 minWidth="200">

                {headerLeftItem && (
                    isString(headerLeftItem)
                        ? (
                            <EpistoFont>
                                {headerLeftItem}
                            </EpistoFont>
                        )
                        : (
                            headerLeftItem
                        )
                )}
            </EpistoFlex2>

            {/* header center */}
            <EpistoFlex2
                flex="1"
                align="center"
                justify="center">

                <EpistoFont>
                    {headerCenterText}
                </EpistoFont>
            </EpistoFlex2>

            {/* header buttons right */}
            <EpistoFlex2 minWidth="200"
                justify="flex-end"
                pr='10px'>

                {/* render header buttons  */}
                {headerButtons && <HeaderButtons
                    buttons={headerButtons} />}

                {/* render footer buttons in the header section  */}
                {(showFooterButtonsOnTop && !headerButtons && footerButtons) && <FooterButtons
                    buttons={footerButtons} />}
            </EpistoFlex2>

        </EpistoFlex2>

        {/* content */}
        <EpistoFlex2
            id='ExamLayout-content'
            my={isHeightMaximized ? '20px' : '20px'}
            minH="300px"
            height='100%'
            width="100%"
            align="center"
            justify="center"
            direction="column"
            flex='1'
            {...css}>

            {children}
        </EpistoFlex2>

        {/* footer */}
        <EpistoFlex2
            id='ExamLayout-footer'
            width="100%"
            className="roundBorders mildShadow"
            background="var(--transparentWhite70)"
            height="60px"
            align='center'
            mb='5px'
            p='20px'>

            {/* back button */}
            {(handleBack && !isFirst) && ExamLayoutButton({
                title: 'Vissza',
                action: handleBack,
                icon: <ArrowBack />,
                iconPosition: 'start'
            })}

            {/* progress line */}
            <EpistoFlex2
                flex={1}
                px='10px'
                justify='center'
                alignItems={'center'}>

                {stepperParams && <EpistoStepper {...stepperParams} />}

            </EpistoFlex2>

            {/* render footer buttons */}
            {footerButtons && <FooterButtons
                buttons={footerButtons} />}
        </EpistoFlex2>
    </EpistoFlex2>;
};

export const ExamLayout = (props: ExamLayoutProps) => {

    const isMobile = useIsMobileView();

    return isMobile
        ? <MobileExamLayout
            {...props} />
        : <DesktopExamLayout {...props} />;
};
