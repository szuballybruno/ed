import { Box } from '@chakra-ui/react';
import { Typography } from '@mui/material';
import { EpistoFont } from '../controls/EpistoFont';

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
            className='whall'
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            style={style}
            {...other}>
            {value === index && (
                <Box
                    flex='1'
                    sx={{ p: 3, width: '100%', height: '100%' }}>

                    {children}
                </Box>
            )}
        </div>
    );
}