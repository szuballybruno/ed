import { Flex } from "@chakra-ui/layout"
import { Typography } from "@mui/material"
import { getAssetUrl } from "../static/frontendHelpers"
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
                src={getAssetUrl("images/maintenance3D.png")} />

            <EpistoHeader
                mt="20px"
                mb="5px"
                variant="giant"
                text="Ez egy előre tervezett leállás, és átlagosan maximum 30 percig tart."></EpistoHeader>

            <Typography>

                Ha bármilyen kérdésed lenne, írj bátran a <a style={{color: "blue"}} href="mailto:support@epistogram.com">support@epistogram.com</a> e-mail címre
            </Typography>
        </Flex>
    </Flex>
}