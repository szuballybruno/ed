import { CourseContentItemAdminDTO } from '../../../../shared/dtos/admin/CourseContentItemAdminDTO';
import { CourseContentItemIssueDTO } from '../../../../shared/dtos/admin/CourseContentItemIssueDTO';
import { CourseItemType } from '../../../../shared/types/sharedTypes';
import { formatTime } from '../../../../static/frontendHelpers';

export type RowSchema = {
    rowKey: string;
    rowNumber: number;
    itemOrderIndex: number;
    itemTitle: string;
    itemSubtitle: string;
    module: {
        id: number;
        hidden: boolean;
        name: string;
        orderIndex: number;
    };
    itemType: {
        type: CourseItemType;
        label: string;
        color: any;
    };
    videoLength: {
        text: string;
        color: any;
    };
    errors: {
        text: string;
        tooltip: string;
        color: any;
    };
    videoFile: string;
    quickMenu: number;
};

export type EditRowFnType = <TField extends keyof RowSchema, >(key: string, field: TField, value: RowSchema[TField]) => void;

const getItemTypeValues = (itemType: CourseItemType): { label: string, color: any } => {

    if (itemType === 'exam')
        return {
            color: 'var(--deepOrange)',
            label: 'Vizsga'
        };

    if (itemType === 'video')
        return {
            color: 'var(--deepBlue)',
            label: 'Videó'
        };

    if (itemType === 'pretest')
        return {
            color: 'purple',
            label: 'Szintfelmérő'
        };

    if (itemType === 'final')
        return {
            color: 'orange',
            label: 'Záróvizsga'
        };

    throw new Error('Unexpected type: ' + itemType);
};

const getIssueText = (dto: CourseContentItemIssueDTO) => {

    if (dto.code === 'ans_miss')
        return `Valaszok hianyoznak ebbol a kerdesbol: ${dto.questionName}`;

    if (dto.code === 'corr_ans_miss')
        return `Helyesnek megjelolt valaszok hianyoznak ebbol a kerdesbol: ${dto.questionName}`;

    if (dto.code === 'questions_missing')
        return 'Kerdesek hianyoznak';

    if (dto.code === 'video_too_long')
        return 'Video tul hosszu';

    return null;
};

export const mapToRowSchema = (item: CourseContentItemAdminDTO, rowNumber: number): RowSchema => {

    const { color, label } = getItemTypeValues(item.itemType);

    const isLengthWarning = item
        .warnings
        .any(x => x.code === 'video_too_long');

    const hasErrors = item
        .errors
        .length > 0;

    return ({
        rowKey: item.itemCode,
        rowNumber: rowNumber,
        itemOrderIndex: item.itemOrderIndex,
        itemTitle: item.itemTitle,
        itemSubtitle: item.itemSubtitle,
        module: {
            hidden: item.itemType === 'pretest',
            id: item.moduleId,
            name: item.moduleName,
            orderIndex: item.moduleOrderIndex
        },
        itemType: {
            label,
            color,
            type: item.itemType
        },
        videoLength: {
            text: item.itemType === 'exam'
                ? ' - '
                : !item.warnings || !item.videoLength
                    ? ''
                    : formatTime(Math.round(item.videoLength)),
            color: isLengthWarning
                ? 'var(--intenseOrange)'
                : 'gray'
        },
        errors: {
            text: hasErrors
                ? `${item.errors.length} hiba`
                : 'Nincs hiba',
            tooltip: item
                .errors
                .map(x => getIssueText(x))
                .join('\n'),
            color: hasErrors
                ? 'var(--intenseRed)'
                : 'var(--intenseGreen)'
        },
        quickMenu: rowNumber,
        videoFile: 'vf'
    });
};