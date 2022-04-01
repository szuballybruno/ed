import { Box, Flex } from "@chakra-ui/react";
import Button from "@mui/material/Button";
import { ReactNode } from "react";

export const OverlayDialog = (props: {
    children: ReactNode,
    showCloseButton?: boolean,
    closeButtonAction?: () => void
}) => {

    return <Box
        id="questionnaireDialog"
        bg="white"
        p="20px"
        borderRadius="20px"
        boxShadow="0 0 20px #0000004a">

        {/* questionnaire */}
        {props.children}

        {/* close button */}
        <Flex mt="20px"
justify="flex-end"
display={props.showCloseButton ? "flex" : "none"}>
            <Button
                variant="outlined"
                onClick={() => {

                    if (props.closeButtonAction)
                        props.closeButtonAction();
                }}>
                Bezárás
            </Button>
        </Flex>
    </Box>;
};