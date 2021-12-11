import { Flex, FlexProps } from "@chakra-ui/layout"
import { Typography } from "@mui/material"
import { useCoinBalance } from "../services/api/coinTransactionsApiService";
import { EpistoConinImage } from "./universal/EpistoCoinImage"

export const EpistoConinInfo = (props: {} & FlexProps) => {

    const { coinBalance } = useCoinBalance();

    return <Flex align="center" {...props}>

        {/* coin value  */}
        <Typography
            style={{ marginRight: "5px" }}
            className="fontHuge"
            variant={"button"}>

            {coinBalance}
        </Typography>

        {/* coin image */}
        <EpistoConinImage />
    </Flex>
}