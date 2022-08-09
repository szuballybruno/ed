import { Exam } from '../../models/entity/exam/Exam';
import { Video } from '../../models/entity/video/Video';
import { base64Decode, base64Encode } from '../../services/misc/base64Service';
import { withValue } from '../../utilities/helpers';
import { CourseItemType } from './sharedTypes';
import { Id } from './versionId';

export class PlaylistItemCode extends String {

    static getItemCode(itemId: Id<'Video' | 'Exam'>, itemType: CourseItemType): PlaylistItemCode;
    static getItemCode(item: Video | Exam, itemType: CourseItemType): PlaylistItemCode;
    static getItemCode(item: Video | Exam | Id<'Video' | 'Exam'>, itemType: CourseItemType): PlaylistItemCode {

        const id = (item as any).id
            ? (item as any).id
            : item;
        const asStr = id + '@' + itemType;
        return base64Encode(asStr);
    }

    static readItemCode(encoded: PlaylistItemCode) {

        const decoded = base64Decode(encoded as string);
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
    }
}