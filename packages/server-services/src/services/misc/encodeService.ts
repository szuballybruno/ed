import { PlaylistItemCode } from '@episto/commontypes';
import { CourseItemType } from '@episto/commontypes';
import { Id } from '@episto/commontypes';
import { base64Decode } from '@episto/commonlogic';

export const getItemCode = PlaylistItemCode.getItemCode;

const withValue = <T>(obj: T, errorFunc?: () => void) => {

    const hasValue = (obj: any) => {

        if (obj === '')
            return false;
    
        if (obj === undefined)
            return false;
    
        if (obj === null)
            return false;
    
        return true;
    };

    if (!errorFunc)
        errorFunc = () => { throw new Error('Object has no value!'); };

    if (!hasValue(obj))
        errorFunc();

    return obj;
};

export const readItemCode = (encoded: string) => {

    const decoded = base64Decode(encoded);
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