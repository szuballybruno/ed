import { ViewColumn, ViewEntity } from 'typeorm';
import { IsDeletedFlag } from '../../services/ORMConnectionService/ORMConnectionDecorators';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class ModuleView {

    @ViewColumn()
    id: number;

    @IsDeletedFlag()
    @ViewColumn()
    deletionDate: Date;

    @ViewColumn()
    name: string;

    @ViewColumn()
    description: string;

    @ViewColumn()
    orderIndex: number;

    @ViewColumn()
    courseId: number;

    @ViewColumn()
    imageFileId: number | null;

    @ViewColumn()
    itemCount: number;
}
