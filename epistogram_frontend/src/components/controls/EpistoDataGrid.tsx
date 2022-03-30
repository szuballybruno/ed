import { DataGridPro, GridCellParams, GridColDef, useGridApiRef } from "@mui/x-data-grid-pro";
import { ReactNode, useCallback, useEffect } from "react";

export type GridColumnType<TRow, TKey, TField extends keyof TRow> = {
    field: TField;
    headerName: string;
    renderCell?: (params: { key: TKey, field: TField, value: Partial<TRow>[TField], row: Partial<TRow> }) => ReactNode | string;
    renderEditCell?: (params: { key: TKey, field: TField, value: Partial<TRow>[TField], row: Partial<TRow> }) => ReactNode | string;
    width?: number;
    editable?: boolean;
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
    handleEdit: <TField extends keyof TSchema>(rowKey: TKey, field: TField, value: TSchema[TField]) => void,
    initialState?: InitialStateType<TSchema>,
}) => {

    const { columns, rows, initialState, handleEdit, getKey } = props;

    const columnsProcessed = columns
        .map(column => {

            const { renderCell, editable, renderEditCell, ...others } = column;

            const def: GridColDef = {
                ...others,
                editable
            };

            if (renderCell)
                def.renderCell = (props: any) => renderCell({
                    key: getKey(props.row),
                    field: column.field,
                    value: props.row[column.field],
                    row: props.row
                });

            if (renderEditCell)
                def.renderEditCell = (props: any) => renderEditCell({
                    key: getKey(props.row),
                    field: column.field,
                    value: props.row[column.field],
                    row: props.row
                });

            return def;
        });

    console.log(columnsProcessed)

    const apiRef = useGridApiRef();

    const handleCellClick = useCallback((params: GridCellParams) => {

        const isEditable = params.colDef.editable;
        if (!isEditable)
            return;

        apiRef
            .current
            .setCellMode(params.id, params.field, "edit");
    }, [apiRef]);

    const endCellEdit = useCallback((rowKey: any, field: any) => {

        apiRef
            .current
            .setCellMode(rowKey, field, "view");
    }, [apiRef]);

    useEffect(() => {

        return apiRef
            .current
            .subscribeEvent(
                "cellModeChange",
                (params, event) => {

                    event.defaultMuiPrevented = true;
                },
                {
                    isFirst: true
                });
    }, []);

    return <DataGridPro
        getRowId={x => getKey(x as TSchema) as any}
        rows={rows}
        apiRef={apiRef}
        onCellClick={handleCellClick}
        initialState={initialState as any}
        onCellEditCommit={({ id, value, field }) => handleEdit(id as any, field as any, value as any)}
        isRowSelectable={x => false}
        columns={columnsProcessed}
        autoHeight
        sx={{
            // '& .MuiDataGrid-cell': {
            //     outline: "none"
            // },
            // '& .MuiDataGrid-cell:hover': {
            //     outline: "none"
            // },
            // '& .MuiDataGrid-cell:focus': {
            //     outline: "none"
            // },
        }}
        style={{
            background: "var(--transparentWhite70)"
        }} />

    // return <DataGridPro
    //     className="fontExtraSmall"
    //     autoHeight
    //     rows={rows}
    //     getRowId={x => getKey(x as any) as any}
    //     columns={columnsProcessed}
    //     sx={{
    //         // '& .MuiDataGrid-cell': {
    //         //     outline: "none"
    //         // },
    //         // '& .MuiDataGrid-cell:hover': {
    //         //     outline: "none"
    //         // },
    //         // '& .MuiDataGrid-cell:focus': {
    //         //     outline: "none"
    //         // },
    //     }}
    //     initialState={initialState as any}
    //     // isRowSelectable={x => false}
    //     // onCellClick={(_, e) => e.stopPropagation()}
    //     // onCellDoubleClick={(_, e) => e.stopPropagation()}
    //     // onCellEditStart={(_, e) => e.stopPropagation()}
    //     // onRowClick={(_, e) => e.stopPropagation()}
    //     // onRowDoubleClick={(_, e) => e.stopPropagation()}
    //     // onRowEditStart={(_, e) => e.stopPropagation()}
    //     // onCellKeyDown={(x, e) => e.stopPropagation()}
    //     style={{
    //         background: "var(--transparentWhite70)"
    //     }} />
}