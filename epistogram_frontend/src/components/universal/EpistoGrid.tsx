import { Grid } from "@chakra-ui/layout"
import { ReactNode } from "react"

export const EpistoGrid = (props: {
    children: ReactNode,
    minColumnWidth: string,
    columnGap: string
}) => {

    return <Grid
        templateColumns={`repeat(auto-fit, minmax(${props.minColumnWidth}, 1fr))`}
        gap={props.columnGap}>
        {props.children}
    </Grid>
}