import { Exam } from '../../models/entity/exam/Exam';
import { Video } from '../../models/entity/video/Video';
import { CourseItemSimpleType, CourseItemType } from '../../shared/types/sharedTypes';
import { Id } from '../../shared/types/versionId';
import { withValue } from '../../utilities/helpers';
import { base64Decode, base64Encode } from './base64Service';

export const getItemCode = (item: Video | Exam, itemType: CourseItemType) => {

    const asStr = item.id + '@' + itemType;
    return base64Encode(asStr);
};

export const readItemCode = (encoded: string) => {

    const decoded = base64Decode(encoded);
    const splitted = decoded.split('@');
    const type = withValue(splitted[1]) as CourseItemType;
    const id: Id<'Exam'> | Id<'Video'> = type === 'exam'
        ? Id.create<'Exam'>(parseInt(withValue(splitted[0])))
        : Id.create<'Video'>(parseInt(withValue(splitted[0])));

    return {
        itemId: id,
        itemType: type
    };
};