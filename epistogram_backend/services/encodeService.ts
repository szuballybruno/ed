import { CourseItemDescriptorDTO } from "../models/shared_models/CourseItemDescriptorDTO";
import { CourseItemType } from "../models/shared_models/types/sharedTypes";
import { withValue } from "../utilities/helpers";
import { base64Decode, base64Encode } from "./base64Service";

export const getCourseItemDescriptorCodeFromDTO = (dto: CourseItemDescriptorDTO) => {

    const { itemId, itemType } = dto;
    return getCourseItemDescriptorCode(itemId, itemType);
}

export const getCourseItemDescriptorCode = (itemId: number, itemType: CourseItemType) => {

    const asStr = itemId + "@" + itemType;
    const encoded = base64Encode(asStr);

    return encoded;
}

export const readCourseItemDescriptorCode = (encoded: string) => {

    const decoded = base64Decode(encoded);
    const splitted = decoded.split("@");
    const id = parseInt(withValue(splitted[0]));
    const type = withValue(splitted[1]) as CourseItemType;

    return {
        itemId: id,
        itemType: type
    } as CourseItemDescriptorDTO;
}