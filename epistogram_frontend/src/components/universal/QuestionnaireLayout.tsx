import { Box, Flex, FlexProps } from '@chakra-ui/react';
import React, { ReactNode } from 'react';
import { LoadingFrame, LoadingFramePropsType } from '../HOC/LoadingFrame';
import { EpistoButton } from './EpistoButton';
import { EpistoText } from './EpistoText';

export const QuestionnaireLayout = (props: {
    title: string,
    children: ReactNode,
    contentClickable: boolean,
    loadingProps: LoadingFramePropsType,
    onlyShowAnswers?: boolean,
    buttonWrapperStyles?: React.CSSProperties | undefined,
    answerAction?: () => void
} & FlexProps) => {

    const { title, answerAction, contentClickable, children, loadingProps, onlyShowAnswers, buttonWrapperStyles, ...css } = props;

    return (
        <Flex id="questionnaireLayoutRoot" direction="column" p="20px" align="center" {...css}>

            {/* header */}
            <Flex
                display={onlyShowAnswers === true ? "none" : undefined}
                direction="column"
                align="center"
                alignSelf="center">

                {/* title */}
                <Flex align="center">
                    <img
                        style={{
                            borderRadius: "50%",
                            padding: "8px",
                            width: "50px",
                            height: "50px",
                            marginRight: "30px"
                        }}
                        alt=""
                        src="https://static.thenounproject.com/png/92068-200.png"
                        className="tinyShadow" />

                    <EpistoText
                        isAutoFontSize
                        text={title}
                        style={{ width: "100%" }} />
                </Flex>

                {/* divider */}
                <Box width="70%" bg="var(--epistoTeal)" height="2px" m="4px" />
            </Flex>

            {/* content */}
            <LoadingFrame {...loadingProps}>
                <Flex
                    style={{ ...buttonWrapperStyles }}
                    id="answersListContainer"
                    direction="column"
                    width="100%"
                    mt="20px"
                    pointerEvents={contentClickable ? "all" : "none"}>
                    {children}
                </Flex>
            </LoadingFrame>

            {/* footer */}
            <Flex alignSelf="stretch" justifyContent="flex-end">
                {answerAction && <EpistoButton
                    variant="outlined"
                    onClick={answerAction}>
                    Kuldes
                </EpistoButton>}
            </Flex>
        </Flex>
    );
}
