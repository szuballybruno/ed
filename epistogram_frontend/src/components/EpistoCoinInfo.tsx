import { Flex, FlexProps } from "@chakra-ui/layout";
import { Typography } from "@mui/material";
import { useCoinBalance } from "../services/api/coinTransactionsApiService";
import { EpistoFont } from "./controls/EpistoFont";
import { EpistoConinImage } from "./universal/EpistoCoinImage";

export const EpistoConinInfo = (props: {} & FlexProps) => {

    const { coinBalance } = useCoinBalance();

    return <Flex align="center"
{...props}>

        {/* coin value  */}
        <EpistoFont
            style={{ marginRight: "5px" }}
            fontSize="fontHuge">

            {coinBalance}
        </EpistoFont>

        {/* coin image */}
        <EpistoConinImage />
    </Flex>;
};