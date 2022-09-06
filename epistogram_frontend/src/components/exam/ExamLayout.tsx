import {Flex, FlexProps} from '@chakra-ui/react';
import {ArrowBack} from '@mui/icons-material';
import {ReactNode} from 'react';
import {isString} from '../../static/frontendHelpers';
import {EpistoButton} from '../controls/EpistoButton';
import {EpistoFont} from '../controls/EpistoFont';
import {EpistoStepper, StepperLogicType} from '../universal/EpistoStepper';

type ExamLayoutButtonProps = {
    title: string,
    action: () => void,
    icon?: any,
    iconPosition?: 'start' | 'end'
};

export const ExamLayout = (props: {
    children: ReactNode,
    headerLeftItem?: string | ReactNode,
    headerCenterText?: string,
    isHeightMaximized?: boolean,
    stepperLogic?: StepperLogicType<'QuestionVersion'>,
    handleBack?: () => void,
    showFooterButtonsOnTop?: boolean,
    footerButtons?: (ExamLayoutButtonProps)[],
    headerButtons?: (ExamLayoutButtonProps)[],
    isFirst?: boolean
} & FlexProps) => {

    const {
        headerButtons,
        footerButtons,
        headerCenterText,
        headerLeftItem,
        children,
        handleBack,
        isHeightMaximized,
        showFooterButtonsOnTop,
        stepperLogic,
        isFirst,
        ...css
    } = props;

    const ExamLayoutButton = (args: ExamLayoutButtonProps) => {

        const {
            title,
            action,
            icon,
            iconPosition
        } = args;

        return <EpistoButton
            variant={'colored'}
            onClick={action}
            style={{
                height: '40px',
                marginLeft: '10px'
            }}>
            {iconPosition === 'start' && icon}
            {title}
            {iconPosition === 'end' && icon}
        </EpistoButton>;
    };

    const HeaderButtons = () => {
        return <Flex>

            {/* other buttons */}
            {headerButtons && headerButtons
                .map((x, i) => <ExamLayoutButton
                    key={i}
                    {...x} />)}
        </Flex>;
    };

    const FooterButtons = () => {

        return <Flex>

            {/* other buttons */}
            {footerButtons && footerButtons
                .map((x, i) => <ExamLayoutButton
                    key={i}
                    {...x} />)}
        </Flex>;
    };

    return <Flex
        id='ExamLayout-root'
        minH='calc(100vh - 200px)'
        maxH={isHeightMaximized ? '100vh - 120px' : 'unset'}
        height='100%'
        width='100%'
        px='5px'
        direction="column"
        alignItems="center"
        {...css}>

        {/* header */}
        <Flex
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
            pl={20}>

            <Flex minWidth="200">

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
            </Flex>

            <Flex
                flex="1"
                align="center"
                justify="center">

                <EpistoFont>
                    {headerCenterText}
                </EpistoFont>
            </Flex>

            <Flex minWidth="200"
                justify="flex-end"
                pr='10px'>

                {headerButtons && <HeaderButtons />}

                {(showFooterButtonsOnTop && !headerButtons) && <FooterButtons />}
            </Flex>

        </Flex>

        {/* content */}
        <Flex
            id='ExamLayout-content'
            flex="1"
            my="20px"
            minH="300px"
            width="100%"
            align="center"
            justify="center"
            direction="column"
            {...css}>

            {children}
        </Flex>

        {/* footer */}
        <Flex
            id='ExamLayout-footer'
            width="100%"
            className="roundBorders mildShadow"
            background="var(--transparentWhite70)"
            height="60px"
            align='center'
            mb='5px'
            p={20}>

            {/* back button */}
            {(handleBack && !isFirst) && ExamLayoutButton({
                title: 'Vissza',
                action: handleBack,
                icon: <ArrowBack />,
                iconPosition: 'start'
            })}

            {/* progress line */}
            <Flex
                flex={1}
                px={10}
                justify='center'
                alignItems={'center'}>

                {stepperLogic && <EpistoStepper stepperLogic={stepperLogic} />}

            </Flex>

            <FooterButtons />
        </Flex>
    </Flex>;
};
