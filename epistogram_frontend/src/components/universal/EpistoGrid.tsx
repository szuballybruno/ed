import { Grid, GridProps } from "@chakra-ui/layout"
import { ReactNode } from "react"

export const EpistoGrid = (props: {
    children: ReactNode,
    minColumnWidth: string,
    columnGap: string
} & GridProps) => {

    const { minColumnWidth, columnGap, children, ...css } = props;

    return <Grid
        templateColumns={`repeat(auto-fit, minmax(${minColumnWidth}, 1fr))`}
        gap={columnGap}
        {...css}>
        {children}
    </Grid>
}