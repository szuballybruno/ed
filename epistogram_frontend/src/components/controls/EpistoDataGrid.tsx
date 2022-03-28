import { DataGridPro, GridCellParams, GridColDef, MuiEvent, useGridApiRef } from "@mui/x-data-grid-pro";
import { ReactNode } from "react";
import { EpistoEntry } from "./EpistoEntry";

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

    // const handleEdit = <TField extends keyof TSchema,>(key: TKey, field: TField, fieldValue: GridRowType<TSchema>[TField]) => {

    //     if (!onEdit)
    //         return;

    //     const row = rows
    //         .single(row => getKey(row) === key);

    //     const newRow = { ...row };
    //     newRow[field] = fieldValue;

    //     onEdit(field, newRow);
    // }

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
        onCellKeyDown={(x, e) => e.stopPropagation()}
        style={{
            background: "var(--transparentWhite70)"
        }} />
}