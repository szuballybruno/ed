
export type StyleSizeType = "0" | "5" | "10" | "15" | "40";

export type ClassBuilderCustomizationFnType = (classBuilder: ClassBuilder) => void;

export class ClassBuilder {

    private _classes: string[];

    constructor() {

        this._classes = [];
    }

    build = () => {

        return this._classes.join(" ");
    }

    appendBuilder = (builder?: ClassBuilder) => {

        if (builder)
            this._classes = this._classes.concat(builder._classes);

        return this;
    }

    appendList = (classes: string[]) => {

        this._classes = this._classes.concat(classes);

        return this;
    }

    customize = (fn?: ClassBuilderCustomizationFnType) => {

        if (fn)
            fn(this);

        return this;
    }

    custom = (className: string) => {

        this.addClass(className);
        return this;
    }

    ifElse = (condition: boolean, whenTrue: (b: ClassBuilder) => ClassBuilder, whenFalse: (b: ClassBuilder) => ClassBuilder) => {

        if (condition) {

            whenTrue(this);
        }
        else {

            whenFalse(this);
        }

        return this;
    }

    if = (condition: boolean, whenTrue: (b: ClassBuilder) => ClassBuilder) => {

        if (condition) {

            whenTrue(this);
        }

        return this;
    }

    private addClass(name: string, arg1?: string, arg2?: string, arg3?: string, arg4?: string) {

        if (arg1)
            name += "-" + arg1;

        if (arg2)
            name += "-" + arg2;

        if (arg3)
            name += "-" + arg3;

        if (arg4)
            name += "-" + arg4;

        this._classes.push(name)
    }
}

export const createClassBuiler = () => {

    return new ClassBuilder();
}