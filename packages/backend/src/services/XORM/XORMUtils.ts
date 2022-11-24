

const toSQLSnakeCasing = (name: string) => {

    return name.split(/(?=[A-Z])/)
        .join('_')
        .toLowerCase();
};

export const XORMUtils = {
    toSQLSnakeCasing
}