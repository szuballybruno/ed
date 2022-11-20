import { ErrorWithCode } from '@episto/commontypes';
import { LoadingStateType } from '../../models/types';

export type QueryStateType<T = any> = {
    state: LoadingStateType;
    data: T;
    error: ErrorWithCode | null;
}

export type QueryEventType<T = any> = QueryStateType<T> & {
    url: string;
}

export type QueryHookResultType<T> = QueryStateType<T> & {
    refetch: () => Promise<void>;
}

export class GlobalQueryStateType {
    params: any[];
    qr: QueryStateType<any>;
    url: string;
};

export type OnChangeListenerType = (state: GlobalQueryStateType) => void;