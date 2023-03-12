import { SQLObjectColumnType } from "./SQLObjectColumnType";

export type SQLObjectType = {
    name: string;
    type: 'view' | 'table';
    columns: SQLObjectColumnType[];
}