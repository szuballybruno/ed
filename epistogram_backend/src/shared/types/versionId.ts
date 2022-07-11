import { CourseItemSimpleType } from './sharedTypes';

export class Id<T extends String> extends String {

    private constructor() {

        super();
    }

    static read<T extends String>(id: Id<T>) {

        return id as any as number;
    }

    static create<T extends String>(id: number) {

        return id as any as Id<T>;
    }
};