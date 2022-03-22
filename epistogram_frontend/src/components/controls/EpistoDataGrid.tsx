import { DataGridPro, GridColDef } from "@mui/x-data-grid-pro"
import { ReactNode } from "react";

export type GridColumnType<TRow> = Omit<GridColDef, 'field' | 'renderCell'> & {
    field: keyof TRow;
    renderCell?: (rowData: TRow) => ReactNode | string;
};

export type GridRowType<T> = {
    id: number;
} & T

export const EpistoDataGrid = <TSchema,>(props: {
    rows: GridRowType<TSchema>[],
    columns: GridColumnType<TSchema>[]
}) => {

    const { columns, rows } = props;

    const columnsProcessed = columns
        .map(column => {

            const { renderCell, ...others } = column;

            return {
                ...others,
                renderCell: renderCell
                    ? (props) => renderCell(props.row)
                    : undefined
            } as GridColDef;
        });

    return <DataGridPro
        className="fontExtraSmall"
        autoHeight
        rows={rows}
        columns={columnsProcessed}
        initialState={{
            // pinnedColumns: {
            //     left: ['orderIndex', 'title'],
            //     right: ['item']
            // }
        }}
        style={{
            background: "var(--transparentWhite70)"
        }} />
}