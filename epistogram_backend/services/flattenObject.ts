import {ObjectID, ObjectId} from "mongodb";

export const flattenObject = function(ob: object) {
    let toReturn = {};
    let flatObject;
    for (let i in ob) {
        if (!ob.hasOwnProperty(i)) {
            continue;
        }
        // @ts-ignore
        if ((typeof ob[i]) === 'object') {
            // @ts-ignore
            flatObject = flattenObject(ob[i]);
            for (let x in flatObject) {
                if (!flatObject.hasOwnProperty(x)) {
                    continue;
                }
                // @ts-ignore
                toReturn[i + (isNaN(x) ? '.' + x : '')] = flatObject[x];
            }
        } else {
            // @ts-ignore
            toReturn[i] = ob[i];
        }
    }
    return toReturn;
};
