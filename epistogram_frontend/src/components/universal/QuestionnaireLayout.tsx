import { Box, Flex, FlexProps } from '@chakra-ui/react';
import React, { ReactNode } from 'react';
import { EpistoText } from '../controls/EpistoText';
import { LoadingFrame, LoadingFramePropsType } from '../system/LoadingFrame';

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
        <Flex id="questionnaireLayoutRoot" direction="column" p="0 0 20px 0" align="center" {...css}>

            {/* header */}
            <Flex
                display={onlyShowAnswers === true ? "none" : undefined}
                direction="column"
                align="center"
                p="20px"
                alignSelf="center">

                {/* title */}
                <Flex align="center">

                    <EpistoText
                        isAutoFontSize
                        text={title}
                        style={{ width: "100%", fontSize: 17, fontWeight: 500 }} />
                </Flex>
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
        </Flex>
    );
}
