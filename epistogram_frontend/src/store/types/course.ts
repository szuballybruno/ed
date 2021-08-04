import {item} from "./item";

export type course = {
    _id: string,
    name: string,
    category: string,
    group: string,
    teacherName: string,
    colorOne: string
    colorTwo: string
    items: item[]
    thumbnailUrl: string
}

