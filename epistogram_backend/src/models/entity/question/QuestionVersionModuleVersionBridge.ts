import { XViewColumn } from '../../../services/XORM/XORMDecorators';
import { Id } from '../../../shared/types/versionId';
import { Entity, PrimaryGeneratedColumn } from '../../MyORM';

@Entity()
export class QuestionVersionModuleVersionBridge {

    @PrimaryGeneratedColumn()
    @XViewColumn()
    id: Id<'QuestionVersionModuleVersionBridge'>;

    // TO ONE

    @XViewColumn()
    moduleVersionId: Id<'ModuleVersion'>;

    @XViewColumn()
    questionVersionId: Id<'QuestionVersion'>;
}