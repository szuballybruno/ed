import { DataGridPro, GridCellParams, GridColDef, MuiEvent, useGridApiRef } from "@mui/x-data-grid-pro";
import { ReactNode } from "react";
import { EpistoEntry } from "./EpistoEntry";

export type GridColumnType<TRow> = {
    field: keyof TRow;
    type?: "int";
    headerName: string;
    width?: number;
    editable?: boolean;
    resizable?: boolean;
    renderCell?: (rowData: Partial<TRow>) => ReactNode | string;
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

export const EpistoDataGrid = <TSchema, TKey>(props: {
    rows: GridRowType<TSchema>[],
    columns: GridColumnType<TSchema>[],
    getKey: (row: GridRowType<TSchema>) => TKey,
    onEdit?: (field: keyof TSchema, row: GridRowType<TSchema>) => void,
    initialState?: InitialStateType<TSchema>
}) => {

    const { columns, rows, onEdit, initialState, getKey } = props;

    const handleEdit = <TField extends keyof TSchema,>(key: TKey, field: TField, fieldValue: GridRowType<TSchema>[TField]) => {

        if (!onEdit)
            return;

        const row = rows
            .single(row => getKey(row) === key);

        const newRow = { ...row };
        newRow[field] = fieldValue;

        onEdit(field, newRow);
    }

    const columnsProcessed = columns
        .map(column => {

            const { renderCell, editable, ...others } = column;

            const renderFn = (() => {

                if (renderCell)
                    return (props: any) => renderCell(props.row);

                if (editable)
                    return (props: any) => {

                        const row = props.row;
                        const value = row[column.field];
                        const key = getKey(row);

                        const parseValue = (val: string) => {

                            if (column.type === "int")
                                return parseInt(val);

                            return val;
                        }

                        return (
                            <EpistoEntry
                                type={column.type === "int" ? "number" : undefined}
                                transparentBackground
                                value={value + ""}
                                marginTop="0"
                                style={{ width: "100%" }}
                                onFocusLost={x => handleEdit(key, column.field, parseValue(x) as any)} />
                        );
                    }
            })();

            return {
                editable: false,
                renderCell: renderFn,
                ...others
            } as GridColDef;
        });

    return <DataGridPro
        className="fontExtraSmall"
        autoHeight
        rows={rows}
        getRowId={x => getKey(x as any) as any}
        columns={columnsProcessed}
        initialState={initialState as any}
        onCellEditCommit={onEdit
            ? x => handleEdit(x.id as any, x.field as any as keyof TSchema, x.value as any)
            : undefined}
        style={{
            background: "var(--transparentWhite70)"
        }} />
}