import { DataGridPro, GridColDef } from "@mui/x-data-grid-pro";
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
    onEdit?: (field: keyof TSchema, row: GridRowType<TSchema>) => void,
    initialState?: InitialStateType<TSchema>
}) => {

    const { columns, rows, onEdit, initialState } = props;

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

    const handleEdit = <TField extends keyof TSchema,>(id: number, field: TField, value: GridRowType<TSchema>[TField]) => {

        if (!onEdit)
            return;

        const row = rows
            .single(row => row.id === id);

        const newRow = { ...row };
        newRow[field] = value;

        onEdit(field, newRow);
    }

    return <DataGridPro
        className="fontExtraSmall"
        autoHeight
        rows={rows}
        columns={columnsProcessed}
        initialState={initialState as any}
        onCellEditCommit={onEdit
            ? x => handleEdit(x.id as any, x.field as any as keyof TSchema, x.value as any)
            : undefined}
        style={{
            background: "var(--transparentWhite70)"
        }} />
}