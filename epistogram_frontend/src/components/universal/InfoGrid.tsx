import { EpistoGrid } from "../controls/EpistoGrid"
import { FlexFloat } from "../controls/FlexFloat"

export const InfoGrid = (props: { infos: string[] }) => {

    const { infos } = props;

    return <EpistoGrid
        auto="fill"
        minColumnWidth="150px"
        gap="5px"
        mt="20px">
        {infos
            .map(info => <FlexFloat
                p="10px"
                boxShadow="0"
                borderRadius="0"
                borderLeft="4px solid var(--epistoTeal)">
                {info}
            </FlexFloat>)}
    </EpistoGrid>
}