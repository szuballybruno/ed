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
                versionId: Id.create<any>(parseInt(versionId))
            };
        } catch (e: any) {

            throw new Error(`Reading version code failed: ${versionCode} Msg: ${e?.message}`);
        }
    }

    static create(versionType: 'video_version' | 'exam_version', versionId: Id<'VideoVersion'> | Id<'ExamVersion'>) {

        return `${versionType}@${versionId}` as any as VersionCode;
    }

    static parse(str: string) {

        return str as any as VersionCode;
    }
}