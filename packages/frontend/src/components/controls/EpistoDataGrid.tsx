import { DataGridPro, GridCellParams, GridColDef, GridRenderCellParams, useGridApiContext, useGridApiRef } from '@mui/x-data-grid-pro';
import { ReactNode, useCallback, useEffect } from 'react';
import { areArraysEqual, typedMemo } from '../../static/frontendHelpers';
import { Logger } from '../../static/Logger';
import { EpistoFlex2 } from './EpistoFlex';

const removeOverlay = () => {

    const key = 'MUI X: Missing license key';
    const xpath = `//div[text()='${key}']`;
    const matchingElement = document
        .evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null)
        .singleNodeValue;

    if (!matchingElement)
        return;

    (matchingElement as any).remove();
};

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
    transformer?: (params: { value: TRow[TField] }) => string;
    renderCell?: (params: RenderCellParamsType<TKey, TRow, TField>) => ReactNode | string;
    renderEditCell?: (params: RenderEditCellParamsType<TKey, TRow, TField>) => ReactNode | string;
    width?: number;
    editHandler?: (params: { rowKey: TKey, value: TRow[TField], row: TRow, field: TField }) => void;
    resizable?: boolean;
    type?: 'int',
    enabled?: (row: TRow, field: TField) => boolean
};

export class EpistoDataGridColumnBuilder<TRow, TKey> {

    private _columns: GridColumnType<TRow, TKey, any>[] = [];

    add<TField extends keyof TRow>(column: GridColumnType<TRow, TKey, TField>) {

        this._columns.push(column);
        return this;
    }

    addIf<TField extends keyof TRow>(cond: boolean, column: GridColumnType<TRow, TKey, TField>) {

        if (cond)
            this._columns.push(column);

        return this;
    }

    getColumns() {

        return this._columns;
    }
}

export type EpistoDataGridColumnVisibilityModel<TRow> = {
    [key in keyof TRow]?: boolean
}

