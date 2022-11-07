import { CourseItemType } from './sharedTypes';
import { Id } from './versionId';

export const base64Encode = (text: string) => Buffer.from(text)
    .toString('base64');

export const base64Decode = (encodedText: string) => Buffer.from(encodedText, 'base64')
    .toString('ascii');

export class PlaylistItemCode extends String {

    static getItemCode(itemId: Id<'Video' | 'Exam'>, itemType: CourseItemType): PlaylistItemCode;
    static getItemCode(item: { id: Id<'Video' | 'Exam'> }, itemType: CourseItemType): PlaylistItemCode;
    static getItemCode(item: { id: Id<'Video' | 'Exam'> } | Id<'Video' | 'Exam'>, itemType: CourseItemType): PlaylistItemCode {

        const id = (item as any).id
            ? (item as any).id
            : item;
        const asStr = id + '@' + itemType;
        return base64Encode(asStr);
    }

    static readItemCode(encoded: PlaylistItemCode) {

        const decoded = base64Decode(encoded as string);
        const splitted = decoded.split('@');
        const type: CourseItemType = splitted[1] as any;
        const idFromCode = parseInt(splitted[0]);

        if (!type || !idFromCode)
            throw new Error('Code is corrupt!');

        const id: Id<'Exam'> | Id<'Video'> | Id<'Module'> = type === 'exam'
            ? Id.create<'Exam'>(idFromCode)
            : type === 'video'
                ? Id.create<'Video'>(idFromCode)
                : Id.create<'Module'>(idFromCode);

        return {
            itemId: id,
            itemType: type
        };
    }
}