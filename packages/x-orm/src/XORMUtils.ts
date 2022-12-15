

const toSQLSnakeCasing = (name: string) => {

    return name.split(/(?=[A-Z])/)
        .join('_')
        .toLowerCase();
};

const toJSCamelCase = (str: string) => {

    return str
        .toLowerCase()
        .replace(/([-_][a-z])/g, (group) => group
            .toUpperCase()
            .replace('-', '')
            .replace('_', ''));
};

const toJSCapitalizedName = (str: string) => {

    const camel = toJSCamelCase(str);

    return camel
        .charAt(0)
        .toUpperCase() + camel.slice(1)
}

export const XORMUtils = {
    toSQLSnakeCasing,
    toJSCamelCase,
    toJSCapitalizedName
}