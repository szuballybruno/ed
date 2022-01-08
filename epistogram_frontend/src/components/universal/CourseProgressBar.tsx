import { Flex, FlexProps } from "@chakra-ui/layout";
import { LinearProgress, Typography } from "@mui/material";

export const CourseProgressBar = (props: { value: number, label: string } & FlexProps) => {

    const { value, label, ...css } = props;
    const roundValue = Math.round(value);

    return (
        <Flex align="center" {...css}>

            <LinearProgress variant="determinate" value={value} style={{ flex: "1", marginRight: "10px" }} />

            <Typography variant="body2" color="text.secondary">
                {`${roundValue}%`}
            </Typography>
        </Flex>
    );
}