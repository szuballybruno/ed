import { Exam } from '../../models/entity/exam/Exam';
import { Video } from '../../models/entity/video/Video';
import { CourseItemSimpleType, CourseItemType } from '../../shared/types/sharedTypes';
import { withValue } from '../../utilities/helpers';
import { base64Decode, base64Encode } from './base64Service';

export const getItemCode = (item: Video | Exam, itemType: CourseItemType) => {

    const asStr = item.id + '@' + itemType;
    return base64Encode(asStr);
};

export const readItemCode = (encoded: string) => {

    const decoded = base64Decode(encoded);
    const splitted = decoded.split('@');
    const id = parseInt(withValue(splitted[0]));
    const type = withValue(splitted[1]) as CourseItemType;

    return {
        itemId: id,
        itemType: type
    };
};

export const readVersionCode = (versionCode: string): { versionType: CourseItemSimpleType, versionId: number } => {

    const [itemType, versionId] = versionCode.split('@');

    return {
        versionType: itemType === 'video_version'
            ? 'video'
            : 'exam',
        versionId: parseInt(versionId)
    };
}