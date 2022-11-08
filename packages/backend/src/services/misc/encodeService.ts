import { PlaylistItemCode } from '@episto/commontypes';
import { CourseItemType } from '@episto/commontypes';
import { Id } from '@episto/commontypes';
import { withValue } from '../../utilities/helpers';
import { base64Decode } from '@episto/commonlogic';

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