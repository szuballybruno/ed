import { CourseItemSimpleType } from "./sharedTypes";

export class VersionCode extends String {
    private _forcedTypeIncompatibility = VersionCode.name;
    private constructor() {

        super();
    }

    static read(versionCode: VersionCode): { versionType: CourseItemSimpleType, versionId: number } {

        const [itemType, versionId] = versionCode.split('@');

        return {
            versionType: itemType === 'video_version'
                ? 'video'
                : 'exam',
            versionId: parseInt(versionId)
        };
    }

    static create(versionType: 'video_version' | 'exam_version', versionId: number) {

        return `${versionType}@${versionId}` as any as VersionCode;
    }
};