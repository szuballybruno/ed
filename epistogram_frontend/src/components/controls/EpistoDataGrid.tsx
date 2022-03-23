import { DataGridPro, GridColDef } from "@mui/x-data-grid-pro"
import { GridInitialStatePro } from "@mui/x-data-grid-pro/models/gridStatePro";
import { ReactNode } from "react";

export type GridColumnType<TRow> = Omit<GridColDef, 'field' | 'renderCell'> & {
    field: keyof TRow;
    renderCell?: (rowData: TRow) => ReactNode | string;
};

export type GridRowType<T> = {
    id: number;
} & T;

export type InitialStateType<TSchema> = {
    pinnedColumns?: {
        left?: (keyof TSchema)[],
        right?: (keyof TSchema)[]
    }
}

export const EpistoDataGrid = <TSchema,>(props: {
    rows: GridRowType<TSchema>[],
    columns: GridColumnType<TSchema>[],
    initialState?: InitialStateType<TSchema>
}) => {

    const { columns, rows, initialState } = props;

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
        initialState={initialState as any}
        style={{
            background: "var(--transparentWhite70)"
        }} />
}