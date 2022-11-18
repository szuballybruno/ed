import { ErrorWithCode } from '@episto/commontypes';
import { LoadingStateType } from '../../models/types';

export type QueryState<T> = {
    state: LoadingStateType;
    data: T;
    error: ErrorWithCode | null;
}

export type QueryResult<T> = QueryState<T> & {
    refetch: () => Promise<void>;
}

export type QueryEventData = {
    route: string;
} & QueryState<any>;

export class GlobalQueryStateType {
    params: any[];
    qr: QueryState<any>;
};