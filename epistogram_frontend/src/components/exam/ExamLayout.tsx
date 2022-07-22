import { Flex, FlexProps } from '@chakra-ui/react';
import { ArrowBack, ArrowForward, Check } from '@mui/icons-material';
import { Step, StepButton, StepIconProps, StepLabel, Stepper, styled } from '@mui/material';
import { ReactNode } from 'react';
import { Id } from '../../shared/types/versionId';
import { isString } from '../../static/frontendHelpers';
import { translatableTexts } from '../../static/translatableTexts';
import { EpistoButton } from '../controls/EpistoButton';
import { EpistoFont } from '../controls/EpistoFont';
import { EpistoStepper, StepperLogicType } from '../universal/EpistoStepper';



export const ExamLayout = (props: {
    children: ReactNode,
    handleNext: () => void,
    stepperLogic?: StepperLogicType<'QuestionVersion'>,
    handleBack?: () => void,
    nextButtonTitle: string,
    showNextButton?: boolean,
    exitExamAction?: () => void,
    headerCenterText?: string,
    headerLeftItem?: string | ReactNode,
    progressValue?: number,
    isHeightMaximized?: boolean,
    showButtonsOnTop?: boolean,
    footerButtons?: ({ text: string, action: () => void })[],
} & FlexProps) => {

    const {
        exitExamAction,
        footerButtons,
        headerCenterText,
        showNextButton,
        headerLeftItem,
        children,
        progressValue,
        handleNext,
        handleBack,
        nextButtonTitle,
        isHeightMaximized,
        showButtonsOnTop,
        stepperLogic,
        ...css
    } = props;



    const footerButton = (title: string, action: () => void, icon?: any, iconFront?: any) => <EpistoButton
        variant={'colored'}
        onClick={action}
        style={{
            height: '40px',
            marginLeft: '10px'
        }}>
        {iconFront}
        {title}
        {icon}
    </EpistoButton>;

    return <Flex
        minH='calc(100vh - 120px)'
        maxH={isHeightMaximized ? '1080px' : 'unset'}
        width='100%'
        px='5px'
        direction="column"
        alignItems="center">

        {/* header */}
        <Flex
            direction={'row'}
            alignItems={'center'}
            position={!isHeightMaximized ? 'sticky' : undefined}
            top={!isHeightMaximized ? '0' : undefined}
            className="roundBorders mildShadow"
            background={!isHeightMaximized ? 'white' : 'var(--transparentWhite70)'}
            width="100%"
            zIndex='1000'
            height={60}
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

                {exitExamAction && <EpistoButton
                    onClick={exitExamAction}
                    style={{
                        minWidth: 170
                    }}
                    variant={'outlined'}>

                    {translatableTexts.exam.exitExam}
                </EpistoButton>}

                {showButtonsOnTop && <>
                    {/* other buttons */}
                    {footerButtons && footerButtons
                        .map(x => footerButton(x.text, x.action))}

                    {/* continue button */}
                    {showNextButton && footerButton(nextButtonTitle, handleNext, <ArrowForward />)}
                </>}

            </Flex>

        </Flex>

        {/* content */}
        <Flex
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
            width="100%"
            className="roundBorders mildShadow"
            background="var(--transparentWhite70)"
            height="60px"
            align='center'
            p={20}>

            {/* back button */}
            {handleBack && footerButton('Vissza', handleBack, undefined, <ArrowBack />)}

            {/* progress line */}
            <Flex
                flex={1}
                px={10}
                justify='center'
                alignItems={'center'}>

                {stepperLogic && <EpistoStepper stepperLogic={stepperLogic} />}

                {/* {progressValue !== undefined && <>
                    <LinearProgress
                        variant="determinate"
                        value={progressValue}

                        style={{
                            flex: '1',
                            marginRight: '10px'
                        }} />

                    <EpistoFont fontSize={'fontNormal14'}>
                        {`${Math.round(progressValue)}%`}
                    </EpistoFont>
                </>} */}
            </Flex>

            {/* other buttons */}
            {footerButtons && footerButtons
                .map(x => footerButton(x.text, x.action))}

            {/* continue button */}
            {showNextButton && footerButton(nextButtonTitle, handleNext, <ArrowForward />)}
        </Flex>
    </Flex>;
};
