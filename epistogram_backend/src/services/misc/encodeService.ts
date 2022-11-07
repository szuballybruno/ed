import { PlaylistItemCode } from '../../shared/types/PlaylistItemCode';
import { CourseItemType } from '../../shared/types/sharedTypes';
import { Id } from '../../shared/types/versionId';
import { withValue } from '../../utilities/helpers';
import { base64Decode } from '../../shared/logic/base64Service';

export const getItemCode = PlaylistItemCode.getItemCode;

export const readItemCode = (encoded: string) => {

    const decoded = base64Decode(encoded);
    console.log('decoded: ' + decoded);
    const splitted = decoded.split('@');
    const type = withValue(splitted[1]) as CourseItemType;
    const id: Id<'Exam'> | Id<'Video'> | Id<'Module'> = (() => {

        if (type === 'exam' || type === 'final') {

            return Id.create<'Exam'>(parseInt(withValue(splitted[0])));
        }

        if (type === 'video') {

            return Id.create<'Video'>(parseInt(withValue(splitted[0])));
        }

        if (type === 'module') {

            return Id.create<'Module'>(parseInt(withValue(splitted[0])));
        }

        throw new Error('Cannot read item code');

    })();

    return {
        itemId: id,
        itemType: type
    };
};