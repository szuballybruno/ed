import { DataGridPro, GridColDef } from "@mui/x-data-grid-pro";
import { ReactNode } from "react";

export type GridColumnType<TRow, TKey, TField extends keyof TRow> = {
    field: TField;
    headerName: string;
    renderCell?: (key: TKey, field: TField, value: TRow[TField], rowData: Partial<TRow>) => ReactNode | string;
    width?: number;
    resizable?: boolean;
};

export type InitialStateType<TSchema> = {
    pinnedColumns?: {
        left?: (keyof TSchema)[],
        right?: (keyof TSchema)[]
    }
}

export const EpistoDataGrid = <TSchema, TKey>(props: {
    rows: TSchema[],
    columns: GridColumnType<TSchema, TKey, any>[],
    getKey: (row: TSchema) => TKey,
    initialState?: InitialStateType<TSchema>
}) => {

    const { columns, rows, initialState, getKey } = props;

    const columnsProcessed = columns
        .map(column => {

            const { renderCell, ...others } = column;

            return {
                editable: false,
                renderCell: renderCell
                    ? (props: any) => renderCell(getKey(props.row), column.field, props.row[column.field], props.row)
                    : undefined,
                ...others
            } as GridColDef;
        });

    return <DataGridPro
        className="fontExtraSmall"
        autoHeight
        rows={rows}
        getRowId={x => getKey(x as any) as any}
        columns={columnsProcessed}
        sx={{
            '& .MuiDataGrid-cell': {
                outline: "none"
            },
            '& .MuiDataGrid-cell:hover': {
                outline: "none"
            },
            '& .MuiDataGrid-cell:focus': {
                outline: "none"
            },
        }}
        isRowSelectable={x => false}
        initialState={initialState as any}
        onCellClick={(_, e) => e.stopPropagation()}
        onCellDoubleClick={(_, e) => e.stopPropagation()}
        onCellEditStart={(_, e) => e.stopPropagation()}
        onRowClick={(_, e) => e.stopPropagation()}
        onRowDoubleClick={(_, e) => e.stopPropagation()}
        onRowEditStart={(_, e) => e.stopPropagation()}
        onCellKeyDown={(x, e) => e.stopPropagation()}
        style={{
            background: "var(--transparentWhite70)"
        }} />
}