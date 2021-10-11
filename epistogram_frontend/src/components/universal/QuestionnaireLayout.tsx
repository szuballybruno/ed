import { Box, Flex, FlexProps } from '@chakra-ui/react';
import React, { ReactNode } from 'react';
import { LoadingFrame, LoadingFramePropsType } from '../HOC/LoadingFrame';
import { EpistoText } from './EpistoText';

export const QuestionnaireLayout = (props: {
    title: string,
    children: ReactNode,
    buttonsEnabled: boolean,
    loadingProps: LoadingFramePropsType,
    onlyShowAnswers?: boolean,
    buttonWrapperStyles?: React.CSSProperties | undefined
} & FlexProps) => {

    const { title, buttonsEnabled, children, loadingProps, onlyShowAnswers, buttonWrapperStyles, ...css } = props;

    return (
        <Flex id="questionnaireLayoutRoot" direction="column" p="20px" align="center" {...css}>

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

            {/* answers */}
            <LoadingFrame {...loadingProps}>
                <Flex
                    style={{...buttonWrapperStyles}}
                    id="answersListContainer"
                    direction="column"
                    width="100%"
                    mt="20px"
                    pointerEvents={buttonsEnabled ? "all" : "none"}>
                    {children}
                </Flex>
            </LoadingFrame>
        </Flex>
    );
}
