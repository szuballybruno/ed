import { DataGridPro, GridCellParams, GridColDef, GridRenderCellParams, useGridApiContext, useGridApiRef } from '@mui/x-data-grid-pro';
import { ReactNode, useCallback, useEffect } from 'react';
import { areArraysEqual, typedMemo } from '../../static/frontendHelpers';
import { Logger } from '../../static/Logger';

const removeOverlay = () => {

    const key = 'MUI X: Missing license key';
    const xpath = `//div[text()='${key}']`;
    const matchingElement = document
        .evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null)
        .singleNodeValue;

    if (!matchingElement)
        return;

    (matchingElement as any).remove();
    // console.log();
    // matchingElement.parentElement
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
    renderCell?: (params: RenderCellParamsType<TKey, TRow, TField>) => ReactNode | string;
    renderEditCell?: (params: RenderEditCellParamsType<TKey, TRow, TField>) => ReactNode | string;
    width?: number;
    editHandler?: (params: { rowKey: TKey, value: TRow[TField], row: TRow }) => void;
    resizable?: boolean;
    type?: 'int'
};

export type InitialStateType<TSchema> = {
    pinnedColumns?: {
        left?: (keyof TSchema)[],
        right?: (keyof TSchema)[]
    }
}

const mapColumn = <TSchema, TKey>(column: GridColumnType<TSchema, TKey, keyof TSchema>, getKey: (row: TSchema) => TKey) => {

    const { renderCell, type, editHandler, renderEditCell, field, ...others } = column;

    const def: GridColDef = {
        ...others,
        field: field as any,
        editable: !!editHandler
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

export const EpistoDataGrid = typedMemo(<TSchema, TKey>(props: {
    rows: TSchema[],
    columns: GridColumnType<TSchema, TKey, keyof TSchema>[],
    getKey: (row: TSchema) => TKey,
    initialState?: InitialStateType<TSchema>,
    deps?: any[],
    density?: 'dense' | 'spaced',
    hideFooter?: boolean,
    id?: string
}) => {

    const { columns, id, rows, initialState, density, hideFooter, getKey } = props;

    Logger.logScoped('GRID', `${id ? `[id: ${id}] ` : ''}Rendering EpistoDataGrid...`);

    removeOverlay();

    const columnsProcessed = columns
        .map(column => mapColumn(column, getKey));

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

    Logger.logScoped('GRID', 'Rendering...');

    return (
        <DataGridPro
            getRowId={x => getKey(x as TSchema) as any}
            rows={rows}
            apiRef={apiRef}
            onCellClick={handleCellClick}
            initialState={initialState as any}
            density={density === 'dense'
                ? 'compact'
                : density === 'spaced'
                    ? 'standard'
                    : undefined}
            hideFooter={hideFooter}
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

                column.editHandler({ rowKey, value: val, row });
            }}
            isRowSelectable={x => false}
            columns={columnsProcessed}
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