const mapToMUIDataGridColumn = <TSchema, TKey>(column: GridColumnType<TSchema, TKey, keyof TSchema>, getKey: (row: TSchema) => TKey) => {

    const { renderCell, type, editHandler, renderEditCell, field, transformer, ...others } = column;

    const hasEditHandler = !!editHandler;

    const def: GridColDef = {
        ...others,
        field: field as any,
        editable: hasEditHandler,
        valueFormatter: transformer
            ? ({ value }) => transformer({ value })
            : undefined
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
};

export const EpistoDataGrid = typedMemo(<TSchema, TKey>({
    columns,
    id,
    rows,
    pinnedColumns,
    density,
    showFooter,
    getKey,
    onFocusChanged,
    dragEnabled,
    isRowEditable,
    onRowOrderChange,
    getRowClassName,
    onDragEnd,
    onDragStart
}: {
    rows: TSchema[],
    columns: GridColumnType<TSchema, TKey, keyof TSchema>[],
    getKey: (row: TSchema) => TKey,
    pinnedColumns?: {
        left?: (keyof TSchema)[],
        right?: (keyof TSchema)[]
    },
    deps?: any[],
    density?: 'dense' | 'spaced',
    showFooter?: boolean,
    id?: string,
    onFocusChanged?: (hasFocus: boolean) => void,
    isRowEditable?: (row: TSchema) => boolean,
    dragEnabled?: boolean,
    onRowOrderChange?: (opts: {
        sourceKey: TKey,
        targetKey: TKey,
        sourceIndex: number,
        targetIndex: number,
        sourceRow: TSchema,
        targetRow: TSchema
    }) => void,
    getRowClassName?: (params: { row: TSchema }) => string,
    onDragStart?: (row: TSchema) => void,
    onDragEnd?: (row: TSchema) => void,
}) => {

    Logger.logScoped('GRID', `${id ? `[id: ${id}] ` : ''}Rendering EpistoDataGrid...`);

    const muiDataGridColumnDefs = columns
        .map(column => mapToMUIDataGridColumn(column, getKey));

    const apiRef = useGridApiRef();

    const handleCellClick = useCallback((params: GridCellParams) => {

        const isEditable = params.colDef.editable;
        if (!isEditable)
            return;

        const row = params.row as TSchema;
        if (isRowEditable ? !isRowEditable(row) : false)
            return;

        apiRef
            .current
            .setCellMode(params.id, params.field, 'edit');
    }, [apiRef]);

    /**
     * SUBSCRIBE
     */
    useEffect(() => {

        const unsubscribes: (() => void)[] = [];

        unsubscribes
            .push(apiRef
                .current
                .subscribeEvent(
                    'cellModeChange',
                    (params, event) => {

                        event.defaultMuiPrevented = true;
                        if (onFocusChanged)
                            onFocusChanged(params.cellMode === 'edit');
                    },
                    {
                        isFirst: true
                    }));

        if (onDragStart)
            unsubscribes
                .push(apiRef
                    .current
                    .subscribeEvent('rowDragStart', x => onDragStart(x.row)));

        if (onDragEnd)
            unsubscribes
                .push(apiRef
                    .current
                    .subscribeEvent('rowDragEnd', x => onDragEnd(x.row)));

        return () => {
            unsubscribes
                .forEach(x => x());
        };
    }, []);

    Logger.logScoped('GRID', 'Rendering...');

    return (
        <DataGridPro
            isCellEditable={event => {

                const row = event.row as TSchema;

                return isRowEditable ? isRowEditable(row) : true;
            }}
            getRowId={x => getKey(x as TSchema) as any}
            rows={rows}
            apiRef={apiRef}
            rowReordering={!!dragEnabled}
            getRowClassName={x => getRowClassName ? getRowClassName({ row: x.row as TSchema }) : ''}
            components={{
                NoRowsOverlay: () => (
                    <EpistoFlex2
                        align='center'
                        justify='center'
                        fontSize='14px'
                        className='whall'>

                        Ezen szűrési feltételekkel jelenleg nincs rendelkezésre álló adat
                    </EpistoFlex2>
                ),
            }}
            onRowOrderChange={onRowOrderChange
                ? ({ oldIndex, targetIndex }) => {

                    const sourceRow = rows[oldIndex];
                    const targetRow = rows[targetIndex];

                    onRowOrderChange({
                        sourceKey: getKey(sourceRow),
                        targetKey: getKey(targetRow),
                        sourceRow,
                        targetRow,
                        sourceIndex: oldIndex,
                        targetIndex
                    });
                }
                : undefined}
            onCellClick={handleCellClick}
            disableColumnMenu
            initialState={{ pinnedColumns: pinnedColumns as any }}
            density={density === 'dense'
                ? 'compact'
                : 'standard'}
            hideFooter={!showFooter}
            onCellEditCommit={(params) => {

                const value = params.value as any;
                const field = params.field as keyof TSchema;
                const rowKey = params.id as any as TKey;

                const column = columns
                    .single(x => x.field === field);

                const val: any = column.type === 'int'
                    ? parseInt(value as any)
                    : value;

                const row = rows
                    .single(x => getKey(x) === rowKey);

                if (!column.editHandler)
                    throw new Error('Trying to edit a cell but it has no edit handler!');

                column.editHandler({ rowKey, value: val, row, field });
            }}
            isRowSelectable={x => false}
            columns={muiDataGridColumnDefs}
            style={{
                height: '100%',
                background: 'var(--transparentWhite70)'
            }} />
    );
}, (prev, next) => {

    const [isUnhanged, cause] = (() => {

        if (prev.getKey !== next.getKey) {

            return [false, 'getKey'];
        }

        if (!areArraysEqual(prev.columns, next.columns)) {

            return [false, 'columns'];
        }

        if (JSON.stringify(prev.rows) !== JSON.stringify(next.rows)) {

            return [false, 'rows'];
        }

        if (JSON.stringify(prev.deps) !== JSON.stringify(prev.deps))
            return [false, 'deps'];

        return [true, null];
    })();

    if (!isUnhanged)
        Logger.logScoped('GRID', `${prev.id ? `[id: ${prev.id}] ` : ''}Grid params changed, cause: ${cause}`);

    return isUnhanged;
});