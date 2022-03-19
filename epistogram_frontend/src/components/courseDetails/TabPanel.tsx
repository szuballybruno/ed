import { Box } from "@chakra-ui/react";
import { Typography } from "@mui/material";
import { EpistoFont } from "../controls/EpistoFont";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
    style?: React.CSSProperties;
}

export function TabPanel(props: TabPanelProps) {
    const { children, value, index, style, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            style={style}
            {...other}>
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <EpistoFont>{children}</EpistoFont>
                </Box>
            )}
        </div>
    );
}