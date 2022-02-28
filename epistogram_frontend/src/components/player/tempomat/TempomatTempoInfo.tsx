import { Flex } from "@chakra-ui/react"
import { InfoOutlined } from "@mui/icons-material"
import { getAssetUrl } from "../../../static/frontendHelpers"
import { EpistoFont } from "../../controls/EpistoFont"

export const TempomatTempoInfo = (props: {
    onClick: () => void
}) => {

    const { onClick } = props;

    return (
        <Flex direction="column">

            {/* Current speed title and info */}
            <Flex
                align="center">

                <EpistoFont fontSize="fontSmall">

                    A tanfolyam tempója
                </EpistoFont>

                <InfoOutlined
                    style={{
                        height: "15px"
                    }} />
            </Flex>

            {/* Current speed and settings button */}
            <Flex
                align="center"
                flex="1">

                <img
                    src={getAssetUrl("/images/balancedmode.png")}
                    alt=""
                    style={{
                        height: "25px",
                        width: "25px",
                        marginRight: 5
                    }} />

                <EpistoFont
                    fontSize="fontSmall"
                    style={{
                        margin: "0 5px",
                        fontWeight: 600
                    }}>

                    Kiegyensúlyozott
                </EpistoFont>

                <img
                    onClick={onClick}
                    src={getAssetUrl("/images/tempomatsettings.png")}
                    alt=""
                    style={{
                        height: "20px",
                        width: "20px",
                        marginRight: 5
                    }} />
            </Flex>
        </Flex>
    )
}