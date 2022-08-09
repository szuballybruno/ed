export const gen = (template) => {
    const obj = {};
    for (let index = 0; index < 1000; index++) {

        const key = `${template}${index}`;
        obj[key] = { id: key }
    }

    return obj;
}