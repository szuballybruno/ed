import { Flex, FlexProps } from "@chakra-ui/layout"
import { Typography } from "@mui/material"
import { EpistoConinImage } from "./universal/EpistoCoinImage"

export const EpistoConinInfo = (props: {} & FlexProps) => {

    return <Flex align="center" {...props}>

        {/* coin value  */}
        <Typography style={{ marginRight: "10px" }} variant={"button"}>23.459</Typography>

        {/* coin image */}
        <EpistoConinImage />
    </Flex>
}