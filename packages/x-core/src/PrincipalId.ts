import { Id } from "./Id";

export class PrincipalId {

    private _id: number;

    constructor(id: number) {

        this._id = id;
    }

    getId(): Id<'User'> {

        return Id.create<'User'>(this._id);
    }

    toSQLValue(): number {

        return this._id;
    }
}