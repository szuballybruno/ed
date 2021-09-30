import { Flex, FlexProps } from "@chakra-ui/layout"
import { Typography } from "@mui/material"
import { getAssetUrl } from "../frontendHelpers"

export const EpistoConinInfo = (props: {} & FlexProps) => {

    return <Flex align="center" {...props}>

        {/* coin value  */}
        <Typography style={{ marginRight: "10px" }} variant={"button"}>23.459</Typography>

        {/* coin image */}
        <img width="30px" height="30px" src={getAssetUrl("/images/epistoCoin.png")} />
    </Flex>
}