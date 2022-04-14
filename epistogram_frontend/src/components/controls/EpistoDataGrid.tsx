import { DataGridPro, GridCellParams, GridColDef, GridRenderCellParams, useGridApiContext, useGridApiRef } from '@mui/x-data-grid-pro';
import { ReactNode, useCallback, useEffect } from 'react';
import { loggingSettings } from '../../static/Environemnt';
import { typedMemo } from '../../static/frontendHelpers';

export type RenderCellParamsType<TKey, TRow, TField extends keyof TRow> = {
    key: TKey,
    field: TField,
    value: TRow[TField],
    row: TRow
};

export type UseCommitNewValueType<TKey, TRow> = () => {
    commitNewValue: <TField extends keyof TRow, >(key: TKey, field: TField, value: TRow[TField]) => void
}

export type RenderEditCellParamsType<TKey, TRow, TField extends keyof TRow> = RenderCellParamsType<TKey, TRow, TField> & {
    useCommitNewValue: UseCommitNewValueType<TKey, TRow>
};

export type GridColumnType<TRow, TKey, TField extends keyof TRow> = {
    field: TField;
    headerName: string;
    renderCell?: (params: RenderCellParamsType<TKey, TRow, TField>) => ReactNode | string;
    renderEditCell?: (params: RenderEditCellParamsType<TKey, TRow, TField>) => ReactNode | string;
    width?: number;
    editHandler?: (params: { rowKey: TKey, value: TRow[TField] }) => void;
    resizable?: boolean;
    type?: 'int'
};

export type InitialStateType<TSchema> = {
    pinnedColumns?: {
        left?: (keyof TSchema)[],
        right?: (keyof TSchema)[]
    }
}

export const EpistoDataGrid = typedMemo(<TSchema, TKey>(props: {
    rows: TSchema[],
    columns: GridColumnType<TSchema, TKey, any>[],
    getKey: (row: TSchema) => TKey,
    handleEdit: <TField extends keyof TSchema>(rowKey: TKey, field: TField, value: TSchema[TField]) => void,
    initialState?: InitialStateType<TSchema>,
}) => {

    const { columns, rows, initialState, handleEdit, getKey } = props;

    const columnsProcessed = columns
        .map(column => {

            const { renderCell, type, editHandler, renderEditCell, ...others } = column;

            const def: GridColDef = {
                ...others,
                editable: !!editHandler || !!renderEditCell
            };

            if (renderCell)
                def.renderCell = (cellData: GridRenderCellParams<any, any, any>) => renderCell({
                    key: getKey(cellData.row),
                    field: column.field,
                    value: cellData.row[column.field],
                    row: cellData.row
                });

            if (renderEditCell)
                def.renderEditCell = (cellData: any) => {

                    const useCommitNewValue = () => {

                        const apiContextRef = useGridApiContext();

                        const commitNewValue = <TField extends keyof TSchema,>(key: TKey, field: TField, value: TSchema[TField]) => {

                            apiContextRef
                                .current
                                .setEditCellValue({ id: key as any, field: field as any, value: value as any });

                            apiContextRef
                                .current
                                .commitCellChange({ id: key as any, field: field as any });
                        };

                        return {
                            commitNewValue
                        };
                    };

                    return renderEditCell({
                        key: getKey(cellData.row),
                        field: column.field,
                        value: cellData.row[column.field],
                        row: cellData.row,
                        useCommitNewValue
                    });
                };

            return def;
        });

    const apiRef = useGridApiRef();

    const handleCellClick = useCallback((params: GridCellParams) => {

        const isEditable = params.colDef.editable;
        if (!isEditable)
            return;

        apiRef
            .current
            .setCellMode(params.id, params.field, 'edit');
    }, [apiRef]);

    useEffect(() => {

        return apiRef
            .current
            .subscribeEvent(
                'cellModeChange',
                (params, event) => {

                    event.defaultMuiPrevented = true;
                },
                {
                    isFirst: true
                });
    }, []);

    if (loggingSettings.render)
        console.log('rendering grid');

    return (
        <DataGridPro
            getRowId={x => getKey(x as TSchema) as any}
            rows={rows}
            apiRef={apiRef}
            onCellClick={handleCellClick}
            initialState={initialState as any}
            onCellEditCommit={(params) => {

                const value = params.value as any;
                const field = params.field as keyof TSchema;
                const rowKey = params.id as any as TKey;

                const column = columns
                    .single(x => x.field === field);

                const val: any = column.type === 'int'
                    ? parseInt(value as any)
                    : value;

                column.editHandler!({ rowKey, value: val });

                //     const writeField = 

                // handleEdit(rowId, field, val);
            }}
            isRowSelectable={x => false}
            columns={columnsProcessed}
            style={{
                height: '100%',
                background: 'var(--transparentWhite70)'
            }} />
    );
}, (prev, next) => {

    if (prev.getKey !== next.getKey) {

        return false;
    }

    if (prev.handleEdit !== next.handleEdit) {

        return false;
    }

    if (JSON.stringify(prev.columns) !== JSON.stringify(next.columns)) {

        return false;
    }

    if (JSON.stringify(prev.rows) !== JSON.stringify(next.rows)) {

        return false;
    }

    return true;
});