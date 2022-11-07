import { Id } from '@episto/commontypes';

export class CourseShopItemListDTO {
    id: Id<'Course'>;
    title: string;
    coverImagePath: string | null;
}