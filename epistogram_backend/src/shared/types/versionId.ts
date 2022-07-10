import { CourseItemSimpleType } from './sharedTypes';

export class Id<T> extends String {

    private constructor() {

        super();
    }

    static read<T>(id: Id<T>) {

        return id as any as number;
    }

    static create<T>(id: number) {

        return id as any as Id<T>;
    }
};