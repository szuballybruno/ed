import { PlaylistItemCode } from '../../shared/types/PlaylistItemCode';
import { CourseItemType } from '../../shared/types/sharedTypes';
import { Id } from '../../shared/types/versionId';
import { withValue } from '../../utilities/helpers';
import { base64Decode } from './base64Service';

export const getItemCode = PlaylistItemCode.getItemCode;

export const readItemCode = (encoded: string) => {

    const decoded = base64Decode(encoded);
    const splitted = decoded.split('@');
    const type = withValue(splitted[1]) as CourseItemType;
    const id: Id<'Exam'> | Id<'Video'> | Id<'Module'> = type === 'exam'
        ? Id.create<'Exam'>(parseInt(withValue(splitted[0])))
        : type === 'video'
            ? Id.create<'Video'>(parseInt(withValue(splitted[0])))
            : Id.create<'Module'>(parseInt(withValue(splitted[0])));

    return {
        itemId: id,
        itemType: type
    };
};