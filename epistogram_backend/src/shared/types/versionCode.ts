import { CourseItemSimpleType } from './sharedTypes';
import { Id } from './versionId';

export class VersionCode extends String {
    private _forcedTypeIncompatibility = VersionCode.name;
    private constructor() {

        super();
    }

    static read(versionCode: VersionCode): { versionType: CourseItemSimpleType, versionId: Id<'VideoVersion'> | Id<'ExamVersion'> } {

        try {

            const [itemType, versionId] = versionCode.split('@');

            return {
                versionType: itemType === 'video_version'
                    ? 'video'
                    : 'exam',
                versionId: Id.create(parseInt(versionId))
            };
        } catch (e: any) {

            throw new Error(`Reading version code failed: ${versionCode} Msg: ${e?.message}`);
        }
    }

    static create(versionType: 'video_version' | 'exam_version', versionId: number) {

        return `${versionType}@${versionId}` as any as VersionCode;
    }
};