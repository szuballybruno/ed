import { Flex } from "@chakra-ui/layout"
import { Typography } from "@mui/material"
import { EpistoHeader } from "./EpistoHeader"

export const UnderMaintanence = () => {

    return <Flex align="center" justify="center" w="100vw" h="100vh">

        <Flex direction="column" align="center">
            <img
                alt=""
                style={{
                    width: "400px",
                    objectFit: "contain"
                }}
                src="https://pbs.twimg.com/media/EDSNRZjXUAEneoE.png" />

            <EpistoHeader
                mt="20px"
                mb="5px"
                variant="giant"
                text="Az applikáció jelenleg karbantartás alatt áll!"></EpistoHeader>

            <Typography>
                Ez egy előre tervezett leállás, és átlagosan rövid ideig tart.
            </Typography>
        </Flex>
    </Flex>
